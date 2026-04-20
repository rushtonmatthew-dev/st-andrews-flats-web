'use client'

import { useState } from 'react'

export default function SuggestAgentForm() {
  const [value, setValue]   = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/suggest-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion: value.trim() }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        Thanks — we&apos;ll look into adding it.
      </p>
    )
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-xs text-gray-400 mb-2">Know a site we&apos;re missing?</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Agent name or URL"
          maxLength={300}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={status === 'sending' || !value.trim()}
          className="text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {status === 'sending' ? 'Sending…' : 'Suggest'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-1 text-xs text-red-500">Something went wrong — try again.</p>
      )}
    </div>
  )
}
