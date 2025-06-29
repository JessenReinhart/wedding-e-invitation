
import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SectionWrapper from './SectionWrapper';
import { useComments } from '../hooks/useComments';
import CommentSkeleton from './CommentSkeleton'; // Import the new skeleton component

const CommentSection: React.FC = () => {
  const { comments, loading, error, addComment } = useComments();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (message: string) => {
    setIsSubmitting(true);
    try {
      await addComment(message);
    } catch (error) {
      // Error is already handled in the hook
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
