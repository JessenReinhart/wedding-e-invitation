import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface GiftInfoToggleProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const GiftInfoToggle: React.FC<GiftInfoToggleProps> = ({ 
  title, 
  children, 
  icon, 
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={`border border-slate-200 rounded-lg shadow-sm bg-white ${className}`}>
      <button
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 rounded-lg"
        aria-expanded={isExpanded}
        aria-controls={`toggle-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        type="button"
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="text-rose-gold text-xl">
              {icon}
            </div>
          )}
          <span className="text-lg font-semibold text-deep-green">
            {title}
          </span>
        </div>
        <FontAwesomeIcon 
          icon={isExpanded ? faChevronUp : faChevronDown}
          className={`text-rose-gold transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        id={`toggle-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="px-6 pb-4 pt-2 border-t border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GiftInfoToggle;