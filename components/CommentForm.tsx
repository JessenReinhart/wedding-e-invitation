
import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (message: string) => void;
  isSubmitting?: boolean; // Add isSubmitting prop
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
        placeholder="Leave a message for the couple..."
        rows={4}
      ></textarea>
      <button
        type="submit"
        className={`mt-4 bg-deep-green text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90 transform hover:scale-105'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
