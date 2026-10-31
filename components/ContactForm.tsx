import React from 'react';
import ContactFormCard from './ContactFormCard';

interface ContactFormProps {
  data?: any;
  recipientName?: string;
  onMessageSent?: (payload?: any) => void;
  theme?: any;
}

/**
 * ContactForm Component (Level 10: TSX Supported)
 */
export default function ContactForm({ data, recipientName, onMessageSent, theme }: ContactFormProps) {
  const name = recipientName || data?.nama || data?.fullName || 'Mahasiswa';
  return (
    <ContactFormCard
      recipientName={name}
      onMessageSent={onMessageSent}
      theme={theme}
    />
  );
}
