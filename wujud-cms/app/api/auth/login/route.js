import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '@/lib/models';
import { createSession } from '@/lib/auth';

export async function POST(req) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
  }
  const user = findUserByUsername(username);
  if (!user) {
    return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
  }
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
  }
  await createSession(user);
  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username, name: user.name } });
}
