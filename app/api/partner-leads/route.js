import { NextResponse } from 'next/server';
import { createRow } from '@/lib/models';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, whatsapp, brand_name, city, jamaah_estimate, partner_type, message } = body;

    if (!name || !whatsapp) {
      return NextResponse.json({ error: 'Nama dan nomor WhatsApp wajib diisi' }, { status: 400 });
    }

    createRow('partner_leads', {
      name: String(name).slice(0, 200),
      whatsapp: String(whatsapp).slice(0, 30),
      brand_name: brand_name ? String(brand_name).slice(0, 200) : '',
      city: city ? String(city).slice(0, 100) : '',
      jamaah_estimate: jamaah_estimate ? String(jamaah_estimate).slice(0, 50) : '',
      partner_type: partner_type ? String(partner_type).slice(0, 30) : '',
      message: message ? String(message).slice(0, 1000) : '',
      status: 'baru',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengirim pendaftaran' }, { status: 400 });
  }
}
