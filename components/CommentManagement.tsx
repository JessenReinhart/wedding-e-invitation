import React, { useState, useEffect } from 'react';
import { Comment } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
    } else {
      setComments(data as Comment[]);
    }
    setLoading(false);
  };

  const handleDeleteClick = (comment: Comment) => {
    setCommentToDelete(comment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (commentToDelete) {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentToDelete.id);

      if (error) {
        console.error('Error deleting comment:', error);
        setError('Failed to delete comment.');
      } else {
        setComments(comments.filter(comment => comment.id !== commentToDelete.id));
        setCommentToDelete(null);
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const cancelDelete = () => {
    setCommentToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <div className="mt-8 p-2 sm:p-0 text-center">Loading comments...</div>;
  }

  if (error) {
    return <div className="mt-8 p-2 sm:p-0 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-8 p-2 sm:p-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Comments</h2>
      {comments.length === 0 ? (
        <p className="text-sm sm:text-base">No comments yet.</p>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <li key={comment.id} className="px-3 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="text-base sm:text-lg font-medium text-gray-900">{comment.message}</p>
                  <p className="text-xs sm:text-sm text-gray-500">- {comment.author} ({new Date(comment.timestamp).toLocaleString()})</p>
                </div>
                <button
                  onClick={() => handleDeleteClick(comment)}
                  className="ml-0 sm:ml-4 inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 border border-transparent text-xs sm:text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 space-x-1"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span>Delete</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this comment from ${commentToDelete?.author}?`}
      />
    </div>
  );
};

export default CommentManagement;
