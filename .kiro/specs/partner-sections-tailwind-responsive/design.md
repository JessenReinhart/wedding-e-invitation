# Design Document

## Overview

This design outlines the conversion of the Individual Partner Sections component from custom CSS to Tailwind CSS, with enhanced responsive design and full viewport height on mobile. The component will maintain its current functionality while leveraging Tailwind's utility-first approach for better maintainability and performance.

## Architecture

### Component Structure
The component will maintain its existing React structure with the following key elements:
- Main container (`individual-partner-sections`)
- Individual partner sections (groom and bride)
- Overlay containers for content positioning
- Content areas with partner information
- Loading and error state indicators

### Tailwind Integration
- Replace all custom CSS classes with Tailwind utilities
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:) for breakpoint-specific styling
- Leverage Tailwind's background, spacing, and layout utilities
- Utilize Tailwind's animation and transition classes

## Components and Interfaces

### Main Container
```tsx
<div className="w-full">
  {/* Partner sections */}
</div>
```

### Partner Section Layout
```tsx
<section className="
  relative w-full
  h-screen md:h-[80vh] lg:h-[85vh] xl:h-[90vh]
  bg-cover bg-center bg-no-repeat
  flex items-center justify-center
">
  <div className="
    absolute inset-0
    bg-gradient-to-br from-black/40 via-black/20 to-black/40
    flex items-center justify-center
  ">
    {/* Content */}
  </div>
</section>
```

### Content Layout
```tsx
<div className="
  text-center text-white px-4 sm:px-6 md:px-8
  max-w-2xl mx-auto
  space-y-4 sm:space-y-6
">
  {/* Partner information */}
</div>
```

## Data Models

### Responsive Breakpoints
- **Mobile**: `< 768px` - Full viewport height (100vh)
- **Tablet**: `768px - 1023px` - 80vh height
- **Desktop**: `1024px - 1279px` - 85vh height  
- **Large Desktop**: `≥ 1280px` - 90vh height

### Tailwind Class Mapping
| Current CSS | Tailwind Equivalent |
|-------------|-------------------|
| `position: relative` | `relative` |
| `width: 100%` | `w-full` |
| `min-height: 100vh` | `h-screen` |
| `background-size: cover` | `bg-cover` |
| `background-position: center` | `bg-center` |
| `display: flex` | `flex` |
| `align-items: center` | `items-center` |
| `justify-content: center` | `justify-center` |

## Error Handling

### Image Loading States
- **Loading**: Use Tailwind's animation utilities (`animate-pulse`, `animate-spin`)
- **Error**: Apply gradient backgrounds using Tailwind's gradient utilities
- **Success**: Apply background image using inline styles with Tailwind classes

### Fallback Backgrounds
```tsx
// Groom fallback
className="bg-gradient-to-br from-green-800 to-green-600"

// Bride fallback  
className="bg-gradient-to-br from-rose-600 to-rose-400"
```

## Testing Strategy

### Responsive Testing
1. **Mobile Testing**: Verify full viewport height (100vh) on various mobile devices
2. **Tablet Testing**: Confirm 80vh height and proper content scaling
3. **Desktop Testing**: Validate larger viewport heights and content positioning
4. **Orientation Testing**: Test both portrait and landscape orientations

### Cross-browser Testing
1. Test Tailwind class compatibility across modern browsers
2. Verify gradient and background image rendering
3. Confirm responsive breakpoint behavior

### Performance Testing
1. Compare bundle size before and after Tailwind conversion
2. Measure rendering performance improvements
3. Test image loading and fallback performance

### Accessibility Testing
1. Verify screen reader compatibility with new class structure
2. Test keyboard navigation functionality
3. Confirm color contrast ratios with new gradient overlays

## Implementation Approach

### Phase 1: Core Structure Conversion
- Convert main container and section layouts to Tailwind
- Implement responsive height classes
- Set up background image handling

### Phase 2: Content and Overlay Styling
- Convert overlay gradients to Tailwind utilities
- Style content areas with responsive spacing
- Implement text styling and positioning

### Phase 3: State Management
- Convert loading state animations to Tailwind
- Implement error state styling with Tailwind gradients
- Add smooth transitions using Tailwind animation classes

### Phase 4: Responsive Optimization
- Fine-tune breakpoint-specific styling
- Optimize mobile viewport height behavior
- Ensure smooth transitions between breakpoints

## Key Design Decisions

### Mobile-First Approach
- Start with mobile styles and progressively enhance for larger screens
- Use `h-screen` as base height, then override with responsive prefixes

### Gradient Overlays
- Use Tailwind's gradient utilities instead of custom CSS gradients
- Maintain visual hierarchy with appropriate opacity levels

### Performance Optimization
- Leverage Tailwind's purging to remove unused styles
- Use Tailwind's built-in optimizations for better performance than custom CSS

### Maintainability
- Group related Tailwind classes logically
- Use consistent spacing and sizing scales
- Document responsive behavior clearly in code comments