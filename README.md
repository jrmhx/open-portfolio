This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Structure Template

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