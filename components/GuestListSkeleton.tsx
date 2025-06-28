import React from 'react';

const GuestListSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto animate-pulse">
      <div className="mb-4 h-10 bg-gray-200 rounded-md"></div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </th>
            <th className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </th>
            <th className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/3">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </th>
            <th className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </th>
            <th className="py-3 px-4 border-b bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </th>
            <th className="py-3 px-4 border-b bg-gray-100 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-4 px-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </td>
              <td className="py-4 px-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-4 px-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
              <td className="py-4 px-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-4 px-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </td>
              <td className="py-4 px-4 border-b text-center">
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestListSkeleton;