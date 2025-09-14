import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  onComplete?: () => void;
  className?: string;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  const calculateTimeLeft = (): CountdownState => {
    // Parse the Indonesian date format "Sabtu, 29 November 2025"
    // Extract the date part and convert to a proper date
    const dateMatch = targetDate.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
    
    if (!dateMatch) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      };
    }

    const [, day, monthName, year] = dateMatch;
    
    // Map Indonesian month names to numbers
    const monthMap: { [key: string]: number } = {
      'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3,
      'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7,
      'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };

    const month = monthMap[monthName];
    if (month === undefined) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      };
    }

    // Create target date (assuming ceremony starts at 8:30 AM)
    const target = new Date(parseInt(year), month, parseInt(day), 8, 30, 0);
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isComplete: false
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.isComplete && onComplete) {
        onComplete();
      }
    }, 1000);

    // Calculate initial time immediately
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (timeLeft.isComplete) {
    return (
      <div className={`text-center animate-fade-in-up ${className}`}>
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-95">
          <div className="text-4xl md:text-6xl mb-4">🎉✨💒✨🎉</div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-deep-green mb-3 md:mb-4">
            Hari Bahagia Telah Tiba!
          </h3>
          <p className="text-base md:text-lg lg:text-xl font-medium text-charcoal-gray">
            Selamat menikah Anjelia & Mathew!
          </p>
          <div className="mt-4 text-sm md:text-base text-slate-600">
            Semoga pernikahan kalian dipenuhi kebahagiaan selamanya 💕
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center animate-fade-in-up ${className}`}>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-95">
        <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-deep-green mb-4 md:mb-6">
          ✨ Menuju Hari Bahagia ✨
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-slate-50 border border-slate-200 p-3 md:p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-deep-green transition-all duration-300 ease-in-out">
              {timeLeft.days}
            </div>
            <div className="text-xs md:text-sm lg:text-base font-medium text-slate-600">Hari</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 md:p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-deep-green transition-all duration-300 ease-in-out">
              {timeLeft.hours}
            </div>
            <div className="text-xs md:text-sm lg:text-base font-medium text-slate-600">Jam</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 md:p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-deep-green transition-all duration-300 ease-in-out">
              {timeLeft.minutes}
            </div>
            <div className="text-xs md:text-sm lg:text-base font-medium text-slate-600">Menit</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 md:p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-deep-green transition-all duration-300 ease-in-out">
              {timeLeft.seconds}
            </div>
            <div className="text-xs md:text-sm lg:text-base font-medium text-slate-600">Detik</div>
          </div>
        </div>
        <div className="mt-4 md:mt-6">
          <p className="text-xs md:text-sm text-slate-600 italic">
            "Setiap detik membawa kita lebih dekat pada kebahagiaan"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;