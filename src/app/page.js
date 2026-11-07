import Link from "next/link";
import {
  ArrowRight,
  CaretDown,
  Code,
  Database,
  Funnel,
  LinkBreak,
  ListChecks,
  LockKey,
  ShareNetwork,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import TaglineReveal from "@/components/TaglineReveal";

const code = `import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}`;

const benefits = [
  {
    icon: Code,
    title: "Safe defaults from the first commit",
    text: "Copy tested patterns for password hashing, AES 256 GCM encryption and Zod validation instead of writing them from memory.",
  },
  {
    icon: ListChecks,
    title: "See your gaps before launch",
    text: "Tick eight checks and get a weighted score out of 100, plus the three fixes to make first.",
  },
  {
    icon: LinkBreak,
    title: "Spot fake links before anyone taps",
    text: "Paste a link and see which red flags it triggers, from lookalike domains to pages pretending to be bKash.",
  },
  {
    icon: ShareNetwork,
    title: "Share the result with your team",
    text: "Save a report and send one link to your lead, so everyone sees the same score.",
  },
];

const steps = [
  {
    n: "01",
    title: "Copy a template",
    text: "Pick password handling, encrypted storage or API validation and copy the code into your project.",
  },
  {
    n: "02",
    title: "Run the checklist",
    text: "Tick what your project already does and watch your score update.",
  },
  {
    n: "03",
    title: "Fix and share",
    text: "Work through the next fixes, then save a report link for your team.",
  },
];

const proof = [
  {
    icon: LockKey,
    title: "bcrypt hashing",
    text: "Passwords hashed at cost 12.",
  },
  {
    icon: Database,
    title: "AES 256 GCM",
    text: "Stored data encrypted and tamper checked.",
  },
  {
    icon: Funnel,
    title: "Zod validation",
    text: "Every request body checked on the server.",
  },
  {
    icon: ShieldCheck,
    title: "Security headers",
    text: "Set on every page of this app.",
  },
];

const faqs = [
  [
    "Who is SecureStart BD for?",
    "Small development teams and solo developers in Bangladesh who build apps that handle logins, payments or personal data.",
  ],
  [
    "Is it free?",
    "Yes. The templates, checklist and link checker are free, and you do not need an account.",
  ],
  [
    "Can I trust the templates?",
    "They follow common practice: bcrypt for passwords, AES 256 GCM for stored data and schema validation for requests. Review and test any code before you ship it, including ours.",
  ],
  [
    "Does the link checker guarantee a link is safe?",
    "No. It looks for known red flags such as lookalike domains, raw IP addresses and shortened links. A low score does not prove a link is safe, so never share an OTP or password.",
  ],
  [
    "What happens to my checklist answers?",
    "Nothing is stored unless you press save. A saved report holds the items you ticked and your score, and anyone with its link can open it.",
  ],
  [
    "Will templates stop every attack?",
    "No. Templates prevent common mistakes. Advanced attacks also need stronger regulation, infrastructure upgrades and ongoing maintenance.",
  ],
  [
    "Which stack do the templates use?",
    "JavaScript with Next.js, plus Zod, bcryptjs and the Node crypto module.",
  ],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function Section({ tone = "white", children }) {
  return (
    <section
      className={`px-4 py-20 ${tone === "soft" ? "bg-neutral-50/60" : ""}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHead({ title, text }) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <h2 className="heading-3 max-w-[680px]">{title}</h2>
      {text && <p className="body-3 max-w-[680px] text-neutral-600">{text}</p>}
    </div>
  );
}

function Cta() {
  return (
    <Link href="/templates" className="btn-primary">
      Browse the templates
      <ArrowRight size={20} weight="bold" aria-hidden="true" />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <section className="px-4 pb-20 pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <span className="caption-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900">
              <ShieldCheck size={16} weight="bold" aria-hidden="true" />
              Free and open source
            </span>
            <h1 className="heading-1 max-w-[680px] bg-linear-to-r from-black to-[#666666] bg-clip-text text-transparent">
              Secure code,
              <br />
              ready to copy
            </h1>
            <p className="body-3 max-w-[680px] text-neutral-600">
              Safe templates for login, encrypted storage and API validation,
              built for small development teams in Bangladesh. Add a security
              checklist and a fake link checker, all free with no account.
            </p>
            <Cta />
            <p className="caption-2 text-neutral-600">
              3 copy ready templates, an 8 point checklist and 10 link checks.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-2">
            <div className="rounded-lg bg-[#181818]">
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-neutral-400">
                <span className="caption-4 font-mono">lib/auth.js</span>
                <span className="caption-4 flex items-center gap-1">
                  <LockKey size={16} aria-hidden="true" />
                  Safe password handling
                </span>
              </div>
              <pre className="caption-2 overflow-x-auto px-4 pb-4 font-mono text-neutral-100">
                <code>{code}</code>
              </pre>
            </div>
            <p className="caption-1 mt-2 rounded-lg bg-emerald-50 p-3 text-emerald-900">
              Prevents stolen databases from exposing plain text passwords.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Problem to solution */}
      <Section tone="soft">
        <Reveal>
          <SectionHead title="Digital services are outgrowing their security" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="title-1 mb-3">The problem</h3>
              <p className="body-3 text-neutral-600">
                Mobile wallets, online banking and public services keep
                expanding. Small teams ship fast, and basic security steps get
                skipped when deadlines tighten. Users pay for it with lost money
                and exposed National ID details.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="title-1 mb-3">The fix</h3>
              <p className="body-3 text-neutral-600">
                SecureStart BD puts the safe version of each basic step one copy
                away. Start from tested patterns, check your gaps against a
                short list and share what is left to fix.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 3. Benefits */}
      <Section>
        <Reveal>
          <SectionHead title="Fewer basic mistakes, less guesswork" />
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card p-6 transition-[transform,border-color] duration-500 ease-base hover:-translate-y-1 hover:border-emerald-700"
              >
                <Icon
                  size={32}
                  weight="duotone"
                  className="mb-4 text-emerald-700"
                  aria-hidden="true"
                />
                <h3 className="title-1 mb-2">{title}</h3>
                <p className="body-3 text-neutral-600">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 4. Tagline reveal */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <TaglineReveal text="Good security should not depend on your budget. Every small team deserves a safe place to start." />
        </div>
      </section>

      {/* 5. How it works */}
      <Section tone="soft">
        <Reveal>
          <SectionHead
            title="How it works"
            text="Three steps, and you can stop after any of them."
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="card p-6">
                <span className="caption-4 font-mono text-emerald-800">
                  {s.n}
                </span>
                <h3 className="title-1 mb-2 mt-2">{s.title}</h3>
                <p className="body-3 text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* 6. Proof */}
      <Section>
        <Reveal>
          <SectionHead
            title="Built on patterns your team can check"
            text="Everything here uses standard tools, and you can read every line before you copy it."
          />
          {/* {{testimonial}}: add a real quote here once you have one */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <Icon
                  size={24}
                  weight="bold"
                  className="mb-3 text-emerald-700"
                  aria-hidden="true"
                />
                <h3 className="title-1 mb-1">{title}</h3>
                <p className="body-3 text-neutral-600">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 7. FAQ */}
      <Section tone="soft">
        <Reveal>
          <SectionHead title="Questions people ask" />
          <div className="flex max-w-[680px] flex-col gap-3">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group card px-6 transition-colors duration-300 ease-base hover:border-emerald-700"
              >
                <summary className="title-1 flex cursor-pointer list-none items-center justify-between gap-4 py-4 transition-transform duration-300 ease-base active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">
                  {q}
                  <CaretDown
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-500 ease-base group-open:rotate-180"
                  />
                </summary>
                <p className="body-3 pb-4 text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 8. Risk reversal and final CTA */}
      <section className="px-4 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#181818] px-6 py-12 text-center">
            <h2 className="heading-3 max-w-[680px] text-white">
              Start with the templates
            </h2>
            <p className="body-3 max-w-[680px] text-neutral-300">
              Free to use. No account. No credit card. Nothing is saved unless
              you press save.
            </p>
            <Cta />
          </div>
        </Reveal>
      </section>
    </>
  );
}
