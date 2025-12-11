# Usage Examples

Comprehensive examples of using the UI Designer & Design-to-Code Power.

## Design Generation Examples

### Example 1: Landing Page
```
Design a modern SaaS landing page for a project management tool with:
- Hero section with gradient background
- Feature showcase with icons
- Pricing table with 3 tiers
- Testimonials section
- CTA footer
- Dark mode support
```

### Example 2: Dashboard
```
Create a dashboard design for an analytics platform with:
- Sidebar navigation
- Top header with search and user menu
- Grid of metric cards
- Line chart for trends
- Recent activity table
- Responsive layout
```

### Example 3: Mobile App Screen
```
Design a mobile app screen for a fitness tracker showing:
- Today's activity summary
- Progress rings for steps, calories, exercise
- Recent workouts list
- Bottom tab navigation
- Use vibrant colors and modern iOS design patterns
```

## Design-to-Code Examples

### Example 1: Simple Card to React
```
Convert this card design to React with Tailwind CSS:
[Attach image of a product card]

Requirements:
- Use TypeScript
- Include hover effects
- Make it responsive
- Add accessibility attributes
```

Expected output:
```tsx
interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  image
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img 
        src={image} 
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <button 
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Example 2: Form to Vue
```
Convert this login form to Vue 3 with Composition API and CSS modules:
[Attach image of login form]

Include:
- Email and password inputs
- Remember me checkbox
- Forgot password link
- Submit button
- Form validation
```

### Example 3: Navigation to Svelte
```
Convert this navigation bar to Svelte with Tailwind:
[Attach image of navbar]

Features needed:
- Logo on left
- Menu items in center
- User menu on right
- Mobile hamburger menu
- Sticky on scroll
```

## Component Generation Examples

### Example 1: Button Component
```
Create a button component in React with:
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg
- Loading state with spinner
- Disabled state
- Icon support (left or right)
- Full width option
- Use Tailwind CSS
```

### Example 2: Modal Component
```
Generate a modal component in Vue 3 with:
- Backdrop with blur effect
- Close button
- Header, body, footer slots
- Keyboard support (ESC to close)
- Focus trap
- Animation on open/close
- Use styled-components
```

### Example 3: Data Table
```
Create a data table component in React with:
- Sortable columns
- Pagination
- Row selection
- Search/filter
- Responsive (cards on mobile)
- TypeScript interfaces
- Use CSS modules
```

## Design Analysis Examples

### Example 1: Accessibility Check
```
Analyze this design for WCAG 2.1 AA compliance:
[Attach design screenshot]

Check:
- Color contrast ratios
- Text sizing
- Touch target sizes
- Focus indicators
- Alt text requirements
```

### Example 2: Design System Extraction
```
Analyze this design and extract the design system:
[Attach screenshot]

Identify:
- Color palette
- Typography scale
- Spacing system
- Component patterns
- Border radius values
- Shadow system
```

### Example 3: Layout Analysis
```
Analyze the layout structure of this page:
[Attach screenshot]

Provide:
- Grid system used
- Breakpoint recommendations
- Spacing patterns
- Alignment principles
- Improvement suggestions
```

## Advanced Examples

### Example 1: Multi-Page Application
```
Design a complete 5-page website for a restaurant:
1. Home page with hero and menu preview
2. Full menu page with categories
3. About page with story and team
4. Reservations page with form
5. Contact page with map

Use consistent design system across all pages.
Then convert each page to Next.js with Tailwind CSS.
```

### Example 2: Design System Creation
```
Create a complete design system for a fintech startup:
- Brand colors (primary, secondary, accent)
- Typography scale
- Spacing system
- Component library (buttons, inputs, cards, etc.)
- Icon style guidelines
- Animation principles

Then generate React components for each element.
```

### Example 3: Responsive Redesign
```
Take this desktop-only design and make it responsive:
[Attach desktop design]

Create:
- Mobile version (320px-767px)
- Tablet version (768px-1023px)
- Desktop version (1024px+)

Then convert to React with responsive Tailwind classes.
```

## Integration Examples

### Example 1: Figma to Code
```
I have a Figma design at [URL]. Convert it to:
- React components with TypeScript
- Tailwind CSS for styling
- Separate files for each component
- Storybook stories for each component
```

### Example 2: Screenshot to Full Stack
```
Convert this dashboard screenshot to a full application:
[Attach screenshot]

Generate:
- React frontend with TypeScript
- Component structure
- Mock API calls
- State management setup
- Routing configuration
```

### Example 3: Wireframe to Production
```
Take this low-fidelity wireframe and:
[Attach wireframe]

1. Create a high-fidelity design with modern styling
2. Generate a complete design system
3. Convert to production-ready React code
4. Include unit tests for components
```

## Tips for Best Results

### 1. Be Specific
❌ "Design a website"
✅ "Design a modern SaaS landing page with hero section, 3 feature cards, pricing table, and footer"

### 2. Provide Context
❌ "Convert this to code"
✅ "Convert this login form to React with TypeScript, using Tailwind CSS, including form validation and error states"

### 3. Include Requirements
❌ "Make a button"
✅ "Create a button component with primary/secondary variants, small/medium/large sizes, loading state, and icon support"

### 4. Iterate
Start simple, then refine:
1. "Design a card component"
2. "Add hover effects and shadow"
3. "Make it responsive"
4. "Add accessibility attributes"

### 5. Use References
Attach screenshots, mockups, or examples when possible. Visual references significantly improve output quality.

## Combining Tools

You can chain multiple operations:

```
1. Design a modern pricing page
2. [Review the design]
3. Convert the design to React with Tailwind
4. [Review the code]
5. Analyze the accessibility
6. [Review suggestions]
7. Update the code with accessibility improvements
```

This iterative approach produces the best results.
