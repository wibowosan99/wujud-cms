import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/data';
import { sendCapiEvent } from '@/lib/metaCapi';

export async function POST(req) {
  try {
    const body = await req.json();
    const { eventName, eventId, url, customData, phone, email } = body;
    const settings = getSettings();

    if (!settings.meta_pixel_id || !settings.meta_capi_token) {
      return NextResponse.json({ skipped: true });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip');
    const userAgent = req.headers.get('user-agent');

    const result = await sendCapiEvent({
      pixelId: settings.meta_pixel_id,
      accessToken: settings.meta_capi_token,
      eventName,
      eventId,
      eventSourceUrl: url,
      ip,
      userAgent,
      phone,
      email,
      customData,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengirim event' }, { status: 400 });
  }
}
