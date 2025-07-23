# Design Document

## Overview

This design creates individual sections for each wedding partner (Mathew and Anjelia) that will be positioned after the existing BrideGroomSection. Each section will feature a full-frame photo, family information, and Instagram links. The design maintains consistency with the existing website's styling and responsive behavior.

## Architecture

### Component Structure
- Create a new `IndividualPartnerSections` component that will be inserted after the current `BrideGroomSection` in `App.tsx`
- The component will render two individual sections: one for the groom (Mathew) and one for the bride (Anjelia)
- Each section will be a full-width container with a background image and overlay content

### Data Flow
- Partner information will be added to the `constants.ts` file as part of the `WEDDING_DETAILS` object
- The component will receive props containing partner details including names, family information, and Instagram handles
- Instagram links will be constructed dynamically from the provided handles

## Components and Interfaces

### New Component: IndividualPartnerSections

```typescript
interface PartnerInfo {
  name: string;
  fullName: string;
  parentInfo: string;
  image: string;
  instagramHandle: string;
}

interface IndividualPartnerSectionsProps {
  groom: PartnerInfo;
  bride: PartnerInfo;
}
```

### Updated Constants Structure

The `WEDDING_DETAILS` object will be extended with:
```typescript
groomDetails: {
  fullName: "Mathew Agape Sitorus",
  parentInfo: "Putra dari Bapak Mangapul Sitorus & Ibu Yiendertivita Damanik",
  image: "placeholder-groom-full.jpg",
  instagramHandle: "mathew_instagram"
},
brideDetails: {
  fullName: "Anjelia Septriani Siahaan", 
  parentInfo: "Putri dari Bapak Israel Siahaan (Alm) & Ibu Mariana Nursita Hasibuansection",
  image: "placeholder-bride-full.jpg",
  instagramHandle: "anjelia_instagram"
}
```

## Data Models

### Partner Information Model
```typescript
interface PartnerDetails {
  fullName: string;
  parentInfo: string;
  image: string;
  instagramHandle: string;
}
```

### Updated WeddingDetails Type
The existing `WeddingDetails` interface will be extended to include:
- `groomDetails: PartnerDetails`
- `brideDetails: PartnerDetails`

## Design Specifications

### Layout Structure
Each partner section will follow this structure:
1. **Full-frame background image** - Partner's photo as background
2. **Overlay content** positioned over the image containing:
   - Partner's full name (large, elegant typography)
   - Family information (parent details)
   - Instagram link with icon

### Visual Design
- **Background**: Full-frame partner photo with subtle dark overlay for text readability
- **Typography**: 
  - Partner name: Large serif font (similar to existing hero section)
  - Family info: Medium-sized text with good contrast
- **Instagram Link**: 
  - Instagram icon with handle text
  - Hover effects for interactivity
  - Opens in new tab when clicked
- **Responsive Behavior**:
  - Desktop: Side-by-side or stacked sections with full viewport height
  - Mobile: Stacked sections with adjusted heights for mobile viewing

### Color Scheme
- Maintain existing website colors:
  - Deep green (`#2d5a27`) for headings
  - Rose gold (`#b76e79`) for accents
  - Charcoal gray (`#333333`) for body text
  - Cream (`#faf7f2`) for backgrounds where needed

### Spacing and Layout
- Each section: Full viewport width, minimum 60vh height
- Content positioning: Centered or positioned for optimal readability
- Consistent padding and margins with existing sections
- Smooth transitions between sections

## Error Handling

### Image Loading
- Implement fallback placeholder images if partner photos fail to load
- Use loading states for smooth user experience
- Ensure images are optimized for web performance

### Instagram Links
- Validate Instagram handles before constructing URLs
- Handle cases where Instagram handles might be empty or invalid
- Provide graceful fallback if Instagram is unavailable

### Responsive Breakpoints
- Handle various screen sizes gracefully
- Ensure text remains readable on all devices
- Adjust image positioning and overlay opacity as needed

## Testing Strategy

### Unit Tests
- Test component rendering with valid props
- Test Instagram URL construction
- Test responsive behavior at different breakpoints
- Test image loading and fallback scenarios

### Integration Tests
- Test component integration within the main App component
- Verify proper positioning after BrideGroomSection
- Test smooth scrolling and navigation to the new sections

### Visual Testing
- Verify design consistency across different devices
- Test image overlay readability
- Ensure proper spacing and alignment
- Validate color contrast for accessibility

### Accessibility Testing
- Ensure proper alt text for images
- Test keyboard navigation for Instagram links
- Verify screen reader compatibility
- Check color contrast ratios meet WCAG guidelines

## Implementation Notes

### Performance Considerations
- Use optimized image formats and sizes
- Implement lazy loading for partner images
- Minimize layout shifts during image loading

### SEO Considerations
- Add appropriate meta tags and structured data
- Use semantic HTML elements
- Ensure proper heading hierarchy

### Browser Compatibility
- Test across modern browsers (Chrome, Firefox, Safari, Edge)
- Ensure graceful degradation for older browsers
- Use CSS fallbacks where needed