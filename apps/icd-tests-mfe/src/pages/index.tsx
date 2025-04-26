'use client';

import React from 'react';
import { Patient } from '@healthcare-portal/shared-library';

const ICDTestsPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);

  React.useEffect(() => {
    // Simulate fetching patient data
    setPatient({
      id: '1',
      name: 'Jane Smith',
      dateOfBirth: '1990-01-01',
      medicalRecordNumber: 'MRN123456'
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ICD Tests</h1>
      {patient ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Patient Information</h2>
            <p>Name: {patient.name}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>MRN: {patient.medicalRecordNumber}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Available Tests</h2>
            <div className="space-y-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Run ICD-10 Test
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Run ICD-11 Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading patient information...</p>
      )}
    </div>
  );
};

export default ICDTestsPage; 