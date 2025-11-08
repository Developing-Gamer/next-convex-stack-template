# Next.js + Convex + Stack Auth Template

A clean, production-ready starter template for building full-stack applications with authentication pre-configured.

## What's Included

- **Next.js 16** - React framework with App Router
- **Convex** - Backend-as-a-service (database, server functions, real-time sync)
- **Stack Auth** - Complete authentication solution with Convex integration
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **ESLint & Prettier** - Code quality and formatting

## Features

- User authentication (sign up, sign in, sign out)
- Protected routes and API endpoints
- Session management
- Database integration with auth context
- Real-time updates via Convex
- Fully typed with TypeScript

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd next-convex-stack-template
npm install
```

### 2. Set Up Stack Auth

Create a free account at [Stack Auth](https://app.stack-auth.com/):

1. Create a new project
2. Copy your project credentials
3. Update `.env.local` with your Stack Auth keys:

```env
# Stack Auth - Get these from https://app.stack-auth.com/
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
STACK_SECRET_SERVER_KEY=your_secret_key

# Convex
CONVEX_DEPLOYMENT=your_deployment_name
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 3. Set Up Convex

```bash
npx convex dev
```

This will:
- Create a Convex deployment (if needed)
- Set up your database schema
- Start the Convex dev server
- Open the Convex dashboard

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## Project Structure

```
├── app/                       # Next.js app directory
│   ├── layout.tsx            # Root layout with Stack Auth provider
│   └── page.tsx              # Home page with example messages
├── components/               # React components
│   └── ConvexClientProvider.tsx  # Convex client with Stack Auth integration
├── convex/                   # Convex backend
│   ├── myFunctions.ts       # Backend functions (queries, mutations)
│   └── schema.ts            # Database schema
├── stack/                    # Stack Auth configuration
│   ├── client.tsx           # Client-side auth setup
│   └── server.tsx           # Server-side auth setup
└── public/                   # Static assets
```

## Example Usage

### Using Authentication

```tsx
import { useUser } from "@stackframe/stack";

export default function MyComponent() {
  const user = useUser();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return <div>Hello, {user.displayName}!</div>;
}
```

### Using Convex with Auth Context

```ts
// convex/myFunctions.ts
import { query, mutation } from "./_generated/server";

export const myQuery = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Your query logic here
  },
});
```

## Customization

- **Frontend**: Edit files in `app/` directory
- **Backend**: Edit files in `convex/` directory
- **Styling**: Modify `app/globals.css` and Tailwind classes
- **Auth Settings**: Configure in Stack Auth dashboard

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Stack Auth Documentation](https://docs.stack-auth.com/)
- [Convex + Stack Auth Integration](https://docs.stack-auth.com/integrations/convex)

## Deployment

### Deploy Convex Backend

```bash
npx convex deploy
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables from `.env.local`
4. Deploy!

Your Convex backend and Next.js frontend will work seamlessly in production.

## License

MIT
