import React from 'react';

interface HeroProps {
  brideName: string;
  groomName: string;
  date: string;
  heroImage: string;
}

const Hero: React.FC<HeroProps> = ({ brideName, groomName, date, heroImage }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white"
             style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 p-6 animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl mb-4">You're Invited To Celebrate The Wedding Of</h2>
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-2">
          {brideName} &amp; {groomName}
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8">{date}</p>
        <a 
          href="#story" 
          onClick={(e) => { 
            e.preventDefault(); 
            const storyElement = document.getElementById('story');
            if (storyElement) {
              storyElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="mt-4 inline-block bg-rose-gold hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Discover More
        </a>
      </div>
       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;