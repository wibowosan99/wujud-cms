import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAllSettings, updateSettings } from '@/lib/models';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ settings: getAllSettings() });
}

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const settings = updateSettings(body);
  return NextResponse.json({ settings });
}
