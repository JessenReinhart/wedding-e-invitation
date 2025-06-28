import React from 'react';
import { Guest } from '../types';

const guests: Guest[] = [
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
];

const GuestList: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="py-2 px-4 border-b text-center">{guest.name}</td>
              <td className="py-2 px-4 border-b text-center">{guest.status}</td>
              <td className="py-2 px-4 border-b text-center">{guest.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
