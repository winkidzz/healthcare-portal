'use client';

interface ICDTest {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
}

interface TestDetailsProps {
  test: ICDTest;
}

export default function TestDetails({ test }: TestDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Test Code</h3>
        <p className="mt-1 text-lg">{test.code}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Name</h3>
        <p className="mt-1 text-lg">{test.name}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Category</h3>
        <p className="mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {test.category}
          </span>
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Description</h3>
        <p className="mt-1 text-gray-700">{test.description}</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            // Handle test selection/action
            console.log('Test selected:', test);
          }}
        >
          Select Test
        </button>
      </div>
    </div>
  );
} 