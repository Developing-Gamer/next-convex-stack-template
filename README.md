# Next.js + Convex + Stack Auth + shadcn/ui

A minimal, production-ready starter template with authentication, real-time database, and UI components.

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[Convex](https://convex.dev/)** - Real-time database and backend
- **[Stack Auth](https://stack-auth.com/)** - Authentication (OAuth, email, magic links)
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components with Radix UI and Tailwind CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── handler/           # Stack Auth pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/
│   ├── ConvexClientProvider.tsx  # Convex + Auth integration
│   └── ui/                # shadcn/ui components
├── convex/                # Backend code
│   ├── auth.config.ts    # Auth configuration
│   ├── myFunctions.ts    # Example queries/mutations
│   └── schema.ts         # Database schema
├── stack/                 # Stack Auth config
│   ├── client.tsx
│   └── server.tsx
└── lib/                   # Utilities
```

## Setup

### 1. Clone and Install

```bash
git clone https://github.com/Developing-Gamer/next-convex-stack-template.git
cd next-convex-stack-template
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

### 3. Set Up Stack Auth

1. Go to [app.stack-auth.com](https://app.stack-auth.com/) and create a project
2. Copy credentials to `.env.local`:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key
STACK_SECRET_SERVER_KEY=your_secret
```

### 4. Set Up Convex

```bash
npx convex dev
```

This will:

- Prompt you to log in with GitHub
- Create a Convex project
- Add `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` to `.env.local`

**Important:** Add Stack Auth env vars to Convex:

1. Open [Convex Dashboard](https://dashboard.convex.dev/)
2. Go to Settings → Environment Variables
3. Add the 3 Stack Auth variables from `.env.local`

### 5. Run Dev Server

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000)

## Usage Examples

### Authentication

```tsx
// Client Component - Check auth
"use client";
import { useUser } from "@stackframe/stack";

export default function Profile() {
  const user = useUser();
  return user ? <div>Hello {user.displayName}</div> : <div>Sign in</div>;
}
```

```tsx
// Server Component - Protect page
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await stackServerApp.getUser();
  if (!user) redirect("/handler/sign-in");
  return <div>Dashboard</div>;
}
```

### Convex Database

```ts
// convex/schema.ts - Define schema
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});
```

```ts
// convex/tasks.ts - Create functions
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { stackServerApp } from "@stackframe/stack";

export const getTasks = query({
  handler: async (ctx) => {
    const user = await stackServerApp.getPartialUser({ from: "convex", ctx });
    if (!user) return [];
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), user.id))
      .collect();
  },
});

export const addTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const user = await stackServerApp.getPartialUser({ from: "convex", ctx });
    if (!user) throw new Error("Not authenticated");
    await ctx.db.insert("tasks", { text: args.text, userId: user.id });
  },
});
```

```tsx
// Use in component
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Tasks() {
  const tasks = useQuery(api.tasks.getTasks);
  const addTask = useMutation(api.tasks.addTask);

  return (
    <div>
      {tasks?.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
      <button onClick={() => addTask({ text: "New task" })}>Add</button>
    </div>
  );
}
```

### UI Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

Add more components:

```bash
npx shadcn@latest add table
npx shadcn@latest add form
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Deploy Convex: `npx convex deploy`
3. Import to [Vercel](https://vercel.com)
4. Add environment variables (use production Convex URL)
5. Update Stack Auth dashboard with production domain

## Scripts

```bash
npm run dev              # Run frontend + backend
npm run dev:frontend     # Next.js only
npm run dev:backend      # Convex only
npm run build            # Build for production
npm run lint             # Lint code
npx convex deploy        # Deploy backend
```

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Convex Docs](https://docs.convex.dev/)
- [Stack Auth Docs](https://docs.stack-auth.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Convex + Stack Auth Guide](https://docs.stack-auth.com/docs/others/convex)

## License

MIT
