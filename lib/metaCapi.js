import crypto from 'crypto';

function sha256(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

// Sends an event to Meta's Conversion API (server-side tracking).
// This is more reliable than the browser Pixel alone since it isn't affected
// by ad-blockers or iOS tracking restrictions, and can be deduplicated with
// the client-side Pixel event using the same eventId.
export async function sendCapiEvent({
  pixelId,
  accessToken,
  eventName,
  eventId,
  eventSourceUrl,
  ip,
  userAgent,
  phone,
  email,
  customData,
}) {
  if (!pixelId || !accessToken) return { skipped: true };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: 'website',
        user_data: {
          client_ip_address: ip || undefined,
          client_user_agent: userAgent || undefined,
          ph: phone ? [sha256(phone.replace(/[^0-9]/g, ''))] : undefined,
          em: email ? [sha256(email)] : undefined,
        },
        custom_data: customData || {},
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (err) {
    console.error('Meta CAPI error:', err.message);
    return { error: err.message };
  }
}
