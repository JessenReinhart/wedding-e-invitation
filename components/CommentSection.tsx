
import React, { useState } from 'react';
import { Comment } from '../types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SectionWrapper from './SectionWrapper';

interface CommentSectionProps {
  initialComments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleCommentSubmit = (message: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      author: 'Guest', // In a real app, you'd get the logged-in user's name
      message,
      timestamp: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
  };

  return (
    <SectionWrapper id="comments" className="bg-cream">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-gold mb-6">Guest Comments</h2>
        <p className="text-lg md:text-xl text-charcoal-gray mb-8">
          Leave a message for the happy couple!
        </p>
      </div>
      <CommentForm onSubmit={handleCommentSubmit} />
      <div className="mt-12">
        <CommentList comments={comments} />
      </div>
    </SectionWrapper>
  );
};

export default CommentSection;
