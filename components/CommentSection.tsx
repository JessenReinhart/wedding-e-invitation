
import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SectionWrapper from './SectionWrapper';
import { useComments } from '../hooks/useComments';
import CommentSkeleton from './CommentSkeleton';
import Pagination from './Pagination';

const CommentSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of comments per page
  const { comments, loading, error, totalComments, addComment } = useComments(currentPage, pageSize);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPages = Math.ceil(totalComments / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCommentSubmit = async (message: string) => {
    setIsSubmitting(true);
    try {
      await addComment(message);
      setCurrentPage(1); // Go back to the first page after adding a comment
    } catch (error) {
      // Error is already handled in the hook
    }
    setIsSubmitting(false);
  };

  return (
    <SectionWrapper id="comments" className="bg-cream pattern-bg" title="Komentar Tamu">
      <div className="text-center">
        <p className="text-lg md:text-xl text-charcoal-gray mb-8">
          Tinggalkan pesan untuk pasangan bahagia!
        </p>
      </div>
      <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />
      {error && <div className="text-center py-2 text-red-500">{error}</div>}
      <div className="mt-12">
        {loading ? (
          <div className="space-y-4">
            {[...Array(pageSize)].map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </div>
        ) : (
          <CommentList comments={comments} />
        )}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </SectionWrapper>
  );
};

export default CommentSection;
