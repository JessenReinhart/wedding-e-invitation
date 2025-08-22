import React from 'react';
import { DeliveryAddress } from '../types';

interface DeliveryAddressInfoProps {
  deliveryAddress: DeliveryAddress | null | undefined;
}

// Validation function for delivery address data
const validateDeliveryAddress = (deliveryAddress: DeliveryAddress | null | undefined): boolean => {
  if (!deliveryAddress) return false;
  
  const { recipientName, streetAddress, city, postalCode, country } = deliveryAddress;
  
  return !!(
    recipientName && recipientName.trim() &&
    streetAddress && streetAddress.trim() &&
    city && city.trim() &&
    postalCode && postalCode.trim() &&
    country && country.trim()
  );
};

// Placeholder component for missing delivery address information
const DeliveryAddressPlaceholder: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
      <div className="text-slate-500 mb-2">
        <svg className="w-12 h-12 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
        </svg>
        <p className="text-sm font-medium text-slate-600">
          Informasi alamat pengiriman tidak tersedia
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Silakan hubungi pengantin untuk informasi lebih lanjut
        </p>
      </div>
    </div>
  </div>
);

const DeliveryAddressInfo: React.FC<DeliveryAddressInfoProps> = ({ deliveryAddress }) => {
  // Validate delivery address data
  if (!validateDeliveryAddress(deliveryAddress)) {
    return <DeliveryAddressPlaceholder />;
  }

  // Safe to access properties after validation
  const { recipientName, streetAddress, city, postalCode, country } = deliveryAddress!;

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Nama Penerima
            </label>
            <p className="text-charcoal-gray font-medium">
              {recipientName}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Alamat
            </label>
            <p className="text-charcoal-gray font-medium">
              {streetAddress}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Kota & Kode Pos
            </label>
            <p className="text-charcoal-gray font-medium">
              {city} {postalCode}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-deep-green mb-1">
              Negara
            </label>
            <p className="text-charcoal-gray font-medium">
              {country}
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-slate-600 italic">
        Silakan gunakan alamat di atas untuk mengirim hadiah pernikahan.
      </div>
    </div>
  );
};

export default DeliveryAddressInfo;