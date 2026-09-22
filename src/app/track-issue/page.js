'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function TrackIssuePage() {
  const [code, setCode] = useState('');
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState('');
  const submit = async (event) => { event.preventDefault(); setError(''); setIssue(null); try { setIssue(await api.trackIssue(code.trim())); } catch (err) { setError(err.message); } };
  return <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-8"><div className="mx-auto max-w-xl space-y-6"><header><p className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">Public tracking</p><h1 className="mt-1 text-4xl font-black text-slate-900">Track an Issue</h1></header><form onSubmit={submit} className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"><input required value={code} onChange={(event) => setCode(event.target.value)} placeholder="WCC-ISSUE-2026-0001" className="field" /><button className="shrink-0 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white">Search</button></form>{error && <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}{issue && <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"><span className="text-xs font-bold uppercase text-[#B62A35]">{issue.status}</span><h2 className="text-2xl font-black">{issue.title}</h2><p className="text-sm text-slate-600">{issue.location}</p><p className="text-xs text-slate-500">Created {new Date(issue.createdAt).toLocaleString()} · Updated {new Date(issue.updatedAt).toLocaleString()}</p></article>}</div></main>;
}