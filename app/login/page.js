"use client";

import { createClient } from "@/lib/supabase";
import { LogIn } from "lucide-react";

export default function Login() {
  const supabase = createClient();

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Idea Dashboard
        </h1>
        <p className="mb-6 text-gray-600">
          Sign in to track your startup ideas and gain insights.
        </p>
        <button
          onClick={handleGitHubLogin}
          className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

