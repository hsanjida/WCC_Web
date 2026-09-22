'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [wings, setWings] = useState([]);
  const [wingId, setWingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { Promise.all([api.getEvents(), api.getWings()]).then(([items, wingItems]) => { setEvents(items || []); setWings(wingItems || []); }).catch((err) => setError(err.message)); }, []);
  useEffect(() => { api.getEvents(wingId ? { wingId } : {}).then((items) => setEvents(items || [])).catch((err) => setError(err.message)); }, [wingId]);

  return <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-8"><div className="mx-auto max-w-7xl space-y-8"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#B62A35]">Join the work</p><h1 className="mt-1 text-4xl font-black text-slate-900">Events</h1></div><select value={wingId} onChange={(event) => setWingId(event.target.value)} className="field max-w-xs"><option value="">All wings</option>{wings.map((wing) => <option key={wing._id} value={wing._id}>{wing.nameEn}</option>)}</select></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}<div className="grid gap-5 md:grid-cols-2">{events.map((event) => <Link href={`/events/${event._id}`} key={event._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md"><div className="flex items-start justify-between gap-3"><h2 className="text-xl font-black">{event.title}</h2><span className="text-[10px] font-bold uppercase text-[#B62A35]">{event.status}</span></div><p className="mt-3 text-sm text-slate-600">{event.description}</p><p className="mt-4 text-xs font-semibold text-slate-500">{new Date(event.date).toLocaleString()} · {event.location} · Capacity {event.capacity}</p></Link>)}{events.length === 0 && <p className="text-sm text-slate-500">No published events found.</p>}</div></div></main>;
}