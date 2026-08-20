import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);
const EXT_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

export async function saveUploadedFile(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('File tidak valid');
  }
  if (!ALLOWED.has(file.type)) {
    throw new Error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau SVG.');
  }
  const MAX_BYTES = 8 * 1024 * 1024; // 8MB
  if (file.size > MAX_BYTES) {
    throw new Error('Ukuran file maksimal 8MB.');
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = EXT_BY_TYPE[file.type] || 'bin';
  const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buffer);
  return `/uploads/${name}`;
}
