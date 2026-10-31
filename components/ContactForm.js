import React from 'react';
import ContactFormCard from './ContactFormCard';

/**
 * ContactForm Component (Contoh Struktur Level 5)
 * Menerima data melalui Props: <ContactForm data={profileData} onMessageSent={...} />
 */
export default function ContactForm({ data, recipientName, onMessageSent }) {
  const name = recipientName || data?.nama || data?.fullName || 'Mahasiswa';
  return <ContactFormCard recipientName={name} onMessageSent={onMessageSent} />;
}

