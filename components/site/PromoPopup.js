'use client';

import { useEffect, useState } from 'react';

const DISMISS_KEY = 'wujud_popup_dismissed';

export default function PromoPopup({ settings }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const active = !!Number(settings.popup_active || 0);
    if (!active) return;

    const today = new Date().toISOString().slice(0, 10);
    if (settings.popup_start_date && today < settings.popup_start_date) return;
    if (settings.popup_end_date && today > settings.popup_end_date) return;

    if (sessionStorage.getItem(DISMISS_KEY) === '1') return;

    // Small delay so it doesn't jar the page before the hero has rendered.
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, '1');
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-emerald-deep/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={close}
    >
      <div
        className="relative bg-white w-full max-w-sm shadow-2xl overflow-hidden animate-popup-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-ink flex items-center justify-center shadow"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {settings.popup_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={settings.popup_image} alt={settings.popup_title || 'Promo'} className="w-full max-h-64 object-cover" />
        )}

        <div className="p-6 text-center">
          {settings.popup_title && (
            <h3 className="font-display text-2xl text-emerald-deep">{settings.popup_title}</h3>
          )}
          {settings.popup_message && (
            <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">{settings.popup_message}</p>
          )}
          {settings.popup_cta_label && settings.popup_cta_link && (
            <a
              href={settings.popup_cta_link}
              target={settings.popup_cta_link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={close}
              className="btn btn-primary mt-5 inline-block"
            >
              {settings.popup_cta_label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
