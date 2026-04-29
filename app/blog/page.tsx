import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Housing Guides | standrewsflats.uk",
  description:
    "Guides and insights on finding student accommodation in St Andrews — timelines, best streets, letting agents, and more.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog" },
};

const posts = [
  {
    slug: "student-renter-legal-rights-st-andrews-parents-guide",
    title: "Your Child's Legal Rights as a Student Renter in St Andrews: What Every Parent Needs to Know",
    date: "April 2026",
    tag: "Legal",
    excerpt:
      "Parents' guide to the legal protections covering student renters in St Andrews — HMO licensing, deposits, lease terms, and what to do when things go wrong.",
    cover_image: "/images/blog/student-renter-legal-rights-st-andrews-parents-guide-cover.png",
    cover_image_alt: "Parents helping a student move into accommodation",
  },
  {
    slug: "how-to-read-student-letting-contract-st-andrews",
    title: "How to Read a Student Letting Contract in St Andrews: What to Check Before You Sign",
    date: "April 2026",
    tag: "Legal",
    excerpt:
      "Before you sign a St Andrews student flat contract, know exactly what to check. A practical guide to leases, deposits, HMO licences, and tenant rights.",
    cover_image: "/images/blog/how-to-read-student-letting-contract-st-andrews-cover.png",
    cover_image_alt: "Reviewing a lease contract",
  },
  {
    slug: "international-student-rights",
    title: "Renting in St Andrews as an International Student: Your Legal Rights, Your Protections, and What Nobody Tells You",
    date: "April 2025",
    tag: "International",
    excerpt:
      "Scottish tenancy law, deposit protection, HMO licensing, guarantor requirements, and fraud protection — a complete guide for international students renting in St Andrews.",
    cover_image: "/images/blog/international-student-rights-cover.png",
    cover_image_alt: "International students walking through St Andrews town centre",
  },
  {
    slug: "st-andrews-rental-scams",
    title: "St Andrews Rental Scams: What Students Lose Every Year (And How Not To Be Next)",
    date: "April 2025",
    tag: "Safety",
    excerpt:
      "Three St Andrews students lost a combined £12,000 to housing scams in a single year. Here's exactly how the scams work, the red flags to spot, and the steps that protect you.",
    cover_image: "/images/blog/rental-scams-cover.png",
    cover_image_alt: "A student looking at a letting agent window display in St Andrews",
  },
  {
    slug: "parents-guide-student-housing",
    title: "A Parent's Guide to Student Housing in St Andrews",
    date: "April 2025",
    tag: "Guide",
    excerpt:
      "Costs, timelines, HMO rules, rental fraud, and guarantor arrangements — everything parents need to know before their child leaves halls.",
    cover_image: "/images/blog/parents-guide-cover.png",
    cover_image_alt: "St Andrews town viewed from the castle ruins",
  },
  {
    slug: "second-year-housing-scramble",
    title: "The St Andrews Second-Year Housing Scramble: A Survival Guide (2025–26)",
    date: "April 2025",
    tag: "Guide",
    excerpt:
      "Timelines, costs, agents, HMO rules, and how to avoid getting caught without a flat. Everything first-years need to know before the January drop.",
    cover_image: "/images/blog/second-year-scramble-cover.png",
    cover_image_alt: "Students walking along a street in St Andrews",
  },
  {
    slug: "best-streets-st-andrews",
    title: "Best Streets for Students in St Andrews",
    date: "April 2025",
    tag: "Guide",
    excerpt:
      "North Street or Lade Braes? Central or value? A practical breakdown of where to live in St Andrews for 2nd, 3rd, and 4th year.",
    cover_image: "/images/blog/best-streets-cover.png",
    cover_image_alt: "North Street in St Andrews on a sunny day",
  },
  {
    slug: "housing-timeline-st-andrews",
    title: "St Andrews Housing Timeline: When to Start Looking",
    date: "April 2025",
    tag: "Guide",
    excerpt:
      "The St Andrews rental market moves faster than almost any other UK university town. Here's a month-by-month guide so you don't miss out.",
    cover_image: "/images/blog/housing-timeline-cover.png",
    cover_image_alt: "A calendar on a desk next to a set of house keys",
  },
];

const [featured, ...rest] = posts;

export default function BlogPage() {
  return (
    <main className="min-h-screen px-8 py-12" style={{ background: "var(--cream)" }}>
      <div className="max-w-[1080px] mx-auto">
        <p
          className="font-bold uppercase tracking-widest mb-3"
          style={{ fontSize: 12, color: "var(--coral)" }}
        >
          Guides
        </p>
        <h1
          className="font-extrabold mb-12"
          style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            color: "var(--ink)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
          }}
        >
          Student Housing Guides
        </h1>
        <p className="mb-10" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
          Practical guides on finding accommodation in St Andrews.
        </p>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="featured-post grid grid-cols-2 rounded-[20px] overflow-hidden mb-8 group"
          style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
        >
          <div className="relative" style={{ aspectRatio: "4/3" }}>
            <Image
              src={featured.cover_image}
              alt={featured.cover_image_alt}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 540px"
              priority
            />
          </div>
          <div style={{ padding: "36px 32px" }}>
            <span
              className="inline-block font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-4"
              style={{ fontSize: 11, background: "var(--coral-lt)", color: "var(--coral)" }}
            >
              {featured.tag}
            </span>
            <h2
              className="font-extrabold mb-3 group-hover:text-[var(--coral)] transition-colors"
              style={{ fontSize: 20, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.3 }}
            >
              {featured.title}
            </h2>
            <p className="mb-4" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.7 }}>
              {featured.excerpt}
            </p>
            <p style={{ fontSize: 12, color: "var(--ink-faint)" }}>{featured.date}</p>
            <p className="mt-3 font-semibold" style={{ fontSize: 14, color: "var(--coral)" }}>
              Read guide →
            </p>
          </div>
        </Link>

        {/* Grid */}
        <div className="blog-grid grid grid-cols-3 gap-4">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[16px] overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all"
              style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.cover_image}
                  alt={post.cover_image_alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 700px) 100vw, 340px"
                />
              </div>
              <div className="p-4">
                <p className="mb-1" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{post.date}</p>
                <h2
                  className="font-bold mb-2 group-hover:text-[var(--coral)] transition-colors"
                  style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.4 }}
                >
                  {post.title}
                </h2>
                <p
                  className="mb-3"
                  style={{ fontSize: 12, color: "var(--ink-mid)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {post.excerpt}
                </p>
                <span className="font-semibold" style={{ fontSize: 13, color: "var(--coral)" }}>
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
