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
    slug: "st-andrews-rental-scams",
    title: "St Andrews Rental Scams: What Students Lose Every Year (And How Not To Be Next)",
    date: "April 2025",
    excerpt:
      "Three St Andrews students lost a combined £12,000 to housing scams in a single year. Here's exactly how the scams work, the red flags to spot, and the steps that protect you.",
    cover_image: "/images/blog/rental-scams-cover.jpg",
    cover_image_alt: "A student looking at a letting agent window display in St Andrews",
  },
  {
    slug: "parents-guide-student-housing",
    title: "A Parent's Guide to Student Housing in St Andrews",
    date: "April 2025",
    excerpt:
      "Costs, timelines, HMO rules, rental fraud, and guarantor arrangements — everything parents need to know before their child leaves halls.",
    cover_image: "/images/blog/parents-guide-cover.jpg",
    cover_image_alt: "St Andrews town viewed from the castle ruins",
  },
  {
    slug: "second-year-housing-scramble",
    title: "The St Andrews Second-Year Housing Scramble: A Survival Guide (2025–26)",
    date: "April 2025",
    excerpt:
      "Timelines, costs, agents, HMO rules, and how to avoid getting caught without a flat. Everything first-years need to know before the January drop.",
    cover_image: "/images/blog/second-year-scramble-cover.jpg",
    cover_image_alt: "Students walking along a street in St Andrews",
  },
  {
    slug: "best-streets-st-andrews",
    title: "Best Streets for Students in St Andrews",
    date: "April 2025",
    excerpt:
      "North Street or Lade Braes? Central or value? A practical breakdown of where to live in St Andrews for 2nd, 3rd, and 4th year.",
    cover_image: "/images/blog/best-streets-cover.jpg",
    cover_image_alt: "North Street in St Andrews on a sunny day",
  },
  {
    slug: "housing-timeline-st-andrews",
    title: "St Andrews Housing Timeline: When to Start Looking",
    date: "April 2025",
    excerpt:
      "The St Andrews rental market moves faster than almost any other UK university town. Here's a month-by-month guide so you don't miss out.",
    cover_image: "/images/blog/housing-timeline-cover.jpg",
    cover_image_alt: "A calendar on a desk next to a set of house keys",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Student Housing Guides
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Practical guides on finding accommodation in St Andrews.
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors group"
            >
              {post.cover_image && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "200px" }}>
                  <Image
                    src={post.cover_image}
                    alt={post.cover_image_alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">{post.excerpt}</p>
                <span className="inline-block mt-3 text-sm text-blue-600 font-medium">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
