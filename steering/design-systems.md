# Design Systems Reference

Popular design systems and their characteristics.

## Material Design (Google)

### Principles
- Material metaphor (paper and ink)
- Bold, graphic, intentional
- Motion provides meaning

### Key Components
- Elevation system (0-24dp)
- 8dp grid system
- Roboto font family
- Primary/Secondary color system
- FAB (Floating Action Button)

### Spacing
- 8dp base unit
- 4dp for small adjustments

## Ant Design

### Principles
- Natural, certain, meaningful, growing

### Key Features
- Comprehensive component library
- Enterprise-focused
- Strong data visualization
- Form-heavy applications

### Grid System
- 24-column grid
- Responsive breakpoints: xs, sm, md, lg, xl, xxl

## Chakra UI

### Principles
- Accessible by default
- Composable components
- Dark mode built-in

### Key Features
- Style props system
- Responsive array syntax
- Theme customization
- Color mode support

### Spacing Scale
- 0-96 scale (4px increments)

## Tailwind CSS

### Principles
- Utility-first
- Responsive design
- Component-friendly

### Key Features
- JIT compiler
- Custom design tokens
- Plugin system
- Dark mode variants

### Spacing Scale
- 0-96 (0.25rem increments)
- Arbitrary values supported

## Apple Human Interface Guidelines

### Principles
- Clarity, deference, depth
- Intuitive navigation
- Consistent experience

### Key Features
- SF Pro font family
- Generous spacing
- Subtle animations
- Platform-specific patterns

## Fluent Design (Microsoft)

### Principles
- Light, depth, motion, material, scale

### Key Features
- Acrylic material
- Reveal highlight
- Depth and shadow
- Responsive animations

## Design System Comparison

| System | Best For | Complexity | Customization |
|--------|----------|------------|---------------|
| Material | Mobile-first, Google ecosystem | Medium | Medium |
| Ant Design | Enterprise, data-heavy | High | Medium |
| Chakra UI | Modern web apps, accessibility | Low | High |
| Tailwind | Custom designs, flexibility | Low | Very High |
| Fluent | Windows apps, Microsoft ecosystem | Medium | Medium |

## Common Patterns Across Systems

### Color Palette Structure
- Primary color (brand)
- Secondary/accent color
- Semantic colors (success, warning, error, info)
- Neutral scale (50-900)
- Alpha variants for overlays

### Typography Scale
- Display (48-96px)
- Heading (24-36px)
- Body (14-18px)
- Caption (12-14px)

### Component States
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading

### Elevation/Shadow System
- None (flat)
- Low (subtle)
- Medium (cards)
- High (modals, dropdowns)
- Highest (tooltips)

## Choosing a Design System

Consider:
1. **Project type**: Consumer app vs enterprise
2. **Customization needs**: Brand-specific vs standard
3. **Team expertise**: Learning curve
4. **Accessibility**: Built-in support
5. **Ecosystem**: Framework compatibility
6. **Maintenance**: Active development
