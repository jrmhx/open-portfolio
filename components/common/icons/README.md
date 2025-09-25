# Icon System

This directory contains a flexible icon system that supports both Lucide React icons and custom SVG icons.

## Structure

```
/components/common/icons/
├── Icon.tsx          # Main Icon component
├── iconMap.tsx       # Icon mapping configuration
├── index.ts          # Exports
├── common/           # Custom SVG components
│   ├── CustomLogo.tsx
│   ├── BrandIcon.tsx
│   └── ...
└── README.md
```

## Usage

### Basic Usage

```tsx
import { Icon } from '@/components/common/icons'

// Using mapped string icons
<Icon name="github" />
<Icon name="mail" />
<Icon name="home" />

// Using size variants
<Icon name="github" size="lg" />
<Icon name="mail" size="xs" />

// With additional props
<Icon 
  name="heart" 
  size="xl" 
  className="text-red-500" 
  strokeWidth={2}
/>

// Custom SVG icons
<Icon name="custom-logo" size="2xl" />
<Icon name="brand-icon" className="text-blue-600" />
```

### Available Sizes

- `xs`: 12px (w-3 h-3)
- `sm`: 16px (w-4 h-4) - default
- `md`: 20px (w-5 h-5)
- `lg`: 24px (w-6 h-6)
- `xl`: 32px (w-8 h-8)
- `2xl`: 40px (w-10 h-10)

## Adding Custom Icons

### Method 1: Create SVG Components

1. Create a new `.tsx` file in the `/common` folder:

```tsx
// /common/MyIcon.tsx
import React from 'react'

const MyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="your-svg-path-here" />
  </svg>
)

export default MyIcon
```

2. Import and add it to `iconMap.tsx`:

```tsx
import MyIcon from './common/MyIcon'

export const iconMap = {
  // ... other icons
  'my-icon': MyIcon,
}
```

3. Use it:

```tsx
<Icon name="my-icon" />
```

### Method 2: Inline SVG in iconMap

```tsx
const InlineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="your-svg-path-here" />
  </svg>
)

export const iconMap = {
  // ... other icons
  'inline-icon': InlineIcon,
}
```

## Available Mapped Icons

### Social
- `github`, `linkedin`, `twitter`, `instagram`, `facebook`

### Navigation
- `home`, `menu`, `close`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`

### Actions
- `mail`, `phone`, `external-link`, `download`, `upload`, `copy`, `edit`, `delete`, `search`

### UI Elements
- `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`
- `plus`, `minus`, `check`, `star`, `heart`

### Technology/Tools
- `code`, `terminal`, `database`, `server`, `globe`, `settings`, `tool`

### Files & Documents
- `file`, `folder`, `document`, `image`

### User & Profile
- `user`, `users`, `profile`

### Status & Alerts
- `info`, `warning`, `error`, `success`

### Custom Icons
- `custom-logo`, `brand-icon`, `example-custom`

## TypeScript Support

The system provides full TypeScript support with autocomplete for icon names:

```tsx
// ✅ TypeScript will autocomplete and validate these
<Icon name="github" />
<Icon name="custom-logo" />

// ❌ TypeScript will warn about invalid names
<Icon name="invalid-icon" />
```

## Fallback to Direct Lucide Icons

If an icon isn't in the map, the component falls back to direct Lucide icon access:

```tsx
// These work even if not in iconMap
<Icon name="Github" />    // Direct Lucide access
<Icon name="Heart" />     // Direct Lucide access
```

## Styling

All icons inherit text color by default (`fill="currentColor"`). You can style them with:

- Tailwind classes: `className="text-blue-500 hover:text-blue-600"`
- Size variants: `size="lg"`
- Lucide props: `strokeWidth={2}`, `color="red"`