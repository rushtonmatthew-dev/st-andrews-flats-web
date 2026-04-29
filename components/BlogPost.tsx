'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPost {
  slug: string
  title: string
  date: string
  cover_image?: string
}

interface BlogPostProps {
  slug?: string
  title: string
  date: string
  body: string
  coverImage?: string
  coverImageAlt?: string
  relatedPosts?: RelatedPost[]
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--coral);text-decoration:underline">$1</a>'
    )
}

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

    out.push('<div class="overflow-x-auto mb-6"><table style="width:100%;font-size:14px;border-collapse:collapse">')
    out.push('<thead><tr style="background:var(--cream-mid)">')
    parseRow(headerRow).forEach(c =>
      out.push(`<th style="text-align:left;padding:10px 12px;font-weight:700;color:var(--ink);border:1px solid var(--cream-dark)">${inline(c)}</th>`)
    )
    out.push('</tr></thead>')
    if (bodyRows.length > 0) {
      out.push('<tbody>')
      bodyRows.forEach((row, i) => {
        out.push(`<tr style="background:${i % 2 === 1 ? 'var(--cream)' : 'var(--white)'}">`)
        parseRow(row).forEach(c =>
          out.push(`<td style="padding:10px 12px;color:var(--ink-mid);border:1px solid var(--cream-dark)">${inline(c)}</td>`)
        )
        out.push('</tr>')
      })
      out.push('</tbody>')
    }
    out.push('</table></div>')
    tableBuffer = []
  }

  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      tableBuffer.push(line)
      continue
    } else if (tableBuffer.length > 0) {
      flushTable()
    }

    if (line.startsWith('## ')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      const text = line.slice(3)
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      out.push(`<h2 id="${id}" style="font-size:20px;font-weight:800;color:var(--ink);margin-top:32px;margin-bottom:12px;letter-spacing:-0.02em">${inline(text)}</h2>`)
      continue
    }

    if (line.startsWith('### ')) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      out.push(`<h3 style="font-size:14px;font-weight:700;color:var(--ink);margin-top:24px;margin-bottom:8px">${inline(line.slice(4))}</h3>`)
      continue
    }

    const olMatch = line.match(/^(\d+)\.\s+(.+)/)
    if (olMatch) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (!inOl) { out.push('<ol style="margin-bottom:16px">'); inOl = true; olCount = 0 }
      olCount++
      out.push(
        `<li style="display:flex;gap:12px;margin-bottom:12px">` +
        `<span style="flex-shrink:0;width:24px;height:24px;background:var(--coral);color:white;font-size:12px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:2px">${olCount}</span>` +
        `<span style="color:var(--ink-mid);line-height:1.75">${inline(olMatch[2])}</span>` +
        `</li>`
      )
      continue
    }

    if (/^[-*]\s/.test(line)) {
      if (inOl) { out.push('</ol>'); inOl = false }
      if (!inUl) { out.push('<ul style="margin-bottom:16px">'); inUl = true }
      out.push(
        `<li style="display:flex;gap:10px;margin-bottom:8px;line-height:1.75;color:var(--ink-mid)">` +
        `<span style="flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--coral);margin-top:9px"></span>` +
        `<span>${inline(line.slice(2))}</span>` +
        `</li>`
      )
      continue
    }

    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }

    if (/^---+$/.test(line.trim())) {
      out.push(`<hr style="border:none;border-top:1px solid var(--cream-dark);margin:24px 0" />`)
      continue
    }

    if (line.trim() === '') continue

    out.push(`<p style="font-size:15px;color:var(--ink-mid);line-height:1.8;margin-bottom:16px">${inline(line)}</p>`)
  }

  if (inUl) out.push('</ul>')
  if (inOl) out.push('</ol>')
  if (tableBuffer.length) flushTable()

  return out.join('\n')
}

