import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { BankAccountInfo as BankAccountInfoType } from '../types';

interface BankAccountInfoProps {
  brideAccount?: BankAccountInfoType | null | undefined;
  groomAccount?: BankAccountInfoType | null | undefined;
  onCopy?: (accountInfo: string, ownerName?: string) => void;
}

const validateBankAccount = (bankAccount: BankAccountInfoType | null | undefined): boolean => {
  if (!bankAccount) return false;
  const { bankName, accountNumber, accountHolderName } = bankAccount;
  return !!(bankName?.trim() && accountNumber?.trim() && accountHolderName?.trim());
};

const IndividualBankAccount: React.FC<{
  bankAccount: BankAccountInfoType;
  ownerName: string;
  onCopy?: (accountInfo: string, ownerName: string) => void;
}> = ({ bankAccount, ownerName, onCopy }) => {
  const { bankName, accountNumber, accountHolderName } = bankAccount;

  const handleCopy = () => {
    const accountInfo = `${bankName}\n${accountNumber}\n${accountHolderName}`;
    navigator.clipboard.writeText(accountInfo).then(() => {
      onCopy?.(accountInfo, ownerName);
    });
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-deep-green">{ownerName}</h4>
        </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-deep-green mb-1">
            Nama Bank
          </label>
          <p className="text-charcoal-gray font-medium">{bankName}</p>
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
          <p className="text-charcoal-gray font-medium">{accountHolderName}</p>
        </div>
      </div>

      {onCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 text-slate-500 hover:text-deep-green transition-colors duration-200"
          title="Salin informasi rekening"
        >
          <FontAwesomeIcon icon={faCopy} className="text-sm" />
        </button>
      )}
    </div>
  );
};

const BankAccountPlaceholder: React.FC = () => (
  <div className="text-center py-8">
    <div className="max-w-md mx-auto">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className="text-3xl text-slate-400 mb-4"
      />
      <h3 className="text-lg font-semibold text-charcoal-gray mb-2">
        Informasi Rekening Tidak Tersedia
      </h3>
      <p className="text-slate-600 mb-4">
        Informasi rekening bank sedang tidak tersedia saat ini.
      </p>
      <p className="text-sm text-slate-500">
        Silakan hubungi pengantin langsung untuk informasi rekening bank.
      </p>
    </div>
  </div>
);

const BankAccountInfo: React.FC<BankAccountInfoProps> = ({
  brideAccount,
  groomAccount,
  onCopy
}) => {
  const hasBrideAccount = validateBankAccount(brideAccount);
  const hasGroomAccount = validateBankAccount(groomAccount);

  if (!hasBrideAccount && !hasGroomAccount) {
    return <BankAccountPlaceholder />;
  }

    const accounts = [];
    if (hasBrideAccount) accounts.push({ account: brideAccount!, ownerName: 'Bride' });
    if (hasGroomAccount) accounts.push({ account: groomAccount!, ownerName: 'Groom' });

    return (
      <div className="space-y-6">
        <div className={`space-y-6 ${accounts.length === 1 ? 'max-w-md mx-auto' : ''}`}>
          {accounts.map(({ account, ownerName }) => (
            <IndividualBankAccount
              key={ownerName}
              bankAccount={account}
              ownerName={ownerName}
            onCopy={onCopy}
            />
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 italic">
            Silakan {accounts.length > 1 ? 'pilih salah satu rekening' : 'gunakan informasi rekening'} di atas untuk transfer hadiah pernikahan.
          </p>
        </div>
      </div>
    );
};

export default BankAccountInfo;