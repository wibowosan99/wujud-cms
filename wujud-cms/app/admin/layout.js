import { getSession } from '@/lib/auth';
import AdminChrome from '@/components/admin/AdminChrome';

export const metadata = { title: 'Admin Panel | Wujud Tour' };

export default async function AdminLayout({ children }) {
  const session = await getSession();
  return <AdminChrome user={session}>{children}</AdminChrome>;
}
