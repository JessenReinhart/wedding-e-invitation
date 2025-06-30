import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestList from './GuestList';
import CommentManagement from './CommentManagement';
import { supabase } from '../supabaseClient';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [confirmedGuestsCount, setConfirmedGuestsCount] = useState(0);

  useEffect(() => {
    const fetchConfirmedGuests = async () => {
      const { data, error } = await supabase
        .from('guests')
        .select('plusoneqty')
        .eq('status', 'attending');

      if (error) {
        console.error('Error fetching confirmed guests:', error);
      } else {
        const totalConfirmed = data.reduce((sum, guest) => sum + (guest.plusoneqty || 0), 0);
        setConfirmedGuestsCount(totalConfirmed);
      }
    };

    fetchConfirmedGuests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16 sm:px-6 lg:px-8 mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-deep-green mb-4">Guest Summary</h2>
        <p className="text-base sm:text-lg text-charcoal-gray">
          Total Guests Confirmed: <span className="font-semibold">{confirmedGuestsCount}</span>
        </p>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-4">Guest List</h2>
      <GuestList />

      <CommentManagement />
    </div>
  );
};

export default AdminPage;