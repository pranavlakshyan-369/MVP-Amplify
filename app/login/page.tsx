
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
   const supabase = createClient();
   const router = useRouter();

   const [signedInEmail, setSignedInEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage(
          data.session
            ? "Account created! You are now signed in."
            : "Account created. Check your email for a confirmation link."
        );
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) throw error;

setSignedInEmail(data.user.email ?? "");
router.push("/dashboard");
router.refresh();
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md">
        <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          ← Back to Amplify
        </a>

        <h1 className="mt-8 text-3xl font-bold">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-slate-300">
          {isSignUp
            ? "Join Amplify to build your professional profile."
            : "Sign in to continue to Amplify."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </button>

          {message && (
            <p role="status" className="text-sm text-cyan-200">
              {message}
            </p>
          )}

          <p className="text-center text-sm text-slate-300">
            {isSignUp ? "Already have an account?" : "New to Amplify?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage("");
              }}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </button>
          </p>
        </form>

        {signedInEmail && (
  <div className="mt-6 rounded-xl border border-slate-700 p-4">
    <p className="text-sm text-slate-300">
      Signed in as {signedInEmail}
    </p>

    <button
      type="button"
      onClick={async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          setMessage(error.message);
          return;
        }

        setSignedInEmail("");
        setMessage("Signed out successfully.");
      }}
      className="mt-3 rounded-lg border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
    >
      Sign out
    </button>
  </div>
)}
      </div>
    </main>
  );
}
