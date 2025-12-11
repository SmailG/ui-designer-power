#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import mime from "mime";

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Model selection - use the best available models
// gemini-3-pro-image-preview for UI design generation (most advanced, creates actual images)
// gemini-2.5-flash for text-based code generation and analysis
// Support custom Gemini Gems via GEMINI_GEM_ID
const CUSTOM_GEM_ID = process.env.GEMINI_GEM_ID;
const DEFAULT_IMAGE_MODEL = CUSTOM_GEM_ID || process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview";
const DEFAULT_TEXT_MODEL = CUSTOM_GEM_ID || process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Fallback models for when primary models are overloaded
// Note: gemini-2.5-flash-image supports image generation as fallback
const FALLBACK_IMAGE_MODEL = "gemini-2.5-flash-image";
const FALLBACK_TEXT_MODEL = "gemini-2.0-flash-exp";

// Rate limiting configuration
const MIN_REQUEST_INTERVAL = parseInt(process.env.GEMINI_MIN_REQUEST_INTERVAL || "1000"); // 1 second between requests
const MAX_RETRIES = parseInt(process.env.GEMINI_MAX_RETRIES || "3");
const INITIAL_RETRY_DELAY = parseInt(process.env.GEMINI_INITIAL_RETRY_DELAY || "2000"); // 2 seconds

// Request queue to prevent concurrent requests
let lastRequestTime = 0;
let requestQueue: Promise<any> = Promise.resolve();

// Helper to wait for a specified time
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to check if error is an overload error
function isOverloadError(error: any): boolean {
    const errorStr = JSON.stringify(error);
    return errorStr.includes("overloaded") ||
        errorStr.includes("UNAVAILABLE") ||
        errorStr.includes("503") ||
        (error?.error?.code === 503);
}

// Helper to check if error is a rate limit error
function isRateLimitError(error: any): boolean {
    const errorStr = JSON.stringify(error);
    return errorStr.includes("429") ||
        errorStr.includes("RESOURCE_EXHAUSTED") ||
        errorStr.includes("rate limit") ||
        errorStr.includes("quota") ||
        (error?.error?.code === 429);
}

// Helper to enforce rate limiting between requests
async function enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        console.error(`Rate limiting: waiting ${waitTime}ms before next request`);
        await sleep(waitTime);
    }

    lastRequestTime = Date.now();
}

