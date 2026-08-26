// Fires a Meta Pixel event client-side AND forwards the same event (with the
// same eventId) to our server, which relays it to Meta's Conversion API.
// Using the same eventId on both sides lets Meta deduplicate them into one
// conversion instead of double-counting.
export function trackMetaEvent(eventName, { customData, phone, email } = {}) {
  const eventId = `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  try {
    fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        customData,
        phone,
        email,
      }),
      keepalive: true,
    });
  } catch {
    // Non-blocking: tracking failures should never affect the user's action.
  }
}
