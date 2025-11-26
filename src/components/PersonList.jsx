import React, { useState, useEffect } from 'react';
import { getAllPersons } from '../services/PersonService';

const PersonList = ({ onSelectPerson }) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      // getAllPersons is a named export from PersonService.js (axios-based)
      const response = await getAllPersons();
      // axios: data is in response.data
      setPersons(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading persons:', err);
      setError('Failed to load persons. Please try again.');
      setPersons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is client-side (filteredPersons), so we don't call backend here.
  };

  const filteredPersons = persons.filter((person) => {
    const term = searchTerm.toLowerCase();
    return (
      person.firstName?.toLowerCase().includes(term) ||
      person.lastName?.toLowerCase().includes(term) ||
      person.email?.toLowerCase().includes(term) ||
      person.phoneNumber?.includes(searchTerm)
    );
  });

  if (loading && persons.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading persons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Person Lookup</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              fetchPersons();
            }}
            className="px-4 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPersons.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  No persons found.
                </td>
              </tr>
            ) : (
              filteredPersons.map((person) => (
                <tr
                  key={person.personId}
                  onClick={() =>
                    onSelectPerson && onSelectPerson(person.personId)
                  }
                  className="hover:bg-blue-50 cursor-pointer"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.personId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.firstName} {person.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.address?.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {person.address?.state}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonList;
