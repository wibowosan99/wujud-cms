import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { TABLES, updateRow, deleteRow, getById } from '@/lib/models';

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
  const { model, id } = params;
  if (!TABLES[model]) return NextResponse.json({ error: 'Model tidak dikenal' }, { status: 404 });
  const row = getById(model, id);
  if (!row) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
  return NextResponse.json({ item: row });
}

export async function PUT(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { model, id } = params;
  const cfg = TABLES[model];
  if (!cfg) return NextResponse.json({ error: 'Model tidak dikenal' }, { status: 404 });

  const body = await req.json();
  if (cfg.slug && body.slug) body.slug = slugify(body.slug);

  try {
    const row = updateRow(model, id, body);
    return NextResponse.json({ item: row });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Gagal menyimpan data' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { model, id } = params;
  if (!TABLES[model]) return NextResponse.json({ error: 'Model tidak dikenal' }, { status: 404 });

  deleteRow(model, id);
  return NextResponse.json({ ok: true });
}
