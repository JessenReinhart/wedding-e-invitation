
import React from 'react';
import SectionWrapper from './SectionWrapper';

interface MessageFromCoupleProps {
  brideName: string;
  groomName: string;
}

const MessageFromCouple: React.FC<MessageFromCoupleProps> = ({ brideName, groomName }) => {
  return (
    <SectionWrapper className="bg-soft-blush text-center">
      <div className="animate-fade-in-up">
        <p className="text-3xl font-serif text-rose-gold mb-6">With All Our Love,</p>
        <p className="text-4xl font-serif text-deep-green font-semibold">
          {brideName} & {groomName}
        </p>
         <div className="mt-8 text-rose-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MessageFromCouple;
