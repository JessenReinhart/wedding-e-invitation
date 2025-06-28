import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const RSVPPage: React.FC = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const visitorName = params.get('name');
    if (visitorName) {
      setName(visitorName);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log({ name, email, attending, guests, message });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream p-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-deep-green mb-4">Thank You!</h1>
          <p className="text-lg text-charcoal-gray mb-8">Your RSVP has been received.</p>
          <Link to="/" className="text-rose-gold hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream p-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-serif text-deep-green">RSVP</h1>
          <p className="text-lg text-slate-600 mt-2">We're so excited to celebrate with you!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-md font-semibold text-charcoal-gray mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-md font-semibold text-charcoal-gray mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="your.email@example.com"
            />
          </div>

          <fieldset className="space-y-4">
            <legend className="block text-md font-semibold text-charcoal-gray mb-2">Will you be attending?</legend>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === 'yes'}
                  onChange={() => setAttending('yes')}
                  required
                  className="h-5 w-5 text-deep-green focus:ring-rose-gold"
                />
                <span className="text-lg">Yes, I'll be there!</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === 'no'}
                  onChange={() => setAttending('no')}
                  required
                  className="h-5 w-5 text-deep-green focus:ring-rose-gold"
                />
                <span className="text-lg">No, I'll celebrate from afar.</span>
              </label>
            </div>
          </fieldset>

          {attending === 'yes' && (
            <div>
              <label htmlFor="guests" className="block text-md font-semibold text-charcoal-gray mb-2">
                Number of Guests (including yourself)
              </label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                min="1"
                max="10"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              />
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-md font-semibold text-charcoal-gray mb-2">
              Leave a message for the couple (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="Share a memory or well wishes..."
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-deep-green hover:bg-opacity-90 text-white font-bold py-4 px-12 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit RSVP
            </button>
          </div>
        </form>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-rose-gold hover:underline">
            &larr; Return to the main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;