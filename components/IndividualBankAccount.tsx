import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BankAccountInfo } from '../types';

interface IndividualBankAccountProps {
  bankAccount: BankAccountInfo | null | undefined;
  ownerName: string;
  onCopy?: (accountInfo: string) => void;
}

// Validation function for bank account data
const validateBankAccount = (bankAccount: BankAccountInfo | null | undefined): boolean => {
  if (!bankAccount) return false;
  
  const { bankName, accountNumber, accountHolderName } = bankAccount;
  
  return !!(
    bankName && bankName.trim() &&
    accountNumber && accountNumber.trim() &&
    accountHolderName && accountHolderName.trim()
  );
};

// Placeholder component for missing bank account information
const BankAccountPlaceholder: React.FC<{ ownerName: string }> = ({ ownerName }) => (
  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
    <div className="text-slate-500 mb-2">
      <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p className="text-sm font-medium text-slate-600">
        Rekening {ownerName} tidak tersedia
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Silakan hubungi pengantin untuk informasi lebih lanjut
      </p>
    </div>
  </div>
);

const IndividualBankAccount: React.FC<IndividualBankAccountProps> = ({ 
  bankAccount, 
  ownerName, 
  onCopy 
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  // Validate bank account data
  if (!validateBankAccount(bankAccount)) {
    return <BankAccountPlaceholder ownerName={ownerName} />;
  }

  // Safe to access properties after validation
  const { bankName, accountNumber, accountHolderName } = bankAccount!;

  const handleCopy = async () => {
    setCopyStatus('copying');
    
    const accountInfo = `${bankName}\n${accountNumber}\n${accountHolderName}`;
    
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(accountInfo);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = accountInfo;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopyStatus('success');
      onCopy?.(accountInfo);
      
      // Reset status after 2 seconds
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy account information:', error);
      setCopyStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const getCopyButtonContent = () => {
    switch (copyStatus) {
      case 'copying':
        return (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Menyalin...</span>
          </>
        );
      case 'success':
        return (
          <>
            <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
            <span>Tersalin!</span>
          </>
        );
      case 'error':
        return (
          <>
            <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
            <span>Gagal Salin</span>
          </>
        );
      default:
        return (
          <>
            <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
            <span>Salin Info</span>
          </>
        );
    }
  };

  const getButtonStyles = () => {
    switch (copyStatus) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      default:
        return 'bg-deep-green hover:bg-deep-green/90 focus:ring-deep-green';
    }
  };

  return (
    <div className="space-y-4">
      {/* Owner Name Header */}
      <div className="text-center">
        <h4 className="text-lg font-semibold text-deep-green mb-2">
          Rekening {ownerName}
        </h4>
      </div>

      {/* Bank Account Details */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Nama Bank
            </label>
            <p className="text-charcoal-gray font-medium">
              {bankName}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Nomor Rekening
            </label>
            <p className="text-charcoal-gray font-mono text-lg font-semibold tracking-wider">
              {accountNumber}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Nama Pemegang Rekening
            </label>
            <p className="text-charcoal-gray font-medium">
              {accountHolderName}
            </p>
          </div>
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        disabled={copyStatus === 'copying'}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 
          text-white font-medium rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${getButtonStyles()}
        `}
        aria-label={`Salin informasi rekening ${ownerName}`}
      >
        {getCopyButtonContent()}
      </button>
      
      <div className="text-sm text-slate-600 italic text-center">
        Klik tombol di atas untuk menyalin informasi rekening
      </div>
    </div>
  );
};

export default IndividualBankAccount;