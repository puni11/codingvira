// app/services/page.tsx
// Server component: no "use client", no state, no JS needed for the buttons or FAQs.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AppWindow,
  Check,
  ChevronDown,
  Cloud,
  FileText,
  Gauge,
  Globe,
  Headset,
  LayoutTemplate,
  Lock,
  Server,
  ShieldCheck,
  ShoppingBag,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Codevira",
  description:
    "Cloud, product engineering and case studies from Codevira's managed services team.",
};

type Service = {
  title: string;
  desc: string; // short tagline
  about: string; // longer explanation
  features: string[]; // what is included
  bestFor: string; // who it suits
  icon: ReactNode;
};
type Group = { id: string; label: string; intro: string; items: Service[] };

const icon = "h-5 w-5";

const groups: Group[] = [
  {
    id: "cloud",
    label: "Cloud Services",
    intro:
      "We design, run and secure your infrastructure on the platform that fits your workload.",
    items: [
      {
        title: "Amazon Web Services",
        desc: "Scalable infrastructure & storage",
        about:
          "We plan and run your workloads on AWS, from a first migration to a production setup that scales with traffic and keeps costs predictable.",
        features: [
          "Architecture design and migration from on-premises or other clouds",
          "EC2, containers and serverless setups with auto-scaling",
          "S3, RDS and backup plans with tested recovery",
          "Monthly cost reviews and right-sizing",
        ],
        bestFor: "Teams that need to grow fast or move off their own servers.",
        icon: <Cloud className={icon} />,
      },
      {
        title: "Microsoft Azure",
        desc: "Enterprise hybrid cloud solutions",
        about:
          "We connect your existing Microsoft environment to Azure, so you can move at your own pace and keep systems that already work.",
        features: [
          "Hybrid networking between offices, data centres and Azure",
          "Single sign-on and access control with Entra ID",
          "App Service, AKS and virtual machine hosting",
          "Governance policies, budgets and audit reports",
        ],
        bestFor: "Companies already using Microsoft 365 or Windows Server.",
        icon: <AppWindow className={icon} />,
      },
      {
        title: "Google Cloud Platform",
        desc: "AI, Data Analytics & Kubernetes",
        about:
          "We build data and container platforms on Google Cloud, so your team can analyse data and ship models without managing the plumbing.",
        features: [
          "Managed Kubernetes (GKE) clusters and deployment pipelines",
          "BigQuery data warehouses and reporting pipelines",
          "Vertex AI setups for training and serving models",
          "Cloud Run for simple, pay-as-you-use services",
        ],
        bestFor: "Data-heavy products and teams running containers at scale.",
        icon: <Globe className={icon} />,
      },
      {
        title: "Private Cloud",
        desc: "Dedicated single-tenant environments",
        about:
          "We set up an environment that only your company uses, with the same automation as public cloud and full control over where data lives.",
        features: [
          "Dedicated hardware or isolated virtual infrastructure",
          "Data residency in the region you choose",
          "Infrastructure as code for repeatable builds",
          "24/7 monitoring and patching by our team",
        ],
        bestFor: "Regulated industries and workloads with strict data rules.",
        icon: <Server className={icon} />,
      },
      {
        title: "Multi-Cloud Security",
        desc: "Unified protection across all platforms",
        about:
          "We bring security for every cloud you use into one view, so gaps are found and fixed before they become incidents.",
        features: [
          "One dashboard for alerts across AWS, Azure and Google Cloud",
          "Misconfiguration scanning and vulnerability management",
          "Identity review and least-privilege access",
          "Incident response plan and regular drills",
        ],
        bestFor: "Companies using more than one cloud, or preparing for an audit.",
        icon: <ShieldCheck className={icon} />,
      },
    ],
  },
  {
    id: "product",
    label: "Product Services",
    intro:
      "From the first screen to the production API, we build the product your customers use.",
    items: [
      {
        title: "Modern Frontend",
        desc: "React, Next.js, Vue",
        about:
          "We build fast, accessible interfaces that work well on every device and are simple for your team to keep extending.",
        features: [
          "React, Next.js and Vue applications with TypeScript",
          "Design systems and reusable component libraries",
          "Performance and accessibility testing before launch",
          "Search-friendly pages with server-side rendering",
        ],
        bestFor: "New web apps, redesigns and slow or hard-to-maintain sites.",
        icon: <LayoutTemplate className={icon} />,
      },
      {
        title: "Backend Systems",
        desc: "Node.js, Python, Go",
        about:
          "We build the APIs, databases and background jobs behind your product, with clear documentation and tests so they stay reliable as you grow.",
        features: [
          "REST and GraphQL APIs in Node.js, Python or Go",
          "Database design for PostgreSQL, MySQL and MongoDB",
          "Queues, scheduled jobs and third-party integrations",
          "Automated testing and deployment pipelines",
        ],
        bestFor: "Products that need a solid core or are outgrowing their first version.",
        icon: <Terminal className={icon} />,
      },
      {
        title: "E-commerce",
        desc: "Shopify & Custom Stores",
        about:
          "We build online stores that load quickly and make buying easy, using Shopify where it fits and custom code where you need more.",
        features: [
          "Shopify theme setup and custom apps",
          "Custom storefronts for complex catalogues",
          "Payment, shipping and tax integrations",
          "Inventory and order sync with your back office",
        ],
        bestFor: "Brands launching a store or moving to a new platform.",
        icon: <ShoppingBag className={icon} />,
      },
      {
        title: "Headless CMS",
        desc: "Sanity, Strapi, Contentful",
        about:
          "We set up a content system your editors enjoy using, and deliver that content to your website, app or any other channel.",
        features: [
          "Setup of Sanity, Strapi or Contentful",
          "Content models built around your pages and workflows",
          "Preview, scheduling and role-based editing",
          "Migration of content from your current CMS",
        ],
        bestFor: "Marketing teams that publish often across several channels.",
        icon: <FileText className={icon} />,
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    intro: "See how we have solved problems like yours.",
    items: [
      {
        title: "Case Studies",
        desc: "Real world examples",
        about:
          "Short write-ups of projects we have delivered, covering the problem, what we built and the results. Ask us for examples close to your industry.",
        features: [
          "Cloud migrations and cost reductions",
          "Product launches from idea to production",
          "Security improvements and audit preparation",
          "References available on request",
        ],
        bestFor: "Anyone comparing partners or planning a similar project.",
        icon: <Zap className={icon} />,
      },
    ],
  },
];

const reasons = [
  {
    title: "One team, start to finish",
    desc: "Cloud, backend and frontend engineers work together, so nothing gets lost between vendors.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Security built in",
    desc: "Access control, monitoring and patching are part of every engagement, not an add-on.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Fast, steady delivery",
    desc: "Small releases ship often, with clear status updates so you always know where things stand.",
    icon: <Gauge className="h-6 w-6" />,
  },
  {
    title: "Support when you need it",
    desc: "A named contact and a response commitment for every plan, including after launch.",
    icon: <Headset className="h-6 w-6" />,
  },
];

const faqs = [
  {
    q: "Which cloud platform should we choose?",
    a: "It depends on your workload, compliance needs and existing tools. Tell us what you run today and we will recommend a platform, or a mix of platforms, and explain why.",
  },
  {
    q: "Can you work with our existing infrastructure?",
    a: "Yes. We start by reviewing what you have, then improve it step by step. You do not need to rebuild from scratch.",
  },
  {
    q: "Do you build and run the product, or only one of them?",
    a: "Either. You can hire us to build, to manage, or both. Many clients start with one and add the other later.",
  },
  {
    q: "How does pricing work?",
    a: "Projects are quoted after a short discovery call. Ongoing managed services are billed monthly based on the scope we agree together.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most projects begin within two weeks of the first call. Contact us with your goals and we will confirm a start date.",
  },
];

/**
 * A real <button> that sends the visitor to /contact-us.
 * It is a plain GET form, so it works in a server component without client JS.
 * The service name is passed as ?service=... so the contact page can prefill it.
 */
function ContactButton({
  service,
  variant = "dark",
  children = "Contact us",
}: {
  service?: string;
  variant?: "dark" | "primary" | "outline" | "light";
  children?: ReactNode;
}) {
  const styles = {
    dark: "bg-[#1A1A1A] text-white hover:bg-black",
    primary:
      "bg-[#8B5CF6] text-white border border-[#8B5CF6] shadow-[0_10px_15px_-3px_rgba(139,92,246,0.35),0_4px_6px_-4px_rgba(139,92,246,0.35)] hover:opacity-80",
    outline:
      "bg-white text-[#171717] border border-[#CCCCCC] hover:bg-[#F3F4F6]",
    light: "bg-white text-black hover:opacity-80",
  }[variant];

  return (
    <form action="/contact-us" method="get">
      {service && <input type="hidden" name="service" value={service} />}
      <button
        type="submit"
        className={`inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 text-[16px] font-medium leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 ${styles}`}
      >
        {children}
      </button>
    </form>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-white font-sans text-[#171717] antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rotate-12 opacity-30 blur-[24px]"
          style={{
            background:
              "linear-gradient(to right bottom, #8B5CF6 0%, #A5B4FC 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
          <h1 className="max-w-[820px] text-[48px] font-normal leading-none tracking-[-1.2px] text-black md:text-[60px] md:tracking-[-1.5px]">
            Cloud and product engineering, managed by one team
          </h1>
          <p className="mt-8 max-w-[620px] text-[18px] leading-[1.63] text-[#646464]">
            We set up your infrastructure, build your product and keep both
            running. You get one partner who answers for the whole stack.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ContactButton variant="primary">Talk to our team</ContactButton>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#CCCCCC] bg-white px-8 text-[16px] font-medium leading-6 text-[#171717] transition hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
            >
              See services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <div id="services">
        {groups.map((group, i) => {
          const dark = i === 0;
          const band = i === 1 ? "bg-[#F3F4F6]" : dark ? "bg-[#0A0A0A]" : "bg-white";
          const muted = dark ? "text-[#A09EA5]" : "text-[#646464]";
          return (
            <section key={group.id} id={group.id} className={band}>
              <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-12 md:py-20">
                <h2
                  className={`text-[36px] font-normal leading-[1.1] tracking-[-0.9px] ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  {group.label}
                </h2>
                <p className={`mt-4 max-w-[560px] text-[16px] leading-[1.63] ${muted}`}>
                  {group.intro}
                </p>

                <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((s) => (
                    <li
                      key={s.title}
                      className={`flex flex-col border p-10 ${
                        dark
                          ? "border-white/10 bg-[#1A1A1A] text-white"
                          : "border-[#E5E5E5] bg-white text-[#171717] shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <span
                        className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full ${
                          dark
                            ? "bg-[#8B5CF6] text-white"
                            : "bg-[#F3F4F6] text-[#8B5CF6]"
                        }`}
                      >
                        {s.icon}
                      </span>
                      <h3 className="text-[20px] font-normal leading-[1.4]">
                        {s.title}
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[1.63] ${muted}`}>
                        {s.desc}
                      </p>

                      <p className="mt-6 text-[16px] leading-[1.63]">{s.about}</p>

                      <ul className="mt-6 space-y-3">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex gap-3 text-[14px] leading-[1.43]"
                          >
                            <Check
                              aria-hidden
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#8B5CF6]"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <p
                        className={`mt-6 flex-1 border-t pt-6 text-[14px] leading-[1.63] ${
                          dark ? "border-white/10" : "border-[#E5E5E5]"
                        } ${muted}`}
                      >
                        <span
                          className={`font-medium ${
                            dark ? "text-white" : "text-black"
                          }`}
                        >
                          Best for:
                        </span>{" "}
                        {s.bestFor}
                      </p>

                      <div className="mt-8">
                        <ContactButton
                          service={s.title}
                          variant={dark ? "light" : "dark"}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Why us */}
      <section className="relative overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, rgba(0,0,0,0) 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-14 md:px-12 md:py-24">
          <h2 className="max-w-[640px] text-[48px] font-medium leading-[1.1] tracking-[-1.2px]">
            Why teams choose Codevira
          </h2>
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="bg-[#0A0A0A] p-10">
                <span className="text-[#8B5CF6]">{r.icon}</span>
                <h3 className="mt-6 text-[20px] font-normal leading-[1.25]">
                  {r.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.63] text-[#A09EA5]">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 md:px-12 md:py-24 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[48px] font-normal leading-[1.1] tracking-[-1.2px] text-black">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-[360px] text-[16px] leading-[1.63] text-[#646464]">
              Can&apos;t find your answer? Send us a message and we will reply
              within one business day.
            </p>
            <div className="mt-8">
              <ContactButton variant="outline">Ask a question</ContactButton>
            </div>
          </div>

          <div className="border-t border-[#E5E5E5]">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-[#E5E5E5]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[20px] leading-[1.4] text-black transition hover:text-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-[680px] pb-6 text-[16px] leading-[1.63] text-[#646464]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}