# Gemini Model Selection

## Current Default Models

This power uses **dual models** for optimal performance:

### Image Generation: gemini-3-pro-image-preview ⭐

**For UI mockup generation** - Most advanced image generation model:
- ✅ State-of-the-art image generation with thinking process
- ✅ Up to 14 reference images support
- ✅ 4K resolution support (1K, 2K, 4K)
- ✅ Professional asset production optimized
- ✅ Complex multi-turn creation and editing
- ✅ Google Search grounding
- ✅ Accurate text rendering in images
- ✅ Uses official @google/genai SDK

### Text Generation: gemini-2.5-flash

**For code generation** - Fast and high-quality:
- ✅ Latest text model (June 2025)
- ✅ Advanced reasoning capabilities
- ✅ Excellent code generation
- ✅ Fast enough for real-time use
- ✅ Best price-performance ratio
- ✅ Uses official @google/genai SDK

## Available Models

### Image Generation Models

**1. gemini-3-pro-image-preview** (Default) ⭐
- **Best for:** Professional UI mockups, complex designs
- **Speed:** Medium
- **Quality:** Highest
- **Features:** Thinking, 14 images, 4K, Search grounding
- **Use case:** All UI design generation (recommended)
- **SDK:** @google/genai (official)

**2. gemini-2.5-flash-image**
- **Best for:** Quick mockups, simple designs
- **Speed:** Fast
- **Quality:** Good
- **Features:** Basic image generation
- **Use case:** Rapid prototyping

### Text Generation Models

**1. gemini-2.5-flash** (Default) ⭐
- **Best for:** Code generation, analysis
- **Speed:** Fast
- **Quality:** Excellent
- **Use case:** All code generation tasks (recommended)

**2. gemini-2.5-pro**
- **Best for:** Complex codebases, highest quality
- **Speed:** Slower
- **Quality:** Highest
- **Use case:** Critical projects

**3. gemini-3-pro-preview**
- **Best for:** Most intelligent reasoning
- **Speed:** Medium
- **Quality:** Excellent
- **Use case:** Complex analysis tasks

## Why We Use Gemini 2.5 Flash

### Latest Model: gemini-2.5-flash
- **Latest release** - December 2024
- **New SDK** - Official @google/genai package
- **Better reasoning** - Improved understanding
- **More accurate** - Better code generation
- **Fast** - Still fast enough for real-time use
- **Future-proof** - Uses official SDK (legacy SDK EOL Aug 2025)

### SDK Migration

**Old SDK:** `@google/generative-ai` (deprecated, EOL August 31, 2025)
**New SDK:** `@google/genai` (official, actively maintained)

Benefits of new SDK:
- ✅ Official Google support
- ✅ Latest features
- ✅ Better performance
- ✅ Active development
- ✅ Future model support

### Comparison

| Feature | 2.5 Flash | 2.0 Flash | 1.5 Pro |
|---------|-----------|-----------|---------|
| Speed | Fast | Very Fast | Slower |
| Quality | Excellent | Good | Highest |
| Reasoning | Advanced | Good | Excellent |
| UI Design | ✅✅ | ✅ | ✅✅✅ |
| Code Gen | ✅✅ | ✅ | ✅✅✅ |
| Accessibility | ✅✅ | ✅ | ✅✅ |
| Cost | Low | Low | Higher |
| SDK | New | New | New |

## How to Change Models

### Method 1: Environment Variable (Recommended)

Add to your `.env` file:
```bash
GEMINI_MODEL=gemini-1.5-pro-latest
```

### Method 2: Kiro MCP Configuration

Update `.kiro/settings/mcp.json`:
```json
{
  "mcpServers": {
    "ui-designer": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key",
        "GEMINI_MODEL": "gemini-1.5-pro-latest"
      }
    }
  }
}
```

### Method 3: System Environment

```bash
export GEMINI_MODEL=gemini-1.5-pro-latest
```

## Model Selection Guide

### For Most Users (Recommended)
**Use defaults:**
```bash
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
GEMINI_MODEL=gemini-2.5-flash
```
- Best balance of speed and quality
- Professional-grade UI mockups
- Fast code generation
- Recommended for 95% of use cases

### For Maximum Quality
**Use:**
```bash
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
GEMINI_MODEL=gemini-2.5-pro
```
- Highest quality code generation
- Professional UI mockups
- Critical projects

### For Rapid Prototyping
**Use:**
```bash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
GEMINI_MODEL=gemini-2.5-flash
```
- Fastest image generation
- Fast code generation
- Quick iterations

## Feature-Specific Recommendations

### UI Design Generation
**Recommended:** `gemini-2.5-flash`
- Excellent design understanding
- Good pattern recognition
- Fast enough for iteration

### Design-to-Code Conversion
**Recommended:** `gemini-2.5-flash` or `gemini-1.5-pro`
- 2.5 Flash: Great balance of speed and quality
- 1.5 Pro: Maximum accuracy (slower)

### Design Analysis
**Recommended:** `gemini-2.5-flash`
- Advanced reasoning for accessibility
- Good pattern detection
- Fast analysis

