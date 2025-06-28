import React from 'react';
import GuestList from './GuestList';

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Guest List</h1>
      <GuestList />
    </div>
  );
};

export default AdminPage;
