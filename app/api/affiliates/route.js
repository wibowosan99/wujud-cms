import { NextResponse } from 'next/server';
import { createRow } from '@/lib/models';
import getDb from '@/lib/db';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function uniqueSlug(base) {
  const db = getDb();
  let slug = base || 'mitra';
  let i = 1;
  while (db.prepare('SELECT id FROM affiliates WHERE slug = ?').get(slug)) {
    i += 1;
    slug = `${base}-${i}`;
  }
  return slug;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, umroh_year, message } = body;

    if (!name || !whatsapp) {
      return NextResponse.json({ error: 'Nama dan nomor WhatsApp wajib diisi' }, { status: 400 });
    }

    const slug = uniqueSlug(slugify(name));

    const row = createRow('affiliates', {
      name: String(name).slice(0, 200),
      whatsapp: String(whatsapp).slice(0, 30),
      email: email ? String(email).slice(0, 200) : '',
      slug,
      umroh_year: umroh_year ? String(umroh_year).slice(0, 100) : '',
      message: message ? String(message).slice(0, 500) : '',
      photo: '',
      status: 'nonaktif',
    });

    return NextResponse.json({ ok: true, slug: row.slug });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengirim pendaftaran' }, { status: 400 });
  }
}
