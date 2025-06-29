import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Comment } from '../types';
import toast from 'react-hot-toast';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('id, author, message, timestamp')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments.');
      toast.error('Failed to load comments.');
    } else {
      setComments(data as Comment[]);
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
      setComments([data[0], ...comments]);
      toast.success('Comment posted successfully.');
    }
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment.');
      toast.error('Failed to delete comment.');
      throw error;
    } else {
      setComments(comments.filter((comment) => comment.id !== id));
      toast.success('Comment deleted successfully.');
    }
  };

  return { comments, loading, error, fetchComments, addComment, deleteComment };
};