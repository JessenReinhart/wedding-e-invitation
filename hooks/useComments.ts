import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Comment } from '../types';
import toast from 'react-hot-toast';
import useDebounce from './useDebounce';

export const useComments = (page: number, pageSize: number, searchTerm: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalComments, setTotalComments] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchComments();
  }, [page, pageSize, debouncedSearchTerm]);

  const fetchComments = async () => {
    setLoading(true);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    let query = supabase
      .from('comments')
      .select('id, author, message, timestamp', { count: 'exact' })
      .order('timestamp', { ascending: false });

    if (debouncedSearchTerm) {
      query = query.or(`message.ilike.%${debouncedSearchTerm}%,author.ilike.%${debouncedSearchTerm}%`);
    }

    const { data, error, count } = await query.range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments.');
      toast.error('Failed to load comments.');
    } else {
      setComments(data as Comment[]);
      setTotalComments(count || 0);
    }
    setLoading(false);
  };

  const addComment = async (message: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const author = user ? user.email || 'Anonymous' : 'Anonymous';

    const { data, error } = await supabase
      .from('comments')
      .insert({ author, message, timestamp: new Date().toISOString() })
      .select();

    if (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again.');
      toast.error('Failed to post comment. Please try again.');
      throw error;
    } else if (data) {
      // Re-fetch comments to ensure pagination is correct after adding a new comment
      await fetchComments();
      toast.success('Comment posted successfully.');
    }
  };

  const deleteComment = async (id: string) => {
    console.log('Attempting to delete comment with ID:', id);
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment.');
      toast.error('Failed to delete comment.');
      throw error;
    } else {
      // Re-fetch comments to ensure pagination is correct after deleting a comment
      await fetchComments();
      toast.success('Comment deleted successfully.');
    }
  };

  return { comments, loading, error, totalComments, addComment, deleteComment };
};