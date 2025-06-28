import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCalendarAlt, faEnvelopeOpenText, faImages, faHome } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  brideName: string;
  groomName: string;
}

const Header: React.FC<HeaderProps> = ({ brideName, groomName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initials = `${brideName.charAt(0)} & ${groomName.charAt(0)}`;
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (isAdminPage) {
      setIsScrolled(true); // Always show scrolled style on admin page
      window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, isAdminPage]);

  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Controls opacity and pointer-events for the entire header
  const isNavbarContentVisible = (() => {
    if (isAdminPage) {
      return true; // Always visible on admin page
    }
    if (isMobile) {
      return isScrolled; // Only visible when scrolled on mobile main page
    }
    return true; // Always visible on desktop (even if transparent)
  })();

  // Controls background, shadow, blur, and padding (when not transparent)
  const applyScrolledStyle = isAdminPage || isScrolled;

  const headerClasses = `fixed z-50 transition-all duration-300
    ${isMobile ? 'bottom-4 inset-x-4 rounded-xl' : 'top-0 left-0 right-0 w-full'}
    ${isNavbarContentVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    ${applyScrolledStyle ? 'bg-cream/80 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-6'}
  `;

  const logoTextColor = applyScrolledStyle ? 'text-rose-gold' : 'text-white';
  const logoHoverTextColor = applyScrolledStyle ? 'hover:text-deep-green' : 'hover:text-rose-gold';
  const navLinkTextColor = applyScrolledStyle ? 'text-charcoal-gray' : 'text-white';
  const navLinkHoverTextColor = 'hover:text-rose-gold';

  return (
    <header className={headerClasses}>
      <div className={`container mx-auto max-w-6xl flex justify-around md:justify-between items-center px-4 md:px-6 md:py-0
        ${applyScrolledStyle ? 'py-3' : 'py-0'}
      `}>
        <a
          href="#hero"
          onClick={scrollToSection('hero')}
          className={`text-2xl font-serif font-bold ${logoTextColor} ${logoHoverTextColor} transition-colors
            ${isMobile ? 'hidden' : 'block'}
          `}
        >
          {initials}
        </a>
        <nav className={`${isMobile && !isScrolled && !isAdminPage ? 'hidden' : ''} md:block`}>
          <ul className="flex justify-between md:space-x-8 w-full">
            <li className="px-2">
              <a href="#hero" onClick={scrollToSection('hero')} className={`flex flex-col items-center ${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>
                <FontAwesomeIcon icon={faHome} className="text-lg md:hidden" />
                <span className="text-xs md:text-base">Home</span>
              </a>
            </li>
            <li className="px-2">
              <a href="#story" onClick={scrollToSection('story')} className={`flex flex-col items-center ${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>
                <FontAwesomeIcon icon={faBookOpen} className="text-lg md:hidden" />
                <span className="text-xs md:text-base">Story</span>
              </a>
            </li>
            <li className="px-2">
              <a href="#event" onClick={scrollToSection('event')} className={`flex flex-col items-center ${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>
                <FontAwesomeIcon icon={faCalendarAlt} className="text-lg md:hidden" />
                <span className="text-xs md:text-base">Event</span>
              </a>
            </li>
            <li className="px-2">
              <a href="#rsvp" onClick={scrollToSection('rsvp')} className={`flex flex-col items-center ${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-lg md:hidden" />
                <span className="text-xs md:text-base">RSVP</span>
              </a>
            </li>
            <li className="px-2">
              <a href="#gallery" onClick={scrollToSection('gallery')} className={`flex flex-col items-center ${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>
                <FontAwesomeIcon icon={faImages} className="text-lg md:hidden" />
                <span className="text-xs md:text-base">Gallery</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;