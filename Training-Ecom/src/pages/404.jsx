import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
}