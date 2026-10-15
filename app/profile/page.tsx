
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

type Profile = {
  name: string;
  headline: string;
  location: string;
  skills: string;
  experience: string;
  projects: string;
};

const emptyProfile: Profile = {
  name: "",
  headline: "",
  location: "",
  skills: "",
  experience: "",
  projects: "",
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [discoverable, setDiscoverable] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      const supabase = createClient();

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.replace("/login");
          return;
        }

        if (!active) return;
        

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data && active) {
          setProfile({
            name: data.full_name ?? "",
            headline: data.headline ?? "",
            location: data.location ?? "",
            skills: Array.isArray(data.skills)
              ? data.skills.join(", ")
              : "",
            experience: data.experience ?? "",
            projects: data.projects ?? "",
          });
        }
      } catch (error) {
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Couldn't load your profile."
          );
        }
      } finally {
        if (active) setLoaded(true);
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, [router]);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
     if (!user) {
  throw new Error("You're not signed in. Please sign in and try again.");
}

      const skills = profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: profile.name.trim(),
          headline: profile.headline.trim(),
          location: profile.location.trim(),
          skills,
          experience: profile.experience.trim(),
          projects: profile.projects.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      setMessage("Your profile has been saved to Amplify.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Couldn't save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] p-8 text-[#17221d]">
        Loading your profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12 text-[#17221d]">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-xl font-bold tracking-tight">
          amplify<span className="text-emerald-700">.</span>
        </a>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Professional profile
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Tell us about yourself.
          </h1>
          <p className="mt-4 leading-7 text-gray-600">
            Share your skills, experience, and projects so your professional
            capabilities can be understood in context.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              value={profile.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label htmlFor="headline" className="mb-2 block text-sm font-medium">
              Professional headline
            </label>
            <input
              id="headline"
              value={profile.headline}
              onChange={(event) => updateField("headline", event.target.value)}
              required
              placeholder="e.g. Product designer, software engineer"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium">
              Location (optional)
            </label>
            <input
              id="location"
              value={profile.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="City or region"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label htmlFor="skills" className="mb-2 block text-sm font-medium">
              Skills
            </label>
            <textarea
              id="skills"
              value={profile.skills}
              onChange={(event) => updateField("skills", event.target.value)}
              required
              rows={3}
              placeholder="e.g. TypeScript, user research, project management"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
            <p className="mt-2 text-xs text-gray-500">
              Separate skills with commas for now.
            </p>
          </div>

          <div>
            <label htmlFor="experience" className="mb-2 block text-sm font-medium">
              Work experience
            </label>
            <textarea
              id="experience"
              value={profile.experience}
              onChange={(event) => updateField("experience", event.target.value)}
              rows={4}
              placeholder="Describe relevant roles, responsibilities, and achievements."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label htmlFor="projects" className="mb-2 block text-sm font-medium">
              Projects and evidence
            </label>
            <textarea
              id="projects"
              value={profile.projects}
              onChange={(event) => updateField("projects", event.target.value)}
              rows={4}
              placeholder="Describe projects, your contribution, and any portfolio links."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-emerald-800 px-6 py-4 font-medium text-white transition hover:bg-emerald-900 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>

          {message && (
            <p
              role="status"
              className="break-words rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900"
            >
              {message}
            </p>
          )}

          <p className="text-sm leading-6 text-gray-500">
            Your profile is saved to your Amplify account. Only authenticated
            users who satisfy the database's access policies can read or change
            their own profile.
          </p>
        </form>
      </div>
    </main>
  );
}
