'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { if (id) api.getEvent(id).then(setEvent).catch((err) => setError(err.message)); }, [id]);
  if (error) return <main className="mx-auto max-w-4xl p-8"><p className="rounded-xl bg-rose-50 p-5 text-rose-700">{error}</p></main>;
  if (!event) return <main className="mx-auto max-w-4xl p-8 text-sm text-slate-500">Loading event...</main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-8"><article className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-xs sm:p-10"><span className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">{event.status}</span><h1 className="text-4xl font-black text-slate-900">{event.title}</h1><p className="text-slate-600">{event.description}</p><dl className="grid gap-4 border-y border-slate-100 py-5 text-sm sm:grid-cols-3"><div><dt className="text-xs text-slate-400">Date</dt><dd className="font-bold">{new Date(event.date).toLocaleString()}</dd></div><div><dt className="text-xs text-slate-400">Location</dt><dd className="font-bold">{event.location}</dd></div><div><dt className="text-xs text-slate-400">Capacity</dt><dd className="font-bold">{event.capacity}</dd></div></dl><p className="text-sm text-slate-500">Event registration will be available for authenticated members and volunteers.</p></article></main>;
}