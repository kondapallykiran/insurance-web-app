import React, { useState, useEffect } from 'react';
import { getPersonById } from '../services/PersonService';

const PersonDetail = ({ personId, onBack }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (personId) {
      fetchPersonDetails();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personId]);

  const fetchPersonDetails = async () => {
    try {
      setLoading(true);
      // use the named function from PersonService.js
      const response = await getPersonById(personId);
      // axios: the payload is in response.data
      setPerson(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load person details.');
      setPerson(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading person details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-center text-gray-500 py-8">Person not found.</p>
        <div className="text-center">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const address = person.address || {};

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {person.firstName} {person.lastName}
          </h2>
          {person.personId && (
            <p className="text-sm text-gray-500">Person ID: {person.personId}</p>
          )}
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Personal Information
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">First Name:</span>{' '}
              {person.firstName || '-'}
            </p>
            <p>
              <span className="font-medium">Last Name:</span>{' '}
              {person.lastName || '-'}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span>{' '}
              {person.dateOfBirth || '-'}
            </p>
            <p>
              <span className="font-medium">Email:</span>{' '}
              {person.email || '-'}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{' '}
              {person.phoneNumber || '-'}
            </p>
          </div>
        </div>

        {/* Address Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Address
          </h3>
          {address && (address.line1 || address.city) ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Address Line 1:</span>{' '}
                {address.line1 || '-'}
              </p>
              <p>
                <span className="font-medium">Address Line 2:</span>{' '}
                {address.line2 || '-'}
              </p>
              <p>
                <span className="font-medium">City:</span>{' '}
                {address.city || '-'}
              </p>
              <p>
                <span className="font-medium">State:</span>{' '}
                {address.state || '-'}
              </p>
              <p>
                <span className="font-medium">Postal Code:</span>{' '}
                {address.postalCode || '-'}
              </p>
              <p>
                <span className="font-medium">Country:</span>{' '}
                {address.country || '-'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No address information available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
