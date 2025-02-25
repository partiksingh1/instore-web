import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          className="bg-blue-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-blue-700 transition duration-200"
          onClick={() => navigateTo('/admin/categories')}
        >
          Manage Categories
        </button>
        <button
          className="bg-green-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-green-700 transition duration-200"
          onClick={() => navigateTo('/admin/stores')}
        >
          Manage Stores
        </button>
        <button
          className="bg-purple-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/ads')}
        >
          Manage Ads
        </button>
        <button
          className="bg-red-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/latest')}
        >
          Manage Latest
        </button>
        <button
          className="bg-red-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/products')}
        >
          Manage Products
        </button>
        <button
          className="bg-red-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/videos')}
        >
          Manage Videos
        </button>
        <button
          className="bg-red-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/store-window')}
        >
          Manage Store window
        </button>
        <button
          className="bg-red-600 text-white text-2xl font-semibold py-4 rounded shadow hover:bg-purple-700 transition duration-200"
          onClick={() => navigateTo('/admin/newsletter')}
        >
          Manage Newsletters
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;