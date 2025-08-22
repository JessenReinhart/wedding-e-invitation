import React from 'react';
import { BankAccountInfo as BankAccountInfoType } from '../types';

interface BankAccountInfoProps {
  bankAccount: BankAccountInfoType | null | undefined;
}

// Validation function for bank account data
const validateBankAccount = (bankAccount: BankAccountInfoType | null | undefined): boolean => {
  if (!bankAccount) return false;
  
  const { bankName, accountNumber, accountHolderName } = bankAccount;
  
  return !!(
    bankName && bankName.trim() &&
    accountNumber && accountNumber.trim() &&
    accountHolderName && accountHolderName.trim()
  );
};

// Placeholder component for missing bank account information
const BankAccountPlaceholder: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
      <div className="text-slate-500 mb-2">
        <svg className="w-12 h-12 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-sm font-medium text-slate-600">
          Informasi rekening bank tidak tersedia
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Silakan hubungi pengantin untuk informasi lebih lanjut
        </p>
      </div>
    </div>
  </div>
);

const BankAccountInfo: React.FC<BankAccountInfoProps> = ({ bankAccount }) => {
  // Validate bank account data
  if (!validateBankAccount(bankAccount)) {
    return <BankAccountPlaceholder />;
  }

  // Safe to access properties after validation
  const { bankName, accountNumber, accountHolderName } = bankAccount!;

  return (
    <div className="space-y-4">
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
      
      <div className="text-sm text-slate-600 italic">
        Silakan gunakan informasi rekening di atas untuk transfer hadiah pernikahan.
      </div>
    </div>
  );
};

export default BankAccountInfo;