// Helper to execute a request with rate limiting and retries
async function executeWithRateLimit<T>(
    fn: () => Promise<T>,
    retryCount: number = 0
): Promise<T> {
    // Queue the request to prevent concurrent execution
    return requestQueue = requestQueue.then(async () => {
        // Enforce rate limit
        await enforceRateLimit();

        try {
            return await fn();
        } catch (error) {
            // Handle rate limit errors with exponential backoff
            if (isRateLimitError(error) && retryCount < MAX_RETRIES) {
                const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
                console.error(`Rate limit hit, retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
                await sleep(delay);
                return executeWithRateLimit(fn, retryCount + 1);
            }
            throw error;
        }
    });
}

// Helper to generate content with text
async function generateContent(prompt: string, preferredModel?: string, retryWithFallback: boolean = true): Promise<string> {
    const modelName = preferredModel || DEFAULT_TEXT_MODEL;

    return executeWithRateLimit(async (): Promise<string> => {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
            });
            return response.text || "";
        } catch (error) {
            // If overloaded and we haven't tried fallback yet, retry with fallback model
            if (retryWithFallback && isOverloadError(error)) {
                console.error(`Model ${modelName} is overloaded, retrying with fallback model ${FALLBACK_TEXT_MODEL}`);
                return await generateContent(prompt, FALLBACK_TEXT_MODEL, false);
            }
            throw error;
        }
    });
}

// Helper to generate UI design images
async function generateUIImage(prompt: string, preferredModel?: string, retryWithFallback: boolean = true): Promise<any> {
    const modelName = preferredModel || DEFAULT_IMAGE_MODEL;

    return executeWithRateLimit(async () => {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    responseModalities: ['TEXT', 'IMAGE'],
                },
            });
            return response;
        } catch (error) {
            // If overloaded and we haven't tried fallback yet, retry with fallback model
            if (retryWithFallback && isOverloadError(error)) {
                console.error(`Model ${modelName} is overloaded, retrying with fallback model ${FALLBACK_IMAGE_MODEL}`);
                return generateUIImage(prompt, FALLBACK_IMAGE_MODEL, false);
            }
            throw error;
        }
    });
}

// Helper to generate content with image
async function generateContentWithImage(prompt: string, imageData: string, preferredModel?: string, retryWithFallback: boolean = true): Promise<string> {
    const modelName = preferredModel || DEFAULT_IMAGE_MODEL;

    // Check if imageData is a file path
    let base64Data: string;
    let mimeType = "image/jpeg";

    if (imageData.startsWith("http")) {
        // URL - pass as is
        base64Data = imageData;
    } else if (imageData.startsWith("data:")) {
        // Data URI - extract base64 and mime type
        const match = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
        if (match) {
            mimeType = match[1];
            base64Data = match[2];
        } else {
            base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        }
    } else if (imageData.includes("/") || imageData.includes("\\") || imageData.match(/\.(png|jpg|jpeg|gif|webp|bmp|svg|tiff|ico)$/i)) {
        // Looks like a file path - read the file
        const fs = await import("fs/promises");

        try {
            const fileBuffer = await fs.readFile(imageData);
            base64Data = fileBuffer.toString("base64");

            // Detect mime type from file path using mime library
            const detectedMimeType = mime.getType(imageData);
            if (detectedMimeType && detectedMimeType.startsWith("image/")) {
                mimeType = detectedMimeType;
            } else {
                // Fallback to jpeg if mime type detection fails or isn't an image
                mimeType = "image/jpeg";
            }
        } catch (error) {
            throw new Error(`Failed to read image file: ${imageData}. Error: ${error}`);
        }
    } else {
        // Assume it's raw base64
        base64Data = imageData;
    }

    return executeWithRateLimit(async (): Promise<string> => {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: prompt },
                            {
                                inlineData: {
                                    mimeType: mimeType,
                                    data: base64Data,
                                },
                            },
                        ],
                    },
                ],
            });
            return response.text || "";
        } catch (error) {
            // If overloaded and we haven't tried fallback yet, retry with fallback model
            if (retryWithFallback && isOverloadError(error)) {
                console.error(`Model ${modelName} is overloaded, retrying with fallback model ${FALLBACK_IMAGE_MODEL}`);
                return await generateContentWithImage(prompt, imageData, FALLBACK_IMAGE_MODEL, false);
            }
            throw error;
        }
    });
}

// Tool schemas
const GenerateUIDesignSchema = z.object({
    description: z.string().describe("Description of the UI to design"),
    style: z.enum(["modern", "minimal", "glassmorphism", "neumorphism", "material", "custom"]).optional(),
    colorScheme: z.enum(["light", "dark", "auto"]).optional(),
    framework: z.enum(["generic", "material-ui", "ant-design", "chakra-ui"]).optional(),
});

const DesignToCodeSchema = z.object({
    imageData: z.string().describe("Image file path (supports all common image formats), base64 encoded image data, or image URL"),
    targetFramework: z.enum(["html-css", "react", "nextjs", "vue", "svelte", "angular"]),
    styling: z.enum(["css", "tailwind", "styled-components", "css-modules", "scss"]),
    includeAccessibility: z.boolean().optional().default(true),
});

const AnalyzeDesignSchema = z.object({
    imageData: z.string().describe("Image file path (supports all common image formats), base64 encoded image data, or image URL"),
    analysisType: z.enum(["accessibility", "design-system", "layout", "colors", "typography", "spacing"]),
});

const GenerateComponentSchema = z.object({
    componentType: z.string().describe("Type of component (button, card, form, navbar, etc.)"),
    framework: z.enum(["react", "vue", "nextjs", "svelte", "web-component"]),
    styling: z.enum(["css", "tailwind", "styled-components", "css-modules"]),
    props: z.record(z.any()).optional(),
});

const CreateGemSchema = z.object({
    designSystemFiles: z.array(z.string()).optional().describe("Paths to design system files to include"),
    codebaseExamples: z.array(z.string()).optional().describe("Paths to example code files"),
    customInstructions: z.string().optional().describe("Additional custom instructions for the Gem"),
    gemName: z.string().optional().default("UI Designer Pro").describe("Name for the custom Gem"),
    autoDetect: z.boolean().optional().default(true).describe("Automatically detect design system and code files"),
});

const RegenerateGemSchema = z.object({
    reason: z.string().optional().describe("Reason for regeneration (e.g., 'rebranding', 'tech switch', 'design system update')"),
});

// Helper functions
async function autoDetectFiles() {
    const fs = await import("fs/promises");
    const path = await import("path");

    const designSystemFiles: string[] = [];
    const codebaseExamples: string[] = [];

    try {
        // Common design system file locations
        const designSystemPaths = [
            "design-system",
            "docs/design-system",
            "design",
            "styles/design-system",
        ];

        for (const dsPath of designSystemPaths) {
            try {
                const files = await fs.readdir(dsPath);
                for (const file of files) {
                    if (file.endsWith(".md")) {
                        designSystemFiles.push(path.join(dsPath, file));
                    }
                }
            } catch {
                // Directory doesn't exist, continue
            }
        }

        // Common component file locations
        const componentPaths = [
            "src/components",
            "components",
            "src/ui",
            "ui",
        ];

        for (const compPath of componentPaths) {
            try {
                const files = await fs.readdir(compPath);
                // Get first 5 component files as examples
                const componentFiles = files
                    .filter(f => f.endsWith(".tsx") || f.endsWith(".ts") || f.endsWith(".jsx") || f.endsWith(".js"))
                    .slice(0, 5);

                for (const file of componentFiles) {
                    codebaseExamples.push(path.join(compPath, file));
                }

                if (codebaseExamples.length > 0) break; // Found components, stop searching
            } catch {
                // Directory doesn't exist, continue
            }
        }
    } catch (error) {
        console.error("Error auto-detecting files:", error);
    }

    return { designSystemFiles, codebaseExamples };
}

async function getProjectName() {
    try {
        const fs = await import("fs/promises");
        const packageJson = await fs.readFile("package.json", "utf-8");
        const pkg = JSON.parse(packageJson);
        return pkg.name || "Project";
    } catch {
        // Try to get from git
        try {
            const { execSync } = await import("child_process");
            const repoUrl = execSync("git config --get remote.origin.url", { encoding: "utf-8" }).trim();
            const match = repoUrl.match(/\/([^\/]+?)(\.git)?$/);
            return match ? match[1] : "Project";
        } catch {
            return "Project";
        }
    }
}

async function saveGemConfig(config: any) {
    try {
        const fs = await import("fs/promises");
        const path = await import("path");

        const configDir = path.join(process.cwd(), ".kiro");
        await fs.mkdir(configDir, { recursive: true });

        await fs.writeFile(
            path.join(configDir, "gem-config.json"),
            JSON.stringify(config, null, 2)
        );
    } catch (error) {
        console.error("Error saving gem config:", error);
    }
}

async function loadGemConfig() {
    try {
        const fs = await import("fs/promises");
        const path = await import("path");

        const configPath = path.join(process.cwd(), ".kiro", "gem-config.json");
        const content = await fs.readFile(configPath, "utf-8");
        return JSON.parse(content);
    } catch {
        return null;
    }
}

// Load project context from gem config to enhance prompts
async function getProjectContext(): Promise<string> {
    const config = await loadGemConfig();
    if (!config) return "";

    let context = `\n\n## Project Context\n`;
    context += `Project: ${config.projectName || "Unknown"}\n`;

    if (config.designSystemFiles && config.designSystemFiles.length > 0) {
        context += `Design System Files: ${config.designSystemFiles.length} files detected\n`;
    }

    if (config.codebaseExamples && config.codebaseExamples.length > 0) {
        context += `Component Examples: ${config.codebaseExamples.length} files detected\n`;
    }

    if (config.customInstructions) {
        context += `\nCustom Instructions:\n${config.customInstructions}\n`;
    }

    return context;
}

async function generateGemConfiguration(params: any) {
    const fs = await import("fs/promises");
    const path = await import("path");

    // Auto-detect files if enabled
    let designSystemFiles = params.designSystemFiles || [];
    let codebaseExamples = params.codebaseExamples || [];

    if (params.autoDetect) {
        const detected = await autoDetectFiles();
        if (designSystemFiles.length === 0) {
            designSystemFiles = detected.designSystemFiles;
        }
        if (codebaseExamples.length === 0) {
            codebaseExamples = detected.codebaseExamples;
        }
    }

    // Get project name for Gem name
    const projectName = await getProjectName();
    const gemName = params.gemName || `UI Designer Pro - ${projectName}`;

    // Read steering files
    let steeringContent = "";
    try {
        const steeringDir = path.join(process.cwd(), "steering");
        const steeringFiles = await fs.readdir(steeringDir);

        for (const file of steeringFiles) {
            if (file.endsWith(".md")) {
                const content = await fs.readFile(path.join(steeringDir, file), "utf-8");
                steeringContent += `\n\n## ${file}\n\n${content}`;
            }
        }
    } catch (err) {
        console.error("Could not read steering files:", err);
    }

    // Read design system files
    let designSystemContent = "";
    if (designSystemFiles.length > 0) {
        for (const filePath of designSystemFiles) {
            try {
                const content = await fs.readFile(filePath, "utf-8");
                designSystemContent += `\n\n## ${filePath}\n\n${content}`;
            } catch (err) {
                console.error(`Could not read ${filePath}:`, err);
            }
        }
    }

    // Read codebase examples
    let codebaseContent = "";
    if (codebaseExamples.length > 0) {
        for (const filePath of codebaseExamples) {
            try {
                const content = await fs.readFile(filePath, "utf-8");
                codebaseContent += `\n\n## ${filePath}\n\n\`\`\`\n${content}\n\`\`\``;
            } catch (err) {
                console.error(`Could not read ${filePath}:`, err);
            }
        }
    }

    const prompt = `You are an AI assistant helping to create a custom Gemini Gem configuration for UI design and code generation.

Based on the following information, generate a comprehensive Gem configuration including:
1. System instructions for the Gem
2. Training examples (prompt/response pairs)
3. Knowledge base content
4. Recommended settings

**Gem Name:** ${gemName}

**Steering Files (Best Practices):**
${steeringContent}

**Design System Files:**
${designSystemContent || "No design system files provided"}

**Codebase Examples:**
${codebaseContent || "No codebase examples provided"}

**Custom Instructions:**
${params.customInstructions || "None provided"}

**Auto-detected files:**
- Design system files: ${designSystemFiles.join(", ") || "none"}
- Code examples: ${codebaseExamples.join(", ") || "none"}

Generate a complete Gem configuration that includes:

1. **System Instructions**: Comprehensive instructions for the Gem that incorporate the steering files, design system, and coding patterns from the examples.

2. **Training Examples**: At least 5 example prompt/response pairs that demonstrate:
   - Generating UI designs in the user's style
   - Converting designs to code using their patterns
   - Analyzing designs according to their standards
   - Generating components following their conventions

3. **Knowledge Base**: Structured knowledge from the steering files and design system.

4. **Implementation Guide**: Step-by-step instructions for creating this Gem in Google AI Studio.

5. **Testing Prompts**: 5 prompts to test the Gem after creation.

Format the output as a comprehensive guide that the user can follow to create their custom Gem.`;

    const response = await generateContent(prompt);

    // Save configuration for regeneration
    await saveGemConfig({
        gemName,
        designSystemFiles,
        codebaseExamples,
        customInstructions: params.customInstructions,
        generatedAt: new Date().toISOString(),
        projectName,
    });

    return {
        response,
        gemName,
        filesAnalyzed: {
            steering: steeringContent ? "✅" : "❌",
            designSystem: designSystemFiles.length,
            codeExamples: codebaseExamples.length,
        },
    };
}

// Server setup
const server = new Server(
    {
        name: "ui-designer-power",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "generate_ui_design",
                description: "Generate UI design mockup and recommendations based on description",
                inputSchema: {
                    type: "object",
                    properties: {
                        description: {
                            type: "string",
                            description: "Description of the UI to design",
                        },
                        style: {
                            type: "string",
                            enum: ["modern", "minimal", "glassmorphism", "neumorphism", "material", "custom"],
                            description: "Design style preference",
                        },
                        colorScheme: {
                            type: "string",
                            enum: ["light", "dark", "auto"],
                            description: "Color scheme preference",
                        },
                        framework: {
                            type: "string",
                            enum: ["generic", "material-ui", "ant-design", "chakra-ui"],
                            description: "UI framework preference",
                        },
                    },
                    required: ["description"],
                },
            },
            {
                name: "design_to_code",
                description: "Convert design screenshot or mockup to production-ready code",
                inputSchema: {
                    type: "object",
                    properties: {
                        imageData: {
                            type: "string",
                            description: "Image file path (supports all common image formats), base64 encoded image data, or image URL",
                        },
                        targetFramework: {
                            type: "string",
                            enum: ["html-css", "react", "vue", "nextjs", "svelte", "angular"],
                            description: "Target framework for code generation",
                        },
                        styling: {
                            type: "string",
                            enum: ["css", "tailwind", "styled-components", "css-modules", "scss"],
                            description: "Styling approach",
                        },
                        includeAccessibility: {
                            type: "boolean",
                            description: "Include accessibility attributes",
                            default: true,
                        },
                    },
                    required: ["imageData", "targetFramework", "styling"],
                },
            },
            {
                name: "analyze_design",
                description: "Analyze design for accessibility, design system compliance, or specific aspects",
                inputSchema: {
                    type: "object",
                    properties: {
                        imageData: {
                            type: "string",
                            description: "Image file path (supports all common image formats), base64 encoded image data, or image URL",
                        },
                        analysisType: {
                            type: "string",
                            enum: ["accessibility", "design-system", "layout", "colors", "typography", "spacing"],
                            description: "Type of analysis to perform",
                        },
                    },
                    required: ["imageData", "analysisType"],
                },
            },
            {
                name: "generate_component",
                description: "Generate a specific UI component with code",
                inputSchema: {
                    type: "object",
                    properties: {
                        componentType: {
                            type: "string",
                            description: "Type of component (button, card, form, navbar, etc.)",
                        },
                        framework: {
                            type: "string",
                            enum: ["react", "vue", "svelte", "nextjs", "web-component"],
                            description: "Framework to use",
                        },
                        styling: {
                            type: "string",
                            enum: ["css", "tailwind", "styled-components", "css-modules"],
                            description: "Styling approach",
                        },
                        props: {
                            type: "object",
                            description: "Component properties and configuration",
                        },
                    },
                    required: ["componentType", "framework", "styling"],
                },
            },
            {
                name: "create_custom_gem",
                description: "Create or update a custom Gemini Gem trained on your design system, codebase, and steering files",
                inputSchema: {
                    type: "object",
                    properties: {
                        designSystemFiles: {
                            type: "array",
                            items: { type: "string" },
                            description: "Paths to design system files to include",
                        },
                        codebaseExamples: {
                            type: "array",
                            items: { type: "string" },
                            description: "Paths to example code files from your codebase",
                        },
                        customInstructions: {
                            type: "string",
                            description: "Additional custom instructions for the Gem",
                        },
                        gemName: {
                            type: "string",
                            description: "Name for the custom Gem",
                            default: "UI Designer Pro",
                        },
                        autoDetect: {
                            type: "boolean",
                            description: "Automatically detect design system and code files",
                            default: true,
                        },
                    },
                },
            },
            {
                name: "regenerate_gem",
                description: "Regenerate your custom Gemini Gem (use after design system changes, rebranding, or tech stack updates)",
                inputSchema: {
                    type: "object",
                    properties: {
                        reason: {
                            type: "string",
                            description: "Reason for regeneration (e.g., 'rebranding', 'tech switch', 'design system update')",
                        },
                    },
                },
            },
            {
                name: "show_gem_config",
                description: "Show the current custom Gem configuration",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
        ],
    };
});

// Tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "generate_ui_design": {
                const params = GenerateUIDesignSchema.parse(args);

                // Load project context to enhance the prompt
                const projectContext = await getProjectContext();

                const prompt = `Create a professional UI design mockup for:

${params.description}

Style: ${params.style || "modern"}
Color Scheme: ${params.colorScheme || "light"}
Framework: ${params.framework || "generic"}
${projectContext}

Generate a high-fidelity UI mockup image showing:
- Complete layout with all UI components
- Proper spacing and alignment
- Color scheme applied
- Typography hierarchy
- Interactive elements (buttons, forms, navigation)
- Responsive design considerations

Also provide a detailed design specification including:
1. Layout structure and component hierarchy
2. Color palette with hex codes
3. Typography recommendations
4. Spacing and sizing guidelines
5. Interactive element states
6. Accessibility considerations`;

                const response = await generateUIImage(prompt, DEFAULT_IMAGE_MODEL);

                // Extract both text and image from response
                const content: any[] = [];

                for (const candidate of response.candidates || []) {
                    for (const part of candidate.content?.parts || []) {
                        if (part.text) {
                            content.push({
                                type: "text",
                                text: part.text,
                            });
                        }
                        if (part.inlineData) {
                            content.push({
                                type: "image",
                                source: {
                                    type: "base64",
                                    media_type: part.inlineData.mimeType || "image/png",
                                    data: part.inlineData.data,
                                },
                            });
                        }
                    }
                }

                return { content };
            }

            case "design_to_code": {
                const params = DesignToCodeSchema.parse(args);

                const prompt = `You are an expert frontend developer. Convert this design to ${params.targetFramework} code using ${params.styling}.

Requirements:
- Generate clean, production-ready code
- Use semantic HTML elements
- ${params.includeAccessibility ? "Include ARIA labels and accessibility attributes" : ""}
- Match the design pixel-perfect
- Extract and use design tokens (colors, spacing, typography)
- Make it responsive
- Include comments explaining key decisions

Provide the complete code with file structure.`;

                const response = await generateContentWithImage(prompt, params.imageData);

                return {
                    content: [
                        {
                            type: "text",
                            text: response,
                        },
                    ],
                };
            }

            case "analyze_design": {
                const params = AnalyzeDesignSchema.parse(args);

                const analysisPrompts = {
                    accessibility: "Analyze this design for WCAG 2.1 AA compliance. Check color contrast, text sizing, interactive element sizing, keyboard navigation, screen reader compatibility, and provide specific recommendations.",
                    "design-system": "Analyze this design and identify the design system patterns used. Extract design tokens, component patterns, and suggest improvements for consistency.",
                    layout: "Analyze the layout structure, grid system, spacing patterns, and responsive design considerations. Provide recommendations for improvement.",
                    colors: "Extract the color palette, analyze color harmony, contrast ratios, and suggest improvements or alternatives.",
                    typography: "Analyze typography choices including font families, sizes, weights, line heights, and hierarchy. Provide recommendations.",
                    spacing: "Analyze spacing patterns, padding, margins, and white space usage. Identify the spacing scale and suggest improvements.",
                };

                const prompt = analysisPrompts[params.analysisType];
                const response = await generateContentWithImage(prompt, params.imageData);

                return {
                    content: [
                        {
                            type: "text",
                            text: response,
                        },
                    ],
                };
            }

            case "generate_component": {
                const params = GenerateComponentSchema.parse(args);

                const propsStr = params.props ? JSON.stringify(params.props, null, 2) : "{}";
                const prompt = `Generate a ${params.componentType} component in ${params.framework} using ${params.styling}.

Component specifications:
${propsStr}

Requirements:
- Follow ${params.framework} best practices
- Use TypeScript if applicable
- Include prop types/interfaces
- Make it reusable and customizable
- Add JSDoc comments
- Include usage examples
- Consider accessibility
- Make it responsive

Provide complete, production-ready code.`;

                const response = await generateContent(prompt);

                return {
                    content: [
                        {
                            type: "text",
                            text: response,
                        },
                    ],
                };
            }

            case "create_custom_gem": {
                const params = CreateGemSchema.parse(args);
                const result = await generateGemConfiguration(params);

                return {
                    content: [
                        {
                            type: "text",
                            text: `# Custom Gem Configuration Generated! 🎉

**Gem Name:** ${result.gemName}

**Files Analyzed:**
- Steering files: ${result.filesAnalyzed.steering}
- Design system files: ${result.filesAnalyzed.designSystem}
- Code examples: ${result.filesAnalyzed.codeExamples}

---

${result.response}

---

**💾 Configuration Saved**

Your Gem configuration has been saved to \`.kiro/gem-config.json\`.

You can regenerate this Gem anytime by running:
\`\`\`
Regenerate my custom Gem
\`\`\`

This is useful after:
- Design system changes
- Rebranding
- Tech stack updates
- Adding new components or patterns
`,
                        },
                    ],
                };
            }

            case "show_gem_config": {
                const savedConfig = await loadGemConfig();

                if (!savedConfig) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `# No Gem Configuration Found

No custom Gem configuration exists yet.

**To create it:**
\`\`\`
Create my custom Gemini Gem
\`\`\`
`,
                            },
                        ],
                    };
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: `# Custom Gem Configuration

**Gem Name:** ${savedConfig.gemName}
**Project:** ${savedConfig.projectName}
**Created:** ${new Date(savedConfig.generatedAt).toLocaleString()}

## Design System Files (${savedConfig.designSystemFiles?.length || 0})
${savedConfig.designSystemFiles?.length > 0
                                    ? savedConfig.designSystemFiles.map((f: string) => `- ${f}`).join("\n")
                                    : "None detected"}

## Code Examples (${savedConfig.codebaseExamples?.length || 0})
${savedConfig.codebaseExamples?.length > 0
                                    ? savedConfig.codebaseExamples.map((f: string) => `- ${f}`).join("\n")
                                    : "None detected"}

**Configuration File:** \`.kiro/gem-config.json\`

**To regenerate:** Type "Regenerate my custom Gem"
`,
                        },
                    ],
                };
            }

            case "regenerate_gem": {
                const params = RegenerateGemSchema.parse(args);

                // Load previous configuration
                const savedConfig = await loadGemConfig();

                if (!savedConfig) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `# No Previous Gem Configuration Found

It looks like you haven't created a custom Gem yet, or the configuration file is missing.

**To create it now:**
\`\`\`
Create my custom Gemini Gem
\`\`\`

This will automatically:
- Scan your steering files
- Detect your design system files
- Analyze your component examples
- Generate a complete Gem configuration
- Save it for future regeneration

**Or check if configuration exists:**
\`\`\`
Show my Gem configuration
\`\`\`
`,
                            },
                        ],
                    };
                }

                // Regenerate with saved configuration
                const result = await generateGemConfiguration({
                    designSystemFiles: savedConfig.designSystemFiles,
                    codebaseExamples: savedConfig.codebaseExamples,
                    customInstructions: savedConfig.customInstructions,
                    gemName: savedConfig.gemName,
                    autoDetect: true, // Re-detect files in case new ones were added
                });

                return {
                    content: [
                        {
                            type: "text",
                            text: `# Custom Gem Regenerated! 🔄

**Reason:** ${params.reason || "Manual regeneration"}
**Gem Name:** ${result.gemName}
**Previous Generation:** ${new Date(savedConfig.generatedAt).toLocaleString()}
**Current Generation:** ${new Date().toLocaleString()}

**Files Analyzed:**
- Steering files: ${result.filesAnalyzed.steering}
- Design system files: ${result.filesAnalyzed.designSystem}
- Code examples: ${result.filesAnalyzed.codeExamples}

---

${result.response}

---

**💾 Configuration Updated**

Your Gem configuration has been updated in \`.kiro/gem-config.json\`.

**Next Steps:**
1. Copy the configuration above
2. Go to [Google AI Studio](https://aistudio.google.com/)
3. Update your existing Gem or create a new one
4. Test with the provided prompts

**When to Regenerate:**
- After design system changes
- After rebranding
- After tech stack updates
- When adding new components or patterns
- When updating coding standards
`,
                        },
                    ],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("UI Designer Power MCP server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
