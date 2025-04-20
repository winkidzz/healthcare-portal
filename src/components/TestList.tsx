'use client';

import React, { useState } from 'react';
import { useEventBus } from '../shared/useEventBus';
import { eventBus } from '../shared/event-bus';

interface ICDTest {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
}

interface TestListProps {
  onTestSelect: (test: ICDTest) => void;
}

// Sample data - in a real app, this would come from an API
const sampleTests: ICDTest[] = [
  {
    id: '1',
    code: 'ICD-10-CM',
    name: 'Diabetes Mellitus Type 2',
    description: 'Type 2 diabetes mellitus with or without complications',
    category: 'Endocrine',
  },
  {
    id: '2',
    code: 'ICD-10-CM',
    name: 'Hypertension',
    description: 'Essential (primary) hypertension',
    category: 'Circulatory',
  },
  {
    id: '3',
    code: 'ICD-10-CM',
    name: 'Asthma',
    description: 'Mild intermittent asthma',
    category: 'Respiratory',
  },
];

export default function TestList({ onTestSelect }: TestListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tests, setTests] = useState<ICDTest[]>(sampleTests);

  // Listen for test selection from other micro-frontends
  useEventBus('test:selected', ({ testId, category }) => {
    // Update UI based on selected test
    console.log(`Test ${testId} in category ${category} was selected`);
  });

  const handleTestSelect = (test: ICDTest) => {
    // Emit event for other micro-frontends
    eventBus.emit('test:selected', { testId: test.id, category: test.category });
  };

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        {filteredTests.map((test) => (
          <button
            key={test.id}
            onClick={() => handleTestSelect(test)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{test.name}</h3>
                <p className="text-sm text-gray-600">{test.code}</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {test.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tests found</p>
      )}
    </div>
  );
} 