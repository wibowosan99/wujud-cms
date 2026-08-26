import { getPackages, getArticles } from '@/lib/data';

const SITE_URL = 'https://wujudtour.com';

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    '',
    '/paket',
    '/artikel',
    '/gallery',
    '/about-us',
    '/core-values',
    '/our-awards',
    '/layanan-kami',
    '/contact',
    '/white-label',
    '/affiliate',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const packages = getPackages().map((p) => ({
    url: `${SITE_URL}/paket/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const articles = getArticles().map((a) => ({
    url: `${SITE_URL}/artikel/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...packages, ...articles];
}
