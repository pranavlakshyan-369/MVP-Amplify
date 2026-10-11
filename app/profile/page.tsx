
"use client";

import { useEffect, useState } from "react";

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

const storageKey = "amplify-demo-profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          setProfile({ ...emptyProfile, ...parsed } as Profile);
        }
      }
    } catch {
      setMessage("We couldn't load the saved demo profile.");
    } finally {
      setLoaded(true);
    }
  }, []);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
      setMessage("Your demo profile has been saved in this browser.");
    } catch {
      setMessage("We couldn't save your profile. Please check browser storage.");
    }
  }

  function clearProfile() {
    try {
      localStorage.removeItem(storageKey);
      setProfile(emptyProfile);
      setMessage("Your saved demo profile has been cleared.");
    } catch {
      setMessage("We couldn't clear the saved profile.");
    }
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] p-8 text-[#17221d]">
        Loading your demo profile...
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
            className="w-full rounded-full bg-emerald-800 px-6 py-4 font-medium text-white transition hover:bg-emerald-900"
          >
            Save demo profile
          </button>

          {message && (
            <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={clearProfile}
            className="w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Clear saved demo profile
          </button>

          <p className="text-sm leading-6 text-gray-500">
            Prototype only: this profile is saved in this browser, not in a
            secure account or cloud database. Use sample information while testing.
          </p>
        </form>
      </div>
    </main>
  );
}
