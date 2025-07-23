import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRSVP } from '../hooks/useRSVP';

const RSVPPage: React.FC = () => {
  const location = useLocation();
  interface RSVPFormData {
    name: string;
    email: string;
    status: 'attending' | 'not_attending' | 'pending' | null;
    guests: number;
    message: string;
  }

  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    status: null,
    guests: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { submitting, submitRSVP } = useRSVP();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const visitorName = params.get('name');
    if (visitorName) {
      setFormData((prev) => ({ ...prev, name: visitorName }));
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitRSVP(
        formData.name,
        formData.email,
        formData.status || 'pending',
        formData.guests,
        formData.message
      );
      setSubmitted(true);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream p-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-deep-green mb-4">Terima Kasih!</h1>
          <p className="text-lg text-charcoal-gray mb-8">RSVP Anda telah diterima.</p>
          <Link to="/" className="text-rose-gold hover:underline">
            &larr; Kembali ke Beranda
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
          <p className="text-lg text-slate-600 mt-2">Kami sangat senang dapat merayakan bersama Anda!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-md font-semibold text-charcoal-gray mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="Nama lengkap Anda"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-md font-semibold text-charcoal-gray mb-2">
              Alamat Email (Opsional)
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="your.email@example.com"
            />
          </div>

          <fieldset className="space-y-4">
            <legend className="block text-md font-semibold text-charcoal-gray mb-2">Apakah Anda akan hadir?</legend>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.status === 'attending'}
                  onChange={() => setFormData({ ...formData, status: 'attending' })}
                  required
                  className="h-5 w-5 text-deep-green focus:ring-rose-gold"
                />
                <span className="text-sm">Ya, saya akan hadir!</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.status === 'not_attending'}
                  onChange={() => setFormData({ ...formData, status: 'not_attending' })}
                  required
                  className="h-5 w-5 text-deep-green focus:ring-rose-gold"
                />
                <span className="text-sm">Tidak, saya akan merayakan dari jauh.</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="pending"
                  checked={formData.status === 'pending'}
                  onChange={() => setFormData({ ...formData, status: 'pending' })}
                  required
                  className="h-5 w-5 text-deep-green focus:ring-rose-gold"
                />
                <span className="text-sm">Mungkin, saya belum yakin.</span>
              </label>
            </div>
          </fieldset>

          {formData.status === 'attending' && (
            <>
              <div>
                <label htmlFor="guests" className="block text-md font-semibold text-charcoal-gray mb-2">
                  Jumlah Tamu (termasuk Anda)
                </label>
                <input
                  type="number"
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  min="1"
                  max="10"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="message" className="block text-md font-semibold text-charcoal-gray mb-2">
              Tinggalkan pesan untuk pasangan (opsional)
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
              placeholder="Bagikan kenangan atau ucapan selamat..."
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-deep-green hover:bg-opacity-90 text-white font-bold py-4 px-12 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              disabled={submitting}
            >
              {submitting ? 'Mengirim...' : 'Kirim RSVP'}
            </button>
          </div>
        </form>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-rose-gold hover:underline">
            &larr; Kembali ke situs utama
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;