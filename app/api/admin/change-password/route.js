import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';
import { findUserByUsername, updateUserPassword } from '@/lib/models';

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Password baru minimal 6 karakter' }, { status: 400 });
  }

  const user = findUserByUsername(session.username);
  const valid = bcrypt.compareSync(currentPassword, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Password saat ini salah' }, { status: 401 });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  updateUserPassword(user.id, hash);
  return NextResponse.json({ ok: true });
}
