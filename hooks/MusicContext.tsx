import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;

    const urlParams = new URLSearchParams(window.location.search);
    const noMusic = urlParams.get('nomusic');
    const isAdmin = window.location.pathname.includes('/admin')

    if (noMusic === null && !isAdmin) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
