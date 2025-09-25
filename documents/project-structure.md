# Structure Template

```bash
.
├── app/                          # Next.js App Router 
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── profile/                 # Profile page route
│   │   └── page.tsx
│   ├── projects/                # Projects page route
│   │   └── page.tsx
│   └── about/                   # About page route
│       └── page.tsx
│
├── components/                   # UI Layer
│   ├── ui/                      # shadcn components (shadcn auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── common/                  # Shared custom components
│       ├── header.tsx
│       ├── footer.tsx
│       └── navigation.tsx
│
├── features/                     # Feature Layer
│   ├── profile/                 # Profile feature module
│   │   ├── components/          # Feature-specific components
│   │   ├── hooks/              # Feature-specific hooks
│   │   └── index.ts            # Feature exports
│   ├── projects/               # Projects feature module
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── about/                  # About feature module
│       ├── components/
│       ├── hooks/
│       └── index.ts
│
├── store/                       # Store Layer (Redux)
│   ├── slices/                 # Redux slices
│   │   ├── profileSlice.ts
│   │   ├── projectsSlice.ts
│   │   └── uiSlice.ts
│   ├── providers.tsx           # Redux providers
│   ├── index.ts               # Store configuration
│   └── types.ts               # Redux types
│
├── lib/                        # Data Layer & Utils 
│   ├── repositories/           # Repository pattern for data
│   │   ├── profileRepository.ts
│   │   ├── projectsRepository.ts
│   │   └── baseRepository.ts
│   ├── services/              # Business services
│   │   └── apiService.ts
│   ├── types/                 # Shared TypeScript types
│   │   └── index.ts
│   └── utils.ts              # Utility functions 
│
├── public/                     # Static assets 
├── components.json             # shadcn config 
├── globals.d.ts               # Type declarations 
├── package.json               # Dependencies 
├── tsconfig.json             # TypeScript config 
└── ...config files
```