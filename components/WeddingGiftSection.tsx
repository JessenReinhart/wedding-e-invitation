import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faMapMarkerAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import SectionWrapper from './SectionWrapper';
import GiftInfoToggle from './GiftInfoToggle';
import BankAccountInfo from './BankAccountInfo';
import DeliveryAddressInfo from './DeliveryAddressInfo';
import { GiftInfo } from '../types';

interface WeddingGiftSectionProps {
  giftInfo: GiftInfo | null | undefined;
}

// Validation function for gift info
const validateGiftInfo = (giftInfo: GiftInfo | null | undefined): boolean => {
  if (!giftInfo) return false;

  // Check if at least one of the gift options is available
  const hasBankAccount = !!(
    giftInfo.bankAccount &&
    giftInfo.bankAccount.bankName &&
    giftInfo.bankAccount.bankName.trim() &&
    giftInfo.bankAccount.accountNumber &&
    giftInfo.bankAccount.accountNumber.trim() &&
    giftInfo.bankAccount.accountHolderName &&
    giftInfo.bankAccount.accountHolderName.trim()
  );

  const hasDeliveryAddress = !!(
    giftInfo.deliveryAddress &&
    giftInfo.deliveryAddress.recipientName &&
    giftInfo.deliveryAddress.recipientName.trim() &&
    giftInfo.deliveryAddress.streetAddress &&
    giftInfo.deliveryAddress.streetAddress.trim() &&
    giftInfo.deliveryAddress.city &&
    giftInfo.deliveryAddress.city.trim() &&
    giftInfo.deliveryAddress.postalCode &&
    giftInfo.deliveryAddress.postalCode.trim() &&
    giftInfo.deliveryAddress.country &&
    giftInfo.deliveryAddress.country.trim()
  );

  return hasBankAccount || hasDeliveryAddress;
};

// Placeholder component for when no gift information is available
const NoGiftInfoPlaceholder: React.FC = () => (
  <div className="text-center py-12">
    <div className="max-w-md mx-auto">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className="text-4xl text-slate-400 mb-4"
      />
      <h3 className="text-lg font-semibold text-charcoal-gray mb-2">
        Informasi Hadiah Tidak Tersedia
      </h3>
      <p className="text-slate-600 mb-4">
        Informasi untuk hadiah pernikahan sedang tidak tersedia saat ini.
      </p>
      <p className="text-sm text-slate-500">
        Silakan hubungi pengantin langsung untuk informasi lebih lanjut mengenai hadiah pernikahan.
      </p>
    </div>
  </div>
);

const WeddingGiftSection: React.FC<WeddingGiftSectionProps> = ({ giftInfo }) => {
  // Validate gift information
  if (!validateGiftInfo(giftInfo)) {
    return (
      <SectionWrapper
        title="Hadiah Pernikahan"
        className="bg-soft-blush pattern2-bg"
        id="wedding-gifts"
      >
        <div className="text-center mb-8">
          <p className="text-lg text-charcoal-gray leading-relaxed max-w-3xl mx-auto">
            Kehadiran Anda dalam hari bahagia kami adalah hadiah terbesar yang bisa kami terima.
          </p>
        </div>
        <NoGiftInfoPlaceholder />
        <div className="text-center mt-8">
          <p className="text-base text-charcoal-gray italic max-w-2xl mx-auto">
            Terima kasih atas kebaikan dan dukungan Anda. Doa restu Anda adalah hadiah yang paling berharga bagi kami.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      title="Hadiah Pernikahan"
      className="bg-soft-blush pattern2-bg"
      id="wedding-gifts"
    >
      <div className="text-center mb-12">
        <p className="text-lg text-charcoal-gray leading-relaxed max-w-3xl mx-auto">
          Kehadiran Anda dalam hari bahagia kami adalah hadiah terbesar yang bisa kami terima.
          Namun, jika Anda ingin memberikan hadiah, kami menyediakan informasi berikut untuk kemudahan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Bank Account Information */}
        <div className="space-y-4">
          <GiftInfoToggle
            title="Transfer Bank"
            icon={<FontAwesomeIcon icon={faUniversity} />}
            className="w-full"
          >
            <BankAccountInfo bankAccount={giftInfo?.bankAccount} />
          </GiftInfoToggle>
        </div>

        {/* Delivery Address Information */}
        <div className="space-y-4">
          <GiftInfoToggle
            title="Alamat Pengiriman"
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            className="w-full"
          >
            <DeliveryAddressInfo deliveryAddress={giftInfo?.deliveryAddress} />
          </GiftInfoToggle>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-base text-charcoal-gray italic max-w-2xl mx-auto">
          Terima kasih atas kebaikan dan dukungan Anda. Doa restu Anda adalah hadiah yang paling berharga bagi kami.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default WeddingGiftSection;