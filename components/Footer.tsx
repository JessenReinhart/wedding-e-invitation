
import React from 'react';
import { WEDDING_DETAILS } from '../constants';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-deep-green text-cream py-10 text-center">
      <div className="container mx-auto px-6">
        <p className="font-serif text-lg mb-2">{WEDDING_DETAILS.brideName} & {WEDDING_DETAILS.groomName}</p>
        <p className="text-sm mb-4">{WEDDING_DETAILS.footerMessage}</p>
        <p className="text-xs">&copy; {currentYear} Semua Hak Dilindungi. Dibuat dengan kegembiraan.</p>
      </div>
    </footer>
  );
};

export default Footer;
