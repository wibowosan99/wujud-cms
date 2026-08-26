'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export default function MetaPixel(props) {
  return (
    <Suspense fallback={null}>
      <MetaPixelInner {...props} />
    </Suspense>
  );
}

function MetaPixelInner({ pixelId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loaded = useRef(false);

  useEffect(() => {
    if (!pixelId || typeof window === 'undefined' || !window.fbq) return;
    if (!loaded.current) {
      // Base script already fires the first PageView; skip firing it twice.
      loaded.current = true;
      return;
    }
    window.fbq('track', 'PageView');
  }, [pathname, searchParams, pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
