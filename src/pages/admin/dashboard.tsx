import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-semibold text-gray-800 mb-10">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <button
          className="bg-blue-600 text-white text-lg font-medium py-4  shadow-md hover:bg-blue-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/categories')}
        >
          Manage Categories
        </button>
        <button
          className="bg-green-600 text-white text-lg font-medium py-4 shadow-md hover:bg-green-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/stores')}
        >
          Manage Stores
        </button>
        <button
          className="bg-purple-600 text-white text-lg font-medium py-4 shadow-md hover:bg-purple-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/ads')}
        >
          Manage Ads
        </button>
        <button
          className="bg-red-600 text-white text-lg font-medium py-4 shadow-md hover:bg-red-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/latest')}
        >
          Manage Latest
        </button>
        <button
          className="bg-orange-600 text-white text-lg font-medium py-4 shadow-md hover:bg-orange-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/products')}
        >
          Manage Products
        </button>
        <button
          className="bg-teal-600 text-white text-lg font-medium py-4 shadow-md hover:bg-teal-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/videos')}
        >
          Manage Videos
        </button>
        <button
          className="bg-yellow-600 text-white text-lg font-medium py-4 shadow-md hover:bg-yellow-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/store-window')}
        >
          Manage Store Window
        </button>
        <button
          className="bg-indigo-600 text-white text-lg font-medium py-4 shadow-md hover:bg-indigo-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/newsletter')}
        >
          Manage Newsletters
        </button>
        <button
          className="bg-indigo-600 text-white text-lg font-medium py-4 shadow-md hover:bg-indigo-700 focus:outline-none transition duration-200"
          onClick={() => navigateTo('/admin/newsletter')}
        >
          Manage Access
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
