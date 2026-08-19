import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import getDb from '@/lib/db';

export async function GET(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDb();
  const row = db.prepare('SELECT * FROM pages WHERE slug = ?').get(params.slug);
  if (!row) return NextResponse.json({ error: 'Halaman tidak ditemukan' }, { status: 404 });
  return NextResponse.json({ item: row });
}

export async function PUT(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const db = getDb();
  db.prepare(
    `UPDATE pages SET title = ?, content = ?, updated_at = datetime('now') WHERE slug = ?`
  ).run(body.title || '', body.content || '', params.slug);
  const row = db.prepare('SELECT * FROM pages WHERE slug = ?').get(params.slug);
  return NextResponse.json({ item: row });
}
