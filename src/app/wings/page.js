'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function WingsPage() {
  const [wings, setWings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getWings().then(setWings).catch((err) => setError(err.message));
  }, []);

  return <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-8"><div className="mx-auto max-w-7xl space-y-8"><header><p className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">Our work</p><h1 className="mt-1 text-4xl font-black text-slate-900">WCC Wings</h1><p className="mt-2 max-w-2xl text-sm text-slate-600">Explore the areas where We Can Change turns community energy into practical action.</p></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}{wings.length === 0 && !error ? <p className="text-sm text-slate-500">No wings are published yet.</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{wings.map((wing) => <Link key={wing._id} href={`/wings/${wing.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md">{wing.coverImage ? <img src={wing.coverImage} alt="" className="h-44 w-full object-cover" /> : <div className="h-44 bg-gradient-to-br from-[#B62A35] to-[#1D3557]" />}<div className="space-y-3 p-5"><h2 className="text-xl font-black text-slate-900">{wing.nameEn}</h2><p className="text-xs font-semibold text-[#B62A35]">{wing.nameBn}</p><p className="line-clamp-3 text-sm text-slate-600">{wing.description || 'Discover this WCC community focus area.'}</p><span className="inline-flex items-center gap-1 text-xs font-bold text-[#B62A35]">Explore wing <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></div></Link>)}</div>}</div></main>;
}