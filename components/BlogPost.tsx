'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostProps {
  title: string
  date: string
  body: string
  coverImage?: string
  coverImageAlt?: string
}

// ── Inline formatter ──────────────────────────────────────────────────────────

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>'
    )
}

// ── Markdown → HTML renderer ──────────────────────────────────────────────────
// Handles: ## h2, ### h3, bullet lists, numbered lists, tables, hr, paragraphs.
// Tailwind classes are embedded directly so no prose plugin is needed.

function markdownToHtml(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let inUl = false
  let inOl = false
  let olCount = 0
  let tableBuffer: string[] = []

  function flushTable() {
    if (tableBuffer.length < 2) { tableBuffer = []; return }

    const allRows = tableBuffer.map(l => l.trim())
    const headerRow = allRows[0]
    const bodyRows = allRows.slice(1).filter(l => !/^\|[\s\-:|]+\|$/.test(l))
    const parseRow = (row: string) => row.split('|').slice(1, -1).map(c => c.trim())

    out.push('<div class="overflow-x-auto mb-6"><table class="w-full text-sm border-collapse">')
    out.push('<thead><tr class="bg-gray-100">')
    parseRow(headerRow).forEach(c =>
      out.push(`<th class="text-left p-3 font-semibold text-gray-700 border border-gray-200">${inline(c)}</th>`)
    )
    out.push('</tr></thead>')

    if (bodyRows.length > 0) {
      out.push('<tbody>')
      bodyRows.forEach((row, i) => {
        out.push(`<tr class="${i % 2 === 1 ? 'bg-gray-50' : ''}">`)
        parseRow(row).forEach(c =>
          out.push(`<td class="p-3 text-gray-600 border border-gray-200">${inline(c)}</td>`)
        )
        out.push('</tr>')
      })
      out.push('</tbody>')
    }

    out.push('</table></div>')
    tableBuffer = []
  }

  for (const line of lines) {
    // Table lines — buffer until we leave table context
    if (line.trim().startsWith('|')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      tableBuffer.push(line)
      continue
    } else if (tableBuffer.length > 0) {
      flushTable()
    }

    // H2
    if (line.startsWith('## ')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      out.push(`<h2 class="text-[1.375rem] font-bold text-gray-900 mt-8 mb-3">${inline(line.slice(3))}</h2>`)
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      out.push(`<h3 class="font-semibold text-gray-800 mt-6 mb-2">${inline(line.slice(4))}</h3>`)
      continue
    }

    // Numbered list
    const olMatch = line.match(/^(\d+)\.\s+(.+)/)
    if (olMatch) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (!inOl) { out.push('<ol class="space-y-3 mb-4">'); inOl = true; olCount = 0 }
      olCount++
      out.push(
        `<li class="flex gap-3">` +
        `<span class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">${olCount}</span>` +
        `<span class="text-gray-600 leading-relaxed">${inline(olMatch[2])}</span>` +
        `</li>`
      )
      continue
    }

    // Bullet list
    if (/^[-*]\s/.test(line)) {
      if (inOl) { out.push('</ol>'); inOl = false }
      if (!inUl) { out.push('<ul class="space-y-2 mb-4">'); inUl = true }
      out.push(
        `<li class="flex gap-2 text-gray-700 leading-7">` +
        `<span class="text-blue-500 flex-shrink-0 mt-1">•</span>` +
        `<span>${inline(line.slice(2))}</span>` +
        `</li>`
      )
      continue
    }

    // Close any open lists before non-list content
    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }

    // HR
    if (/^---+$/.test(line.trim())) {
      out.push('<hr class="border-gray-200 my-6" />')
      continue
    }

    // Skip blank lines (spacing comes from mb-4 on paragraphs)
    if (line.trim() === '') continue

    // Default paragraph
    out.push(`<p class="text-gray-700 leading-7 mb-4">${inline(line)}</p>`)
  }

  if (inUl) out.push('</ul>')
  if (inOl) out.push('</ol>')
  if (tableBuffer.length) flushTable()

  return out.join('\n')
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BlogPost({ title, date, body, coverImage, coverImageAlt }: BlogPostProps) {
  const html = useMemo(() => markdownToHtml(body), [body])

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {formatDate(date)}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

        {coverImage && (
          <div className="relative w-full mb-8 overflow-hidden rounded-xl" style={{ maxHeight: '400px' }}>
            <Image
              src={coverImage}
              alt={coverImageAlt ?? title}
              width={1200}
              height={675}
              className="w-full object-cover"
              style={{ maxHeight: '400px' }}
              priority
            />
          </div>
        )}

        <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-10 bg-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Find a verified property in St Andrews</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            Free instant alerts when new properties appear across all major letting agents —
            so you can act fast before it&apos;s gone.
          </p>
          <Link
            href="/subscribe"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Set up free alerts →
          </Link>
        </div>
      </div>
    </main>
  )
}
