
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";




type Candidate = {
  id: string;
  full_name: string;
  headline: string;
  skills: string[];
  experience: string;
  projects: string;
};

export default function RecruiterPage() {
    
  const router = useRouter();
  const [accessChecking, setAccessChecking] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  


const [realCandidates, setRealCandidates] = useState<Candidate[]>([]);
const [candidatesLoading, setCandidatesLoading] = useState(true);
const [candidatesError, setCandidatesError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkRecruiterAccess() {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (profileError || profile?.role !== "recruiter") {
        setAccessDenied(true);
        setAccessChecking(false);
        return;
      }

      setAccessChecking(false);
    }

    void checkRecruiterAccess();

    return () => {
      active = false;
    };
  }, [router]);

  
useEffect(() => {
  let active = true;

  async function loadCandidates() {
    setCandidatesLoading(true);
    setCandidatesError("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc(
        "find_discoverable_candidates"
      );

      if (!active) return;

      if (error) {
        setCandidatesError(error.message);
        setRealCandidates([]);
      } else {
        setRealCandidates((data ?? []) as Candidate[]);
      }
    } catch (err) {
      if (!active) return;

      setRealCandidates([]);
      setCandidatesError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching candidates."
      );
    } finally {
      if (active) {
        setCandidatesLoading(false);
      }
    }
  }

  void loadCandidates();

  return () => {
    active = false;
  };
}, []);


  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [searched, setSearched] = useState(false);
  const [submittedJobTitle, setSubmittedJobTitle] = useState("");
  const [submittedJobDescription, setSubmittedJobDescription] = useState("");

  
const searchText = `${submittedJobTitle} ${submittedJobDescription}`
  .toLowerCase()
  .trim();

const matchingCandidates = searchText
  ? realCandidates.filter((candidate) => {
      const candidateText = [
        candidate.full_name,
        candidate.headline,
        ...candidate.skills,
        candidate.experience,
        candidate.projects,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchTerms = searchText
        .split(/\s+/)
        .filter((term) => term.length > 1);

      return searchTerms.some((term) => candidateText.includes(term));
    })
  : [];



  
  if (accessChecking) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] p-8 text-[#17221d]">
        Checking recruiter access...
      </main>
    );
  }

  if (accessDenied) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] p-8 text-[#17221d]">
        <h1 className="text-2xl font-semibold">Recruiter access required</h1>
        <p className="mt-3 text-gray-600">
          Your account is not approved for the recruiter workspace.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-block rounded-full bg-emerald-800 px-5 py-3 text-white"
        >
          Return to dashboard
        </Link>
      </main>
    );
  }


  





  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-10 text-[#17221d]">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            amplify<span className="text-emerald-700">.</span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-white"
          >
            Candidate dashboard
          </Link>
        </header>

        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Recruiter workspace
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Find talent by what they can do.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Describe the role you're hiring for. Explore sample candidates,
            their skills, and evidence of their work.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Describe your open role</h2>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();

              setSubmittedJobTitle(jobTitle);
              setSubmittedJobDescription(jobDescription);
              setSearched(true);
            }}
          >
            <div>
              <label
                htmlFor="jobTitle"
                className="mb-2 block text-sm font-medium"
              >
                Job title
              </label>

              <input
                id="jobTitle"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="jobDescription"
                className="mb-2 block text-sm font-medium"
              >
                Job description and required skills
              </label>

              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Describe the work, required skills, experience, and what success looks like..."
                rows={5}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-emerald-800 px-6 py-3 font-medium text-white hover:bg-emerald-900"
            >
              Find candidates
            </button>
          </form>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2>{searched ? "Candidate results" : "Discoverable candidates"}</h2>

              {candidatesLoading && (
  <p className="mt-4 text-sm text-gray-500">
    Loading candidate profiles...
  </p>
)}

{!candidatesLoading && candidatesError && (
  <p className="mt-4 text-sm text-red-600">
    Could not load candidates: {candidatesError}
  </p>
)}

{!candidatesLoading &&
  !candidatesError &&
  realCandidates.length === 0 && (
    <p className="mt-4 text-sm text-gray-500">
      No candidates have chosen to be discoverable yet.
    </p>
  )}

              
<p className="mt-2 text-gray-600">
  {searched
    ? `${matchingCandidates.length} candidate(s) matched your search.`
    : "Enter a job title or description to find matching candidates."}
</p>

            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
              Demo data
            </span>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
           
{(searched
  ? matchingCandidates
  : realCandidates
).map((candidate) => (

              <article
                key={candidate.id}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{candidate.full_name}</h3>
                    <p className="mt-1 text-gray-600">{candidate.headline}</p>
                    <p className="mt-1 text-sm text-gray-500">
                    
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
                    Sample profile
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                
<div className="mt-5 rounded-2xl bg-[#f8f7f4] p-4">
  <p className="text-sm font-semibold">Project evidence</p>
  <p className="mt-2 text-sm leading-6 text-gray-600">
    {candidate.projects || "No project details provided yet."}
  </p>
</div>

              </article>
            ))}
          </div>

          {searched && matchingCandidates.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-8 text-center">
              <h3 className="font-semibold">No matching candidates found</h3>
              <p className="mt-2 text-sm text-gray-600">
                Try skills such as React, TypeScript, Node.js, Python, or PostgreSQL.
              </p>
            </div>
          )}

          <p className="mt-6 text-sm leading-6 text-gray-500">
            These are fictional demo profiles. Matching currently uses simple
            keyword checks, not AI or a validated candidate-ranking model.
          </p>
        </section>
      </div>
    </main>
  );
}