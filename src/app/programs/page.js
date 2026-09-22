'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [wings, setWings] = useState([]);
  const [wingId, setWingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { Promise.all([api.getPrograms(), api.getWings()]).then(([items, wingItems]) => { setPrograms(items || []); setWings(wingItems || []); }).catch((err) => setError(err.message)); }, []);
  useEffect(() => { api.getPrograms(wingId ? { wingId } : {}).then((items) => setPrograms(items || [])).catch((err) => setError(err.message)); }, [wingId]);

  return <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-8"><div className="mx-auto max-w-7xl space-y-8"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">Community programs</p><h1 className="mt-1 text-4xl font-black text-slate-900">Programs</h1></div><select value={wingId} onChange={(event) => setWingId(event.target.value)} className="field max-w-xs"><option value="">All wings</option>{wings.map((wing) => <option key={wing._id} value={wing._id}>{wing.nameEn}</option>)}</select></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{programs.map((program) => <article key={program._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">{program.coverImage && <img src={program.coverImage} alt="" className="h-40 w-full object-cover" />}<div className="space-y-3 p-5"><span className="text-[10px] font-bold uppercase text-[#B62A35]">{program.status}</span><h2 className="text-xl font-black">{program.title}</h2><p className="text-sm text-slate-600">{program.description}</p><p className="text-xs text-slate-500">{program.wingId?.nameEn || wings.find((wing) => wing._id === program.wingId)?.nameEn || 'WCC'} · {program.startDate ? new Date(program.startDate).toLocaleDateString() : 'Date to be announced'}</p></div></article>)}{programs.length === 0 && <p className="text-sm text-slate-500">No published programs found.</p>}</div></div></main>;
}