import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const url = await saveUploadedFile(file);
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Upload gagal' }, { status: 400 });
  }
}
