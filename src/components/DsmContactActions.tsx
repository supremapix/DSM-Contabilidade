import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

export const dsmPhone = '+5541991430464';
export const dsmPhoneLabel = '(41) 99143-0464';
export const dsmWhatsApp = (message: string) => 'https://api.whatsapp.com/send?phone=5541991430464&text=' + encodeURIComponent(message);

export default function DsmContactActions({ message }: { message: string }) {
  return <div className="dsm-actions">
    <a className="dsm-btn dsm-btn-whatsapp" href={dsmWhatsApp(message)} target="_blank" rel="noopener noreferrer"><MessageSquare size={20} aria-hidden="true" /> Falar no WhatsApp</a>
    <a className="dsm-btn dsm-btn-outline" href={'tel:' + dsmPhone}><Phone size={20} aria-hidden="true" /> {dsmPhoneLabel}</a>
  </div>;
}
