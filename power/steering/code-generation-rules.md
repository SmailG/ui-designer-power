# Code Generation Rules

Standards and preferences for generating code from designs.

> **Note:** This power uses Gemini 2.5 Flash for fast, high-quality code generation.
> For UI design mockups, it uses Gemini 3 Pro Image Preview to create actual images.

## General Principles

1. **Semantic HTML**: Use appropriate HTML5 elements
2. **Component-based**: Break down into reusable components
3. **Responsive-first**: Mobile-first approach
4. **Accessible**: WCAG 2.1 AA compliance
5. **Performance**: Optimize images, lazy loading
6. **Maintainable**: Clear naming, comments, structure

## React Guidelines

### Component Structure
```tsx
// 1. Imports
import React from 'react';
import type { ComponentProps } from './types';

// 2. Types/Interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// 3. Component
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  children 
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
};
```

### Naming Conventions
- Components: PascalCase
- Props: camelCase
- CSS classes: kebab-case or BEM
- Files: PascalCase for components

## Tailwind CSS Guidelines

### Class Organization
```tsx
// Order: layout -> spacing -> sizing -> colors -> typography -> effects
<div className="
  flex flex-col
  p-4 gap-2
  w-full max-w-md
  bg-white border border-gray-200
  text-base font-medium
  rounded-lg shadow-sm
  hover:shadow-md transition-shadow
">
```

### Custom Classes
- Use @apply for repeated patterns
- Keep utility-first approach
- Use CSS variables for theme values

## Accessibility Requirements

### Required Attributes
- `alt` text for images
- `aria-label` for icon buttons
- `role` for custom interactive elements
- `aria-describedby` for form errors
- `aria-expanded` for collapsible content

### Keyboard Navigation
- Tab order follows visual order
- Focus indicators visible
- Escape closes modals/dropdowns
- Enter/Space activates buttons

### Screen Reader Support
- Semantic landmarks (header, nav, main, footer)
- Heading hierarchy (h1 -> h6)
- Form labels associated with inputs
- Status messages announced

## Responsive Breakpoints

```css
/* Mobile first */
.container { /* base styles */ }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1280px) { }
```

## File Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
├── styles/
│   ├── globals.css
│   └── tokens.css    # Design tokens
├── types/
└── utils/
```

## Design Tokens

Extract and use design tokens:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

## Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Comments for complex logic
- Unit tests for utilities
- Integration tests for components
