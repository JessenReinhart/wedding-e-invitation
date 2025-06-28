
import React, { useState, useEffect } from 'react';
import { Comment } from '../types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SectionWrapper from './SectionWrapper';
import { supabase } from '../supabaseClient';
import CommentSkeleton from './CommentSkeleton'; // Import the new skeleton component

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    const { data, error } = await supabase
      .from('comments')
      .select('id, author, message, timestamp') // Changed 'message' to 'content' to match schema
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments.');
    } else {
      setComments(data as Comment[]);
    }
    setLoading(false);
  };

  const handleCommentSubmit = async (message: string) => { // Changed 'message' to 'content'
    setIsSubmitting(true);
    setError(null); // Clear previous errors

    const { data: { user } } = await supabase.auth.getUser();
    const author = user ? user.email || 'Anonymous' : 'Anonymous';
    const newComment: Comment = {
      id: Date.now().toString(), // Temporary ID for optimistic update
      author,
      message,
      timestamp: new Date().toISOString(),
      isOptimistic: true, // Flag for optimistic comment
    };

    // Optimistically add the new comment to the UI
    setComments((prevComments) => [newComment, ...prevComments]);

    const { data, error } = await supabase
      .from('comments')
      .insert({
        author,
        message, // Changed 'message' to 'content'
        timestamp: newComment.timestamp,
      })
      .select(); // Select the inserted data to get the actual ID and timestamp

    if (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again.');
      // Remove the optimistic comment if the submission fails
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== newComment.id)
      );
    } else if (data && data.length > 0) {
      // Replace the optimistic comment with the actual one from the database
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === newComment.id ? { ...data[0], isOptimistic: false } : comment
        )
      );
    }
    setIsSubmitting(false);
  };

  return (
    <SectionWrapper id="comments" className="bg-cream">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-gold mb-6">Guest Comments</h2>
        <p className="text-lg md:text-xl text-charcoal-gray mb-8">
          Leave a message for the happy couple!
        </p>
      </div>
      <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />
      {error && <div className="text-center py-2 text-red-500">{error}</div>}
      <div className="mt-12">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </div>
        ) : (
          <CommentList comments={comments} />
        )}
      </div>
    </SectionWrapper>
  );
};

export default CommentSection;
