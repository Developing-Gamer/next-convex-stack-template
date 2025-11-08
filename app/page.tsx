"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const user = useUser();
  const messages = useQuery(api.myFunctions.listMessages) ?? [];
  const sendMessage = useMutation(api.myFunctions.sendMessage);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    if (input.value.trim()) {
      void sendMessage({ text: input.value });
      form.reset();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Next.js + Convex + Stack Auth
          </h1>
          <p className="text-muted-foreground mb-6">
            A minimal starter template with authentication, real-time database, and UI components
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="secondary">Convex</Badge>
            <Badge variant="secondary">Stack Auth</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Auth Card */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Stack Auth is pre-configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.profileImageUrl ?? undefined} />
                      <AvatarFallback>
                        {user.displayName?.charAt(0).toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {user.displayName ?? "Anonymous"}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.primaryEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => (window.location.href = "/handler/account-settings")}
                    >
                      Settings
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => user.signOut()}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => (window.location.href = "/handler/sign-in")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = "/handler/sign-up")}
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Real-time Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Database</CardTitle>
              <CardDescription>
                Convex syncs data automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-32 overflow-y-auto space-y-2 mb-4">
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No messages yet
                    </p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg._id}
                        className="text-sm p-2 rounded bg-muted/50"
                      >
                        {msg.text}
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    name="message"
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    Send
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">1. Clone</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Clone the repo and install dependencies
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">2. Configure</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Set up Stack Auth and Convex
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">3. Build</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Start building your app!
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Read the{" "}
            <a
              href="https://github.com/Developing-Gamer/next-convex-stack-template#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              README
            </a>{" "}
            for setup instructions
          </p>
        </div>
      </div>
    </main>
  );
}
