'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const load = () => api.getIssues(status ? { status } : {}).then(setIssues).catch((err) => setError(err.message));
  useEffect(() => { load(); }, [status]);
  const advance = async (issue) => { const next = issue.status === 'pending' ? 'in_progress' : issue.status === 'in_progress' ? 'resolved' : null; if (!next) return; try { await api.updateIssueStatus(issue._id, next); await load(); } catch (err) { setError(err.message); } };
  return <main className="max-w-7xl mx-auto space-y-6 p-4 sm:p-8"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">Operations</p><h1 className="text-3xl font-black">Community Issues</h1></div><select value={status} onChange={(event) => setStatus(event.target.value)} className="field max-w-xs"><option value="">All statuses</option><option value="pending">Pending</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"><div className="divide-y divide-slate-100">{issues.map((issue) => <div key={issue._id} className="flex flex-wrap items-center justify-between gap-4 p-4"><div><p className="text-xs font-bold text-[#B62A35]">{issue.issueCode}</p><h2 className="font-bold">{issue.title}</h2><p className="text-xs text-slate-500">{issue.location} · {issue.reporterName}</p></div><div className="flex items-center gap-3"><span className="text-xs font-bold uppercase text-slate-500">{issue.status}</span>{issue.status !== 'resolved' && <button onClick={() => advance(issue)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">Advance</button>}</div></div>)}{issues.length === 0 && <p className="p-6 text-sm text-slate-500">No issues found.</p>}</div></section></main>;
}
