import React from 'react';
import ContactFormCard from './ContactFormCard';

/**
 * ContactForm Component (Level 7: Theme Adaptable Form Wrapper)
 */
export default function ContactForm({ data, recipientName, onMessageSent, theme }) {
  const name = recipientName || data?.nama || data?.fullName || 'Mahasiswa';
  return (
    <ContactFormCard
      recipientName={name}
      onMessageSent={onMessageSent}
      theme={theme}
    />
  );
}
