'use client';

import { trackMetaEvent } from '@/lib/trackEvent';

export default function TrackedWhatsAppLink({ href, className, children, eventLabel, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackMetaEvent('Contact', { customData: { content_name: eventLabel || 'WhatsApp Click' } })}
      {...rest}
    >
      {children}
    </a>
  );
}
