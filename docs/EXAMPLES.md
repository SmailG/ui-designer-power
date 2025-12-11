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
# Option 1: Using a file path
Convert ./designs/product-card.png to React with Tailwind CSS

# Option 2: Attach an image
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

### Example 2: Dashboard to Next.js
```
# Option 1: Using a file path
Convert /Users/john/designs/dashboard.png to Next.js 14 with App Router

# Option 2: Attach an image
Convert this dashboard design to Next.js 14 with App Router:
[Attach image of dashboard]

Requirements:
- Use TypeScript and Tailwind CSS
- Server Components where possible
- Client Components for interactive elements
- Implement proper loading states
- Add metadata for SEO
- Use Next.js Image component
```

Expected output structure:
```tsx
// app/dashboard/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import { MetricsCards } from '@/components/MetricsCards';
import { ActivityChart } from '@/components/ActivityChart';
import { RecentActivity } from '@/components/RecentActivity';
import { MetricsSkeleton } from '@/components/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard | Analytics Platform',
  description: 'View your analytics and performance metrics',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsCards />
      </Suspense>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <RecentActivity />
      </div>
    </div>
  );
}

// components/MetricsCards.tsx (Server Component)
async function getMetrics() {
  // Fetch data on server
  const res = await fetch('https://api.example.com/metrics', {
    next: { revalidate: 60 }
  });
  return res.json();
}

export async function MetricsCards() {
  const metrics = await getMetrics();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
          <p className="mt-2 text-sm text-green-600">↑ {metric.change}%</p>
        </div>
      ))}
    </div>
  );
}

// components/ActivityChart.tsx (Client Component)
'use client';

import { useState } from 'react';
import { LineChart } from '@/components/ui/LineChart';

export function ActivityChart() {
  const [timeRange, setTimeRange] = useState('7d');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Activity Trend</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      <LineChart timeRange={timeRange} />
    </div>
  );
}
```

### Example 3: Form to Vue
```
# Option 1: Using a file path
Convert ./screenshots/login-form.jpg to Vue 3 with Composition API and CSS modules

# Option 2: Attach an image
Convert this login form to Vue 3 with Composition API and CSS modules:
[Attach image of login form]

Include:
- Email and password inputs
- Remember me checkbox
- Forgot password link
- Submit button
- Form validation
```

### Example 4: Navigation to Svelte
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
# Option 1: Using a file path
Analyze ./designs/homepage.png for WCAG 2.1 AA compliance

# Option 2: Attach an image
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
# Option 1: Using a file path
Analyze design-mockups/app-screen.png and extract the design system

# Option 2: Attach an image
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

## Custom Gem Creation Examples

### Example 1: Basic Gem Creation
```
Create a custom Gemini Gem based on my design system and codebase
```

The power will:
1. Scan all steering files in `steering/` directory
2. Generate system instructions incorporating your best practices
3. Create training examples based on your patterns
4. Provide a complete implementation guide

### Example 2: Gem with Specific Files
```
Create a custom Gem using these files:
- Design system: docs/design-system.md
- Code examples: src/components/Button.tsx, src/components/Card.tsx, src/utils/theme.ts
- Custom instructions: Our team uses Chakra UI and follows strict accessibility guidelines
```

### Example 3: Gem for Enterprise Design System
```
Create a custom Gem with:
- Design system files: design-system/colors.md, design-system/typography.md, design-system/components.md
- Codebase examples: src/components/*.tsx
- Custom instructions: Generate code that follows our enterprise security standards and uses our internal component library
```

### What You Get

The `create_custom_gem` tool generates:

1. **System Instructions**: Comprehensive instructions that incorporate:
   - Your steering files (UI patterns, code rules, design systems)
   - Your design system documentation
   - Coding patterns from your examples
   - Your custom requirements

2. **Training Examples**: 5+ prompt/response pairs showing:
   - How to generate designs in your style
   - How to convert designs using your patterns
   - How to analyze designs per your standards
   - How to generate components following your conventions

3. **Knowledge Base**: Structured knowledge extracted from your files

4. **Implementation Guide**: Step-by-step instructions for creating the Gem in Google AI Studio

5. **Testing Prompts**: 5 prompts to verify your Gem works correctly

### Using Your Custom Gem

After creating the Gem in Google AI Studio:

1. Get your Gem's model ID (e.g., `models/gemini-1.5-pro-exp-0827`)
2. Update `src/index.ts` to use your Gem:
   ```typescript
   const model = genAI.getGenerativeModel({ 
     model: "models/your-gem-id-here"
   });
   ```
3. Rebuild: `pnpm run build`
4. Your power now uses YOUR custom-trained Gem!

## Advanced Examples

### Example 1: Multi-Page Next.js Application
```
Design a complete 5-page website for a restaurant:
1. Home page with hero and menu preview
2. Full menu page with categories
3. About page with story and team
4. Reservations page with form
5. Contact page with map

Use consistent design system across all pages.
Then convert each page to Next.js 14 with:
- App Router structure
- TypeScript
- Tailwind CSS
- Server Components for static content
- Client Components for forms and interactive elements
- Proper metadata and SEO
- Image optimization with next/image
- Loading and error states
```

Expected structure:
```
app/
├── layout.tsx          # Root layout with navigation
├── page.tsx            # Home page (Server Component)
├── menu/
│   └── page.tsx        # Menu page with categories
├── about/
│   └── page.tsx        # About page
├── reservations/
│   └── page.tsx        # Reservations with form (Client)
├── contact/
│   └── page.tsx        # Contact page with map
└── api/
    └── reservations/
        └── route.ts    # API route for form submission
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

### Example 4: E-commerce Product Page (Next.js)
```
Convert this product page design to Next.js 14:
[Attach product page screenshot]

Generate:
- Product detail page with dynamic routing (app/products/[id]/page.tsx)
- Image gallery with zoom (Client Component)
- Add to cart functionality
- Related products section (Server Component)
- Product schema markup for SEO
- Optimistic UI updates
- Server Actions for cart operations
- Proper TypeScript types
```

Expected implementation:
```tsx
// app/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { AddToCartButton } from '@/components/AddToCartButton';
import { RelatedProducts } from '@/components/RelatedProducts';

interface Props {
  params: { id: string };
}

async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return {};
  
  return {
    title: `${product.name} | Your Store`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ${product.price}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          
          <AddToCartButton productId={product.id} />
        </div>
      </div>
      
      <RelatedProducts categoryId={product.categoryId} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.images[0],
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}

// components/AddToCartButton.tsx
'use client';

import { useTransition } from 'react';
import { addToCart } from '@/app/actions/cart';

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  
  return (
    <button
      onClick={() => startTransition(() => addToCart(productId))}
      disabled={isPending}
      className="mt-6 w-full rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

// app/actions/cart.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function addToCart(productId: string) {
  // Add to cart logic
  await fetch('https://api.example.com/cart', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
  
  revalidatePath('/cart');
  return { success: true };
}
```
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
