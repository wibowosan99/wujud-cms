import getDb from './db';

// Generic table helpers used by both admin API routes and public pages.
export const TABLES = {
  packages: { table: 'packages', orderBy: 'sort_order ASC, id DESC', slug: true },
  articles: { table: 'articles', orderBy: 'published_at DESC, id DESC', slug: true },
  team_members: { table: 'team_members', orderBy: 'sort_order ASC, id ASC', slug: false },
  testimonials: { table: 'testimonials', orderBy: 'sort_order ASC, id ASC', slug: false },
  partners: { table: 'partners', orderBy: 'sort_order ASC, id ASC', slug: false },
  gallery_images: { table: 'gallery_images', orderBy: 'sort_order ASC, id ASC', slug: false },
  hero_slides: { table: 'hero_slides', orderBy: 'sort_order ASC, id ASC', slug: false },
  stats: { table: 'stats', orderBy: 'sort_order ASC, id ASC', slug: false },
  partner_leads: { table: 'partner_leads', orderBy: 'created_at DESC, id DESC', slug: false },
  affiliates: { table: 'affiliates', orderBy: 'created_at DESC, id DESC', slug: true },
  affiliate_commissions: { table: 'affiliate_commissions', orderBy: 'created_at DESC, id DESC', slug: false },
};

export function listAll(model, { onlyPublished = false } = {}) {
  const cfg = TABLES[model];
  if (!cfg) throw new Error('Unknown model ' + model);
  const db = getDb();
  let sql = `SELECT * FROM ${cfg.table}`;
  if (onlyPublished) sql += ' WHERE published = 1';
  sql += ` ORDER BY ${cfg.orderBy}`;
  return db.prepare(sql).all();
}

export function getById(model, id) {
  const cfg = TABLES[model];
  const db = getDb();
  return db.prepare(`SELECT * FROM ${cfg.table} WHERE id = ?`).get(id);
}

export function getBySlug(model, slug) {
  const cfg = TABLES[model];
  const db = getDb();
  return db.prepare(`SELECT * FROM ${cfg.table} WHERE slug = ?`).get(slug);
}

export function createRow(model, data) {
  const cfg = TABLES[model];
  const db = getDb();
  const keys = Object.keys(data);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO ${cfg.table} (${keys.join(',')}) VALUES (${placeholders})`;
  const info = db.prepare(sql).run(...keys.map((k) => data[k]));
  return getById(model, info.lastInsertRowid);
}

export function updateRow(model, id, data) {
  const cfg = TABLES[model];
  const db = getDb();
  const keys = Object.keys(data);
  const setClause = keys.map((k) => `${k} = ?`).join(', ');
  const sql = `UPDATE ${cfg.table} SET ${setClause} WHERE id = ?`;
  db.prepare(sql).run(...keys.map((k) => data[k]), id);
  return getById(model, id);
}

export function deleteRow(model, id) {
  const cfg = TABLES[model];
  const db = getDb();
  db.prepare(`DELETE FROM ${cfg.table} WHERE id = ?`).run(id);
  return { ok: true };
}

// Settings are key/value pairs
export function getAllSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all();
  const obj = {};
  for (const r of rows) obj[r.key] = r.value;
  return obj;
}

export function updateSettings(partial) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
  );
  const tx = db.transaction((entries) => {
    for (const [k, v] of entries) stmt.run(k, v);
  });
  tx(Object.entries(partial));
  return getAllSettings();
}

export function findUserByUsername(username) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function updateUserPassword(id, passwordHash) {
  const db = getDb();
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, id);
}
