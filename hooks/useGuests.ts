import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Guest } from '../types';
import toast from 'react-hot-toast';

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guests')
      .select('id, name, status, email, plusoneqty, plusonename');

    if (error) {
      console.error('Error fetching guests:', error);
      setError('Failed to load guests.');
      toast.error('Failed to load guests.');
    } else {
      setGuests(data as Guest[]);
    }
    setLoading(false);
  };

  const deleteGuest = async (id: string) => {
    const { error } = await supabase.from('guests').delete().eq('id', id);

    if (error) {
      console.error('Error deleting guest:', error);
      setError('Failed to delete guest.');
      toast.error('Failed to delete guest.');
      throw error;
    } else {
      setGuests(guests.filter((guest) => guest.id !== id));
      toast.success('Guest deleted successfully.');
    }
  };

  return { guests, loading, error, fetchGuests, deleteGuest };
};