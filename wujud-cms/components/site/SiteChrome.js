'use client';

import { usePathname } from 'next/navigation';

// Receives already-rendered Server Components (header/footer/waFloat) as
// props from the server layout, and only decides whether to show them based
// on the current route. This keeps server-only code (DB access) out of the
// client bundle instead of importing Server Components directly here.
export default function SiteChrome({ header, footer, waFloat, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {waFloat}
    </>
  );
}
