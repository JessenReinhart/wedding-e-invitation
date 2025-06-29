import React, { useState, useMemo } from 'react';
import { Guest } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faHourglassHalf, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useGuests } from '../hooks/useGuests';
import GuestListSkeleton from './GuestListSkeleton';

type SortKeys = keyof Guest;
type SortDirection = 'asc' | 'desc';

const GuestList: React.FC = () => {
  const { guests, loading, error, deleteGuest } = useGuests();
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
      case 'attending':
        return 'bg-green-100 text-green-800';
      case 'not_attending':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: Guest['status']) => {
    switch (status) {
      case 'attending':
        return <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />;
      case 'not_attending':
        return <FontAwesomeIcon icon={faTimesCircle} className="mr-1" />;
      case 'pending':
        return <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" />;
      default:
        return null;
    }
  };

  const handleDeleteClick = (guest: Guest) => {
    setGuestToDelete(guest);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (guestToDelete) {
      try {
        await deleteGuest(guestToDelete.id);
        setGuestToDelete(null);
        setIsDeleteDialogOpen(false);
      } catch (error) {
        // Error is already handled in the hook, but you can add component-specific error handling here if needed
      }
    }
  };

  const cancelDelete = () => {
    setGuestToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <GuestListSkeleton />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

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
            <th
              className="py-2 px-2 sm:py-3 sm:px-4 border-b cursor-pointer text-left text-sm sm:text-base"
              onClick={() => handleSort('plusoneqty')}
            >
              Plus One Qty {sortKey === 'plusoneqty' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="py-2 px-2 sm:py-3 sm:px-4 border-b cursor-pointer text-left text-sm sm:text-base"
              onClick={() => handleSort('plusonename')}
            >
              Plus One Name {sortKey === 'plusonename' && (sortDirection === 'asc' ? '▲' : '▼')}
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
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-left text-sm sm:text-base">{guest.plusoneqty}</td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 border-b text-left text-sm sm:text-base">{guest.plusonename || 'N/A'}</td>
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