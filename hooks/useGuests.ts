import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Guest } from '../types';
import toast from 'react-hot-toast';
import useDebounce from './useDebounce';

export const useGuests = (page: number, pageSize: number, searchTerm: string) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchGuests();
  }, [page, pageSize, debouncedSearchTerm]);

  const fetchGuests = async () => {
    setLoading(true);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    let query = supabase
      .from('guests')
      .select('id, name, status, email, plusoneqty, plusonename', { count: 'exact' });

    if (debouncedSearchTerm) {
      query = query.or(`name.ilike.%${debouncedSearchTerm}%,email.ilike.%${debouncedSearchTerm}%`);
    }

    const { data, error, count } = await query.range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching guests:', error);
      setError('Failed to load guests.');
      toast.error('Failed to load guests.');
    } else {
      setGuests(data as Guest[]);
      setTotalGuests(count || 0);
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
      // Re-fetch guests to ensure pagination is correct after deleting a guest
      await fetchGuests();
      toast.success('Guest deleted successfully.');
    }
  };

  return { guests, loading, error, totalGuests, fetchGuests, deleteGuest };
};