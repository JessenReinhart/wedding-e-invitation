
import React from 'react';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className={`bg-white p-4 rounded-lg shadow ${comment.isOptimistic ? 'opacity-70 animate-pulse' : ''}`}>
          <p className="text-charcoal-gray">{comment.message}</p>
          <p className="text-sm text-slate-500 text-right">- {comment.author}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
