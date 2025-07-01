import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMusic } from '../hooks/MusicContext';

const MusicPlayer: React.FC<{ className?: string }> = ({ className }) => {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <div className={className}>
      <button onClick={togglePlay} className={`${isPlaying ? 'playing' : ''} flex flex-col md:bg-rose-gold md:p-4 md:rounded-lg md:shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-lg md:text-white" />
        <span className="text-xs md:hidden">{isPlaying ? 'Pause' : 'Play'} Music</span>
      </button>
    </div>
  );
};

export default MusicPlayer;