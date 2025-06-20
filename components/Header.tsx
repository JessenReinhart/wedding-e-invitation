
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  brideName: string;
  groomName: string;
}

const Header: React.FC<HeaderProps> = ({ brideName, groomName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const initials = `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Basic smooth scroll function
  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logoTextColor = isScrolled ? 'text-rose-gold' : 'text-white';
  const logoHoverTextColor = isScrolled ? 'hover:text-deep-green' : 'hover:text-rose-gold';
  const navLinkTextColor = isScrolled ? 'text-charcoal-gray' : 'text-white';
  const navLinkHoverTextColor = 'hover:text-rose-gold';


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto max-w-6xl px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={scrollToSection('hero')} 
          className={`text-2xl font-serif font-bold ${logoTextColor} ${logoHoverTextColor} transition-colors`}
        >
          {initials}
        </a>
        <nav>
          <ul className="flex space-x-6 md:space-x-8">
            <li><a href="#story" onClick={scrollToSection('story')} className={`${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>Story</a></li>
            <li><a href="#event" onClick={scrollToSection('event')} className={`${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>Event</a></li>
            <li><a href="#rsvp" onClick={scrollToSection('rsvp')} className={`${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>RSVP</a></li>
            <li><a href="#gallery" onClick={scrollToSection('gallery')} className={`${navLinkTextColor} ${navLinkHoverTextColor} font-medium transition-colors`}>Gallery</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
