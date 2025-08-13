import React from 'react';
import { Link } from 'react-router-dom';

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Welcome to the Root App</h2>
        <p className="text-gray-600 mb-8">Select an application to view:</p>
        <nav className="flex flex-col gap-4">
          <Link to="/citiBankUI">
            <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all">
              Show CitiBank App
            </button>
          </Link>
          <Link to="/wealthAdvisoryUI">
            <button className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all">
              Show Wealth Advisory App
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
