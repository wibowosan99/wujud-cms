import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { TABLES, listAll, createRow } from '@/lib/models';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { model } = params;
  if (!TABLES[model]) return NextResponse.json({ error: 'Model tidak dikenal' }, { status: 404 });

  const rows = listAll(model);
  return NextResponse.json({ items: rows });
}

export async function POST(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { model } = params;
  const cfg = TABLES[model];
  if (!cfg) return NextResponse.json({ error: 'Model tidak dikenal' }, { status: 404 });

  const body = await req.json();

  if (cfg.slug && (!body.slug || !body.slug.trim())) {
    body.slug = slugify(body.title || body.name || `item-${Date.now()}`);
  } else if (cfg.slug) {
    body.slug = slugify(body.slug);
  }

  try {
    const row = createRow(model, body);
    return NextResponse.json({ item: row }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Gagal menyimpan data' }, { status: 400 });
  }
}
