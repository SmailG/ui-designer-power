#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Tool schemas
const GenerateUIDesignSchema = z.object({
    description: z.string().describe("Description of the UI to design"),
    style: z.enum(["modern", "minimal", "glassmorphism", "neumorphism", "material", "custom"]).optional(),
    colorScheme: z.enum(["light", "dark", "auto"]).optional(),
    framework: z.enum(["generic", "material-ui", "ant-design", "chakra-ui"]).optional(),
});

const DesignToCodeSchema = z.object({
    imageData: z.string().describe("Base64 encoded image data or image URL"),
    targetFramework: z.enum(["html-css", "react", "vue", "svelte", "angular"]),
    styling: z.enum(["css", "tailwind", "styled-components", "css-modules", "scss"]),
    includeAccessibility: z.boolean().optional().default(true),
});

const AnalyzeDesignSchema = z.object({
    imageData: z.string().describe("Base64 encoded image data"),
    analysisType: z.enum(["accessibility", "design-system", "layout", "colors", "typography", "spacing"]),
});

const GenerateComponentSchema = z.object({
    componentType: z.string().describe("Type of component (button, card, form, navbar, etc.)"),
    framework: z.enum(["react", "vue", "svelte", "web-component"]),
    styling: z.enum(["css", "tailwind", "styled-components", "css-modules"]),
    props: z.record(z.any()).optional(),
});

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
                            description: "Base64 encoded image data or image URL",
                        },
                        targetFramework: {
                            type: "string",
                            enum: ["html-css", "react", "vue", "svelte", "angular"],
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
                            description: "Base64 encoded image data",
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
                            enum: ["react", "vue", "svelte", "web-component"],
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
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                const prompt = `You are an expert UI/UX designer. Generate a detailed UI design specification for:

${params.description}

Style: ${params.style || "modern"}
Color Scheme: ${params.colorScheme || "light"}
Framework: ${params.framework || "generic"}

Provide:
1. Layout structure and component hierarchy
2. Color palette with hex codes
3. Typography recommendations (fonts, sizes, weights)
4. Spacing and sizing guidelines
5. Interactive elements and states
6. Responsive breakpoints
7. Accessibility considerations
8. Design tokens in JSON format

Format the response as a comprehensive design specification.`;

                const result = await model.generateContent(prompt);
                const response = result.response.text();

                return {
                    content: [
                        {
                            type: "text",
                            text: response,
                        },
                    ],
                };
            }

            case "design_to_code": {
                const params = DesignToCodeSchema.parse(args);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                let imagePart;
                if (params.imageData.startsWith("http")) {
                    imagePart = {
                        fileData: {
                            fileUri: params.imageData,
                            mimeType: "image/jpeg",
                        },
                    };
                } else {
                    imagePart = {
                        inlineData: {
                            data: params.imageData.replace(/^data:image\/\w+;base64,/, ""),
                            mimeType: "image/jpeg",
                        },
                    };
                }

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

                const result = await model.generateContent([prompt, imagePart]);
                const response = result.response.text();

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
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                const imagePart = {
                    inlineData: {
                        data: params.imageData.replace(/^data:image\/\w+;base64,/, ""),
                        mimeType: "image/jpeg",
                    },
                };

                const analysisPrompts = {
                    accessibility: "Analyze this design for WCAG 2.1 AA compliance. Check color contrast, text sizing, interactive element sizing, keyboard navigation, screen reader compatibility, and provide specific recommendations.",
                    "design-system": "Analyze this design and identify the design system patterns used. Extract design tokens, component patterns, and suggest improvements for consistency.",
                    layout: "Analyze the layout structure, grid system, spacing patterns, and responsive design considerations. Provide recommendations for improvement.",
                    colors: "Extract the color palette, analyze color harmony, contrast ratios, and suggest improvements or alternatives.",
                    typography: "Analyze typography choices including font families, sizes, weights, line heights, and hierarchy. Provide recommendations.",
                    spacing: "Analyze spacing patterns, padding, margins, and white space usage. Identify the spacing scale and suggest improvements.",
                };

                const prompt = analysisPrompts[params.analysisType];
                const result = await model.generateContent([prompt, imagePart]);
                const response = result.response.text();

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
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

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

                const result = await model.generateContent(prompt);
                const response = result.response.text();

                return {
                    content: [
                        {
                            type: "text",
                            text: response,
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
