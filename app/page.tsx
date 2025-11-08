"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const messages = useQuery(api.myFunctions.listMessages) ?? [];
  const sendMessage = useMutation(api.myFunctions.sendMessage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Next.js + Convex Template
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>

          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No messages yet. Send one below!</p>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className="bg-slate-100 dark:bg-slate-700 p-3 rounded">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(msg._creationTime).toLocaleTimeString()}
                  </p>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem("message") as HTMLInputElement;
              void sendMessage({ text: input.value });
              form.reset();
            }}
            className="flex gap-2"
          >
            <input
              name="message"
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Edit <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">app/page.tsx</code> to modify this page</p>
          <p>Edit <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">convex/myFunctions.ts</code> to modify backend functions</p>
        </div>
      </div>
    </main>
  );
}