function extractHeadings(md: string): { id: string; text: string }[] {
  return md
    .split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => {
      const text = l.slice(3).trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return { id, text }
    })
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost({ slug, title, date, body, coverImage, coverImageAlt, relatedPosts }: BlogPostProps) {
  const html = useMemo(() => markdownToHtml(body), [body])
  const headings = useMemo(() => extractHeadings(body), [body])
  const [copied, setCopied] = useState(false)

  const url = slug ? `https://www.standrewsflats.uk/blog/${slug}` : 'https://www.standrewsflats.uk/blog'
  const encodedText = encodeURIComponent(`${title} — ${url}`)

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="min-h-screen px-8 py-12" style={{ background: "var(--cream)" }}>
      <div className="post-layout max-w-[1080px] mx-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56 }}>

        {/* Main column */}
        <div>
          <Link
            href="/blog"
            className="inline-block mb-6 font-medium"
            style={{ fontSize: 13, color: 'var(--ink-soft)' }}
          >
            ← Guides
          </Link>

          <div className="mb-6">
            <span
              className="inline-block font-bold uppercase tracking-widest rounded-full px-3 py-1 mr-3"
              style={{ fontSize: 11, background: 'var(--coral-lt)', color: 'var(--coral)' }}
            >
              Student guide
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{formatDate(date)}</span>
          </div>

          <h1
            className="font-extrabold mb-6"
            style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.2 }}
          >
            {title}
          </h1>

          {coverImage && (
            <div className="relative w-full mb-8 rounded-[14px] overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src={coverImage}
                alt={coverImageAlt ?? title}
                fill
                className="object-cover"
                sizes="(max-width: 700px) 100vw, 780px"
                priority
              />
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: html }} />

          {/* Coral CTA */}
          <div
            className="rounded-[16px] p-6 mt-8"
            style={{ background: 'var(--coral)' }}
          >
            <h3
              className="font-extrabold text-white mb-2"
              style={{ fontSize: 17 }}
            >
              Never miss a St Andrews flat again
            </h3>
            <p className="mb-4" style={{ fontSize: 14, color: 'oklch(90% 0.06 42)', lineHeight: 1.65 }}>
              Free instant alerts the moment a new property appears across all major letting agents —
              so you can act fast before it&apos;s gone.
            </p>
            <Link
              href="/subscribe"
              className="inline-block font-bold rounded-full px-5 py-2.5"
              style={{ background: 'var(--white)', color: 'var(--coral)', fontSize: 14 }}
            >
              Set up free alerts →
            </Link>
          </div>

          {/* Share bar */}
          <div className="mt-6">
            <p
              className="font-bold uppercase tracking-widest mb-3"
              style={{ fontSize: 11, color: 'var(--ink-faint)' }}
            >
              Share this guide
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://wa.me/?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold rounded-full px-4 py-2 text-white"
                style={{ fontSize: 13, background: '#25D366' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold rounded-full px-4 py-2 text-white"
                style={{ fontSize: 13, background: '#000' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.265 5.637 5.9-5.637zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Post on X
              </a>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 font-bold rounded-full px-4 py-2"
                style={{
                  fontSize: 13,
                  background: 'var(--cream-mid)',
                  color: 'var(--ink)',
                  border: '1px solid var(--cream-dark)',
                }}
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="post-sidebar self-start" style={{ position: 'sticky', top: 72 }}>
          {headings.length > 0 && (
            <div
              className="mb-4 rounded-[16px] p-5"
              style={{ background: 'var(--white)', border: '1px solid var(--cream-dark)' }}
            >
              <p
                className="font-bold uppercase tracking-widest mb-4"
                style={{ fontSize: 11, color: 'var(--ink-faint)' }}
              >
                Contents
              </p>
              {headings.map(({ id, text }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-start gap-2 py-1.5 transition-colors"
                  style={{ fontSize: 13, color: 'var(--ink-mid)', textDecoration: 'none' }}
                >
                  <span
                    className="flex-shrink-0 rounded-full mt-[7px]"
                    style={{ width: 5, height: 5, background: 'var(--cream-dark)' }}
                  />
                  {text}
                </a>
              ))}
            </div>
          )}

          {relatedPosts && relatedPosts.length > 0 && (
            <div
              className="rounded-[16px] p-5"
              style={{ background: 'var(--white)', border: '1px solid var(--cream-dark)' }}
            >
              <p
                className="font-bold uppercase tracking-widest mb-4"
                style={{ fontSize: 11, color: 'var(--ink-faint)' }}
              >
                Related guides
              </p>
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-3 py-2"
                  style={{ textDecoration: 'none', borderTop: '1px solid var(--cream-mid)' }}
                >
                  {p.cover_image && (
                    <div className="relative flex-shrink-0 rounded-[8px] overflow-hidden" style={{ width: 52, height: 40 }}>
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="52px"
                      />
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2 }}>{p.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
