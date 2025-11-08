# Next.js + Convex Template

A clean, minimal starter template for building full-stack applications with [Next.js](https://nextjs.org/) and [Convex](https://convex.dev/).

## What's Included

- **Next.js 16** - React framework with App Router
- **Convex** - Backend-as-a-service (database, server functions, real-time sync)
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **ESLint & Prettier** - Code quality and formatting

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

This will:
- Start the Next.js dev server at [http://localhost:3000](http://localhost:3000)
- Start Convex in dev mode
- Open the Convex dashboard in your browser

3. Start building!

Edit `app/page.tsx` for the frontend and `convex/myFunctions.ts` for backend functions.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ConvexClientProvider.tsx
├── convex/                # Convex backend
│   ├── myFunctions.ts    # Backend functions
│   └── schema.ts         # Database schema
└── public/               # Static assets
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Convex Discord](https://convex.dev/community)

## Deploy

Deploy your Next.js app to [Vercel](https://vercel.com/) and your Convex backend will automatically be deployed alongside it.

```bash
npx convex deploy
```
