'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextPageContext } from 'next';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> & {
  getInitialProps: (ctx: NextPageContext) => Promise<ErrorPageProps>
} = ({ statusCode }) => {
  const router = useRouter();

  const errorMessage = statusCode === 404
    ? "Sorry, we couldn't find the page you're looking for."
    : "Sorry, something went wrong on our end.";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {statusCode || 'Error'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext): Promise<ErrorPageProps> => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode : 404;
  return { statusCode };
};

export default ErrorPage; 