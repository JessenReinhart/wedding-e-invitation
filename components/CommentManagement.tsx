import React, { useState } from 'react';
import { Comment } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useComments } from '../hooks/useComments';
import Pagination from './Pagination';

const CommentManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of comments per page
  const [searchTerm, setSearchTerm] = useState('');
  const { comments, loading, error, totalComments, deleteComment } = useComments(currentPage, pageSize, searchTerm);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const totalPages = Math.ceil(totalComments / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDeleteClick = (comment: Comment) => {
    setCommentToDelete(comment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (commentToDelete) {
      try {
        await deleteComment(commentToDelete.id);
        setCommentToDelete(null);
        setIsDeleteDialogOpen(false);
        // No need to manually re-fetch here, useComments hook already does it
      } catch (error) {
        // Error is already handled in the hook
      }
    }
  };

  const cancelDelete = () => {
    setCommentToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="mt-8 p-2 sm:p-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Comments</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-gold focus:border-rose-gold"
        />
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(pageSize)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : comments.length === 0 && !searchTerm ? (
        <p className="text-sm sm:text-base">No comments yet.</p>
      ) : comments.length === 0 && searchTerm ? (
        <p className="text-sm sm:text-base">No comments found for "{searchTerm}".</p>
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

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
