'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function WingDetailPage() {
  const { slug } = useParams();
  const [wing, setWing] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    api.getWing(slug).then(async (value) => {
      setWing(value);
      const [programItems, eventItems] = await Promise.all([api.getPrograms({ wingId: value._id }), api.getEvents({ wingId: value._id })]);
      setPrograms(programItems || []);
      setEvents(eventItems || []);
    }).catch((err) => setError(err.message));
  }, [slug]);

  if (error) return <main className="mx-auto max-w-4xl p-8"><p className="rounded-xl bg-rose-50 p-5 text-rose-700">{error}</p></main>;
  if (!wing) return <main className="mx-auto max-w-4xl p-8 text-sm text-slate-500">Loading wing...</main>;

  return <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8"><div className="mx-auto max-w-6xl space-y-10"><section className="overflow-hidden rounded-3xl bg-slate-950 text-white">{wing.coverImage && <img src={wing.coverImage} alt="" className="h-64 w-full object-cover opacity-80" />}<div className="space-y-4 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-widest text-[#F1AD1A]">{wing.nameBn}</p><h1 className="text-4xl font-black">{wing.nameEn}</h1><p className="max-w-2xl text-sm leading-7 text-slate-300">{wing.description}</p>{wing.missionPoints?.length > 0 && <ul className="grid gap-2 text-sm text-slate-200 sm:grid-cols-2">{wing.missionPoints.map((point) => <li key={point} className="border-l-2 border-[#F1AD1A] pl-3">{point}</li>)}</ul>}</div></section><section className="space-y-4"><h2 className="text-2xl font-black text-slate-900">Programs</h2>{programs.length === 0 ? <p className="text-sm text-slate-500">No published programs for this wing yet.</p> : <div className="grid gap-4 sm:grid-cols-2">{programs.map((program) => <article key={program._id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{program.title}</h3><p className="mt-2 text-sm text-slate-600">{program.description}</p></article>)}</div>}</section><section className="space-y-4"><h2 className="text-2xl font-black text-slate-900">Events</h2>{events.length === 0 ? <p className="text-sm text-slate-500">No published events for this wing yet.</p> : <div className="grid gap-4 sm:grid-cols-2">{events.map((event) => <article key={event._id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{event.title}</h3><p className="mt-2 text-sm text-slate-600">{new Date(event.date).toLocaleString()} · {event.location}</p></article>)}</div>}</section><Link href="/wings" className="inline-block text-sm font-bold text-[#B62A35]">Back to wings</Link></div></main>;
}