### Component Generation
**Recommended:** `gemini-2.5-flash`
- Excellent code quality
- Good TypeScript support
- Fast generation

### Custom Gem Creation
**Recommended:** `gemini-1.5-pro`
- Most comprehensive analysis
- Better pattern extraction
- Only done once, so speed less critical

## Performance Comparison

### Response Times (Approximate)

| Model | Simple Request | Complex Request |
|-------|---------------|-----------------|
| 2.5 Flash | 1-3s | 4-7s |
| 2.0 Flash | 1-2s | 3-5s |
| 1.5 Pro | 3-5s | 8-15s |

### Quality Scores (Subjective)

| Model | UI Design | Code Quality | Accessibility |
|-------|-----------|--------------|---------------|
| 2.5 Flash | 9/10 | 9/10 | 9/10 |
| 2.0 Flash | 8/10 | 7/10 | 7/10 |
| 1.5 Pro | 10/10 | 10/10 | 10/10 |

## Cost Considerations

### API Pricing (Approximate)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| 2.0 Flash | $0.075 | $0.30 |
| 2.0 Flash Thinking | $0.075 | $0.30 |
| 1.5 Pro | $1.25 | $5.00 |

**Note:** Thinking models may use more tokens due to extended reasoning.

### Cost-Benefit Analysis

**For most users:**
- 2.5 Flash offers best value
- Excellent quality at low cost
- Latest model with new SDK

**For high-volume users:**
- Use 2.5 Flash as default
- Consider 2.0 Flash for simple tasks
- Use 1.5 Pro only for critical work
- Monitor token usage

## Future Models

### When New Models Release

The power automatically supports new models:
1. Google releases new model
2. Update `GEMINI_MODEL` environment variable
3. Power uses new model immediately

### Staying Current

Check for new models:
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- Power documentation updates

## Automatic Fallback Strategy

The power includes **automatic retry with fallback models** for reliability:

### How It Works

1. **Primary Request:** Uses your configured model (e.g., `gemini-3-pro-image-preview`)
2. **Error Detection:** Detects 503/overload errors automatically
3. **Automatic Retry:** Retries with fallback model
4. **Transparent:** Logs fallback attempts for visibility

### Fallback Models

| Primary Model Type | Fallback Model |
|-------------------|----------------|
| Image Generation | `gemini-2.5-flash-image` |
| Text Generation | `gemini-2.0-flash-exp` |
| Image Analysis | `gemini-2.5-flash-image` |

### Benefits

- ✅ **Reliability:** Requests succeed even during high API load
- ✅ **Automatic:** No manual intervention needed
- ✅ **Transparent:** Logs show when fallback is used
- ✅ **Smart:** Only retries on overload errors, not other errors

### Example

```
User request → gemini-3-pro-image-preview (overloaded)
            → Automatic retry with gemini-2.5-flash-image
            → Success! ✅
```

## Troubleshooting

### "Model not found" Error

**Cause:** Model name incorrect or not available

**Solution:**
1. Check model name spelling
2. Verify model is available in your region
3. Try default model (remove `GEMINI_MODEL` env var)

### Slow Responses

**Cause:** Using 1.5 Pro or complex requests

**Solution:**
1. Switch to 2.0 Flash Thinking
2. Simplify requests
3. Use 2.0 Flash for rapid iteration

### Poor Quality Results

**Cause:** Using Flash model for complex tasks

**Solution:**
1. Switch to 2.0 Flash Thinking (default)
2. Use 1.5 Pro for critical work
3. Provide more detailed prompts

## Recommendations Summary

### Default Setup (Recommended)
```bash
GEMINI_MODEL=gemini-2.5-flash
```
**Best for:** 95% of users, all features

### Quality-First Setup
```bash
GEMINI_MODEL=gemini-1.5-pro
```
**Best for:** Critical projects, maximum quality

### Speed-First Setup
```bash
GEMINI_MODEL=gemini-2.0-flash-exp
```
**Best for:** Rapid prototyping, simple tasks

## SDK Information

### New Official SDK

This power now uses the **official Google Generative AI SDK**:
- **Package:** `@google/genai`
- **Version:** 1.33.0+
- **Status:** Official, actively maintained
- **Documentation:** https://googleapis.github.io/js-genai/

### Legacy SDK (Deprecated)

The old SDK is deprecated:
- **Package:** `@google/generative-ai`
- **Status:** Deprecated, EOL August 31, 2025
- **Migration:** Complete ✅

## Conclusion

**Current Default:** `gemini-2.5-flash`

This is the **best choice** for UI design and code generation because:
- ✅ Latest Gemini model (December 2024)
- ✅ Official @google/genai SDK
- ✅ Advanced reasoning capabilities
- ✅ Excellent quality results
- ✅ Fast enough for real-time use
- ✅ Low cost
- ✅ Future-proof

**You can always change it** by setting the `GEMINI_MODEL` environment variable.

---

**The power now uses the latest Gemini model with the official SDK!** 🚀
