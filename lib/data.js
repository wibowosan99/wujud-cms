import getDb from './db';
import { listAll, getAllSettings, getBySlug as getRowBySlug } from './models';

// Published-only helpers for the public site.

export const CATEGORY_LABEL = {
  umroh: 'Umroh',
  haji: 'Haji',
  halal: 'Halal Holidays',
};

export function waLink(settings, message) {
  const number = pickWhatsappNumber(settings);
  return waLinkTo(number, message || settings.whatsapp_message || 'Halo, saya ingin bertanya tentang paket di ' + (settings.site_name || ''));
}

// If a second CS number is configured, randomly load-balance between the two
// so inquiries are spread across staff instead of always hitting one number.
function pickWhatsappNumber(settings) {
  const primary = settings.whatsapp_number;
  const secondary = settings.whatsapp_number_2;
  if (secondary && secondary.trim()) {
    return Math.random() < 0.5 ? primary : secondary;
  }
  return primary;
}

export function waLinkTo(number, message) {
  const clean = (number || '').replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || 'Halo, saya ingin bertanya lebih lanjut');
  return `https://wa.me/${clean}?text=${text}`;
}

export function getAffiliateBySlug(slug) {
  const affiliate = getRowBySlug('affiliates', slug);
  if (!affiliate) return null;
  if (affiliate.status !== 'aktif') return null;
  const today = new Date().toISOString().slice(0, 10);
  if (affiliate.start_date && today < affiliate.start_date) return null;
  if (affiliate.end_date && today > affiliate.end_date) return null;
  return affiliate;
}

export function incrementAffiliateVisit(id) {
  const db = getDb();
  db.prepare('UPDATE affiliates SET visit_count = visit_count + 1 WHERE id = ?').run(id);
  const row = db.prepare('SELECT visit_count FROM affiliates WHERE id = ?').get(id);
  return row?.visit_count ?? 0;
}

export function getSettings() {
  return getAllSettings();
}

export function getHeroSlides() {
  return listAll('hero_slides', { onlyPublished: true });
}

export function getStats() {
  return listAll('stats');
}

export function getPackages({ category } = {}) {
  const rows = listAll('packages', { onlyPublished: true });
  if (category) return rows.filter((p) => p.category === category);
  return rows;
}

export function getFeaturedPackages() {
  return getPackages().filter((p) => p.featured);
}

export function getPackageBySlug(slug) {
  const row = getRowBySlug('packages', slug);
  if (!row || !row.published) return null;
  return row;
}

export function getArticles({ limit } = {}) {
  const rows = listAll('articles', { onlyPublished: true });
  return limit ? rows.slice(0, limit) : rows;
}

export function getArticleBySlug(slug) {
  const row = getRowBySlug('articles', slug);
  if (!row || !row.published) return null;
  return row;
}

export function getTeam() {
  return listAll('team_members', { onlyPublished: true });
}

export function getTestimonials() {
  return listAll('testimonials', { onlyPublished: true });
}

export function getPartners() {
  return listAll('partners', { onlyPublished: true });
}

export function getBranches() {
  return listAll('branches', { onlyPublished: true });
}

export function getGallery() {
  return listAll('gallery_images', { onlyPublished: true });
}

export function getPage(slug) {
  const db = getDb();
  return db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug);
}

