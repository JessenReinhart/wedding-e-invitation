import React, { useState, useMemo } from 'react';
import { Guest } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faHourglassHalf, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

type SortKeys = keyof Guest;
type SortDirection = 'asc' | 'desc';

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [sortKey, setSortKey] = useState<SortKeys | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = useMemo(() => {
    return guests.filter(guest =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [guests, searchTerm]);

  const sortedGuests = useMemo(() => {
    let sortableGuests = [...filteredGuests];
    if (sortKey) {
      sortableGuests.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }
    return sortableGuests;
  }, [filteredGuests, sortKey, sortDirection]);

  const handleSort = (key: SortKeys) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getStatusClasses = (status: Guest['status']) => {
    switch (status) {
      case 'Attending':
        return 'bg-green-100 text-green-800';
      case 'Not Attending':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: Guest['status']) => {
    switch (status) {
      case 'Attending':
        return <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />;
      case 'Not Attending':
        return <FontAwesomeIcon icon={faTimesCircle} className="mr-1" />;
      case 'Pending':
        return <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" />;
      default:
        return null;
    }
  };

  const handleDeleteClick = (guest: Guest) => {
    setGuestToDelete(guest);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (guestToDelete) {
      setGuests(guests.filter((guest) => guest.id !== guestToDelete.id));
      setGuestToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setGuestToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search guests by name or email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-gold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr>
            <th
              className="py-2 px-2 sm:py-3 sm:px-4 border-b cursor-pointer text-left text-sm sm:text-base"
              onClick={() => handleSort('name')}
            >
              Name {sortKey === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="py-2 px-2 sm:py-3 sm:px-4 border-b cursor-pointer text-left text-sm sm:text-base"
              onClick={() => handleSort('status')}
            >
              Status {sortKey === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="py-2 px-2 sm:py-3 sm:px-4 border-b cursor-pointer text-left text-sm sm:text-base"
              onClick={() => handleSort('email')}
            >
              Email {sortKey === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-2 px-2 sm:py-3 sm:px-4 border-b text-center text-sm sm:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedGuests.map((guest) => (
            <tr key={guest.id} className="hover:bg-gray-50">
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-left text-sm sm:text-base">{guest.name}</td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-left">
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs sm:text-sm font-medium ${getStatusClasses(
                    guest.status
                  )}`}
                >
                  {getStatusIcon(guest.status)} {guest.status}
                </span>
              </td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-left text-sm sm:text-base">{guest.email}</td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-center">
                <button
                  onClick={() => handleDeleteClick(guest)}
                  className="text-red-600 hover:text-red-900 font-medium flex items-center mx-auto space-x-1 text-sm sm:text-base"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete guest ${guestToDelete?.name}?`}
      />
    </div>
  );
};

export default GuestList;