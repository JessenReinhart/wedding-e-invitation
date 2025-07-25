import { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

export const useRSVP = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRSVP = async (name: string, email: string, status: 'attending' | 'not_attending' | 'pending', guests: number, message: string) => {
    setSubmitting(true);
    setError(null);

    const { error: rsvpError } = await supabase
      .from('guests')
      .insert({ name, email, status, plusoneqty: guests });

    if (rsvpError) {
      console.error('Error submitting RSVP:', rsvpError);
      setError('Gagal mengirim RSVP.');
      toast.error('Gagal mengirim RSVP.');
      setSubmitting(false);
      throw rsvpError;
    }

    if (message.trim()) {
      const { error: commentError } = await supabase
        .from('comments')
        .insert({ author: name, message, timestamp: new Date().toISOString() });

      if (commentError) {
        console.error('Error posting comment from RSVP:', commentError);
        toast.error('Gagal mengirim komentar, tetapi RSVP Anda telah dikirim.');
        // Don't block the RSVP submission if the comment fails
      }
    }

    setSubmitting(false);
    toast.success('RSVP berhasil dikirim!');
  };

  return { submitting, error, submitRSVP };
};