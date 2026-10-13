
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
const [headline, setHeadline] = useState("");
const [skills, setSkills] = useState<string[]>([]);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function checkUser() {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");

const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("full_name, headline, skills")
  .eq("id", user.id)
  .maybeSingle();

if (!active) return;

if (profileError) {
  console.error("Could not load profile:", profileError.message);
} else if (profile) {
  setFullName(profile.full_name ?? "");
  setHeadline(profile.headline ?? "");
  setSkills(profile.skills ?? []);
}

setLoading(false);
    }

    void checkUser();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    setSigningOut(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(error.message);
      setSigningOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] p-8 text-[#17221d]">
        Loading your dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12 text-[#17221d]">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            amplify<span className="text-emerald-700">.</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-white disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </header>

        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Candidate dashboard
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
  Welcome{fullName ? `, ${fullName}` : " to Amplify"}.
</h1>

{headline && (
  <p className="mt-3 text-lg text-gray-700">{headline}</p>
)}

{skills.length > 0 && (
  <div className="mt-5 flex flex-wrap gap-2">
    {skills.map((skill) => (
      <span
        key={skill}
        className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900"
      >
        {skill}
      </span>
    ))}
  </div>
)}

          <p className="mt-4 text-gray-600">
            Signed in as <span className="font-medium">{email}</span>
          </p>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold">Your professional profile</h2>
            <p className="mt-3 leading-6 text-gray-600">
              Add and update your skills, experience, and projects so your
              professional strengths are easier to understand.
            </p>

            <Link
              href="/profile"
              className="mt-6 inline-flex rounded-full bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900"
            >
              View / Edit Profile
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold">Talent discovery</h2>
            <p className="mt-3 leading-6 text-gray-600">
              Amplify will help connect professional skills and project
              evidence with relevant opportunities.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
              Coming soon
            </span>
          </div>
        </section>

        {message && (
          <p role="status" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
