import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Student Housing Insights | standrewsflats.uk",
  description:
    "Guides and insights on finding student accommodation in St Andrews — timelines, best streets, letting agents, and more.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog" },
};

const posts = [
  {
    slug: "parents-guide-student-housing",
    title: "A Parent's Guide to Student Housing in St Andrews",
    date: "April 2025",
    excerpt:
      "Costs, timelines, HMO rules, rental fraud, and guarantor arrangements — everything parents need to know before their child leaves halls.",
  },
  {
    slug: "second-year-housing-scramble",
    title: "The St Andrews Second-Year Housing Scramble: A Survival Guide (2025–26)",
    date: "April 2025",
    excerpt:
      "Timelines, costs, agents, HMO rules, and how to avoid getting caught without a flat. Everything first-years need to know before the January drop.",
  },
  {
    slug: "best-streets-st-andrews",
    title: "Best Streets for Students in St Andrews",
    date: "April 2025",
    excerpt:
      "North Street or Lade Braes? Central or value? A practical breakdown of where to live in St Andrews for 2nd, 3rd, and 4th year.",
  },
  {
    slug: "housing-timeline-st-andrews",
    title: "St Andrews Housing Timeline: When to Start Looking",
    date: "April 2025",
    excerpt:
      "The St Andrews rental market moves faster than almost any other UK university town. Here's a month-by-month guide so you don't miss out.",
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
          St Andrews Student Housing Insights
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Practical guides on finding accommodation in St Andrews.
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors group"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{post.date}</p>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm">{post.excerpt}</p>
              <span className="inline-block mt-3 text-sm text-blue-600 font-medium">Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
