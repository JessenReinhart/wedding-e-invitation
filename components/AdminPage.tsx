import React from 'react';
import { useNavigate } from 'react-router-dom';
import GuestList from './GuestList';
import CommentManagement from './CommentManagement';
import { Guest } from '../types';

// Dummy data for demonstration. In a real app, this would come from a global state or API.
const initialGuests: Guest[] = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Attending',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Not Attending',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    name: 'Peter Jones',
    status: 'Pending',
    email: 'peter.jones@example.com',
  },
  {
    id: 4,
    name: 'Alice Brown',
    status: 'Attending',
    email: 'alice.brown@example.com',
  },
  {
    id: 5,
    name: 'Bob White',
    status: 'Pending',
    email: 'bob.white@example.com',
  },
];

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const confirmedGuestsCount = initialGuests.filter(guest => guest.status === 'Attending').length;

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16 sm:px-6 lg:px-8">
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