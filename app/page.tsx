
const features = [
  {
    number: "01",
    title: "Discover real talent",
    description:
      "Explore professional skills, projects, and experience—not just keywords on a résumé.",
  },
  {
    number: "02",
    title: "Match with context",
    description:
      "Use AI to compare job requirements with relevant, candidate-provided evidence.",
  },
  {
    number: "03",
    title: "Hire with clarity",
    description:
      "Understand why candidates match and make more informed hiring decisions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#17221d]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="/" className="text-2xl font-bold tracking-tight">
          amplify<span className="text-emerald-700">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-gray-600 sm:flex">
          <a href="#how-it-works" className="hover:text-emerald-800">
            How it works
          </a>
          <a href="#professionals" className="hover:text-emerald-800">
            For professionals
          </a>
        </nav>

        <a
          href="#get-started"
          className="rounded-full bg-[#17221d] px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900"
        >
          Get started
        </a>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-10 lg:pb-32 lg:pt-24">
        <div>
          <p className="mb-6 inline-flex rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm text-emerald-900">
            A smarter way to discover talent
          </p>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Find the talent
            <br />
            behind the
            <br />
            <span className="text-emerald-700">résumé.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
            Amplify helps teams discover people through their skills,
            experience, projects, and potential—with AI-powered matching
            that explains the why.
          </p>

          <div
            id="get-started"
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#recruiters"
              className="rounded-full bg-emerald-800 px-7 py-4 text-center font-medium text-white transition hover:bg-emerald-900"
            >
              I'm hiring
            </a>
            <a
              href="#professionals"
              className="rounded-full border border-gray-300 bg-white px-7 py-4 text-center font-medium transition hover:border-emerald-800"
            >
              I'm a professional
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Built around relevant evidence, transparency, and consent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-emerald-900/5 blur-2xl" />
          <div className="relative rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <p className="text-sm text-gray-500">AMPLIFY MATCH INSIGHT</p>
                <h2 className="mt-1 text-xl font-semibold">
                  Talent, with context.
                </h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
                Example
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#f8f7f4] p-5">
              <p className="text-sm text-gray-500">ROLE</p>
              <p className="mt-1 text-lg font-semibold">
                Product Designer
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["UX research", "Prototyping", "Design systems"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-900">
                  A
                </div>
                <div>
                  <p className="font-semibold">Relevant project evidence</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    A portfolio project demonstrates user research and
                    iterative prototyping.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-900">
                  +
                </div>
                <div>
                  <p className="font-semibold">Understand the match</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    See supporting evidence and missing requirements before
                    making a decision.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-7 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
              Illustrative example only. No real candidate data or hiring
              score is shown.
            </p>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-gray-200 bg-white px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">
            A better starting point
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Go beyond job titles. See what people can actually do.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-2xl border border-gray-200 p-6 sm:p-8"
              >
                <p className="text-sm font-semibold text-emerald-800">
                  {feature.number}
                </p>
                <h3 className="mt-5 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="professionals"
        className="bg-[#e9efe8] px-6 py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Your work deserves to be seen.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Build a professional profile around your skills, projects, and
            experience. You stay in control of what you choose to share.
          </p>
        </div>
      </section>

      <section id="recruiters" className="px-6 py-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              Ready to rethink talent discovery?
            </h2>
            <p className="mt-2 text-gray-600">
              We're building the foundations of a more thoughtful hiring
              experience.
            </p>
          </div>
          <a
            href="#get-started"
            className="w-fit rounded-full bg-[#17221d] px-6 py-3 font-medium text-white transition hover:bg-emerald-900"
          >
            Explore Amplify
          </a>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-7 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Amplify</p>
          <p>Talent discovery built around evidence and consent.</p>
        </div>
      </footer>
    </main>
  );
}
