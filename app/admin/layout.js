import { getSession } from '@/lib/auth';
import AdminChrome from '@/components/admin/AdminChrome';

export const metadata = { title: 'Admin Panel | Wujud Tour', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }) {
  const session = await getSession();
  return <AdminChrome user={session}>{children}</AdminChrome>;
}
