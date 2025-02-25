import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Type for Store Window
interface StoreWindow {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

const AdminStoreWindow = () => {
  const [storeWindows, setStoreWindows] = useState<StoreWindow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [newStoreWindow, setNewStoreWindow] = useState({
    title: '',
    description: '',
    url: '',
    image: null as File | null,
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [windowToDelete, setWindowToDelete] = useState<StoreWindow | null>(null);

  // Fetch Store Windows
  const fetchStoreWindows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/windows`);
      setStoreWindows(response.data.data);
    } catch (error) {
      toast.error('Failed to load store windows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreWindows();
  }, []);

  // Handle Create Store Window
  const handleCreateStoreWindow = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const formData = new FormData();
    formData.append('title', newStoreWindow.title);
    formData.append('description', newStoreWindow.description);
    formData.append('url', newStoreWindow.url);
    if (newStoreWindow.image) {
      formData.append('image', newStoreWindow.image);
    }

    try {
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/create-window`, formData);
      setNewStoreWindow({ title: '', description: '', url: '', image: null });
      fetchStoreWindows();
      toast.success('Store Window created successfully');
    } catch (error) {
      toast.error('Failed to create Store Window');
    } finally {
      setCreating(false);
    }
  };

  // Handle Delete Store Window
  const handleDeleteStoreWindow = async () => {
    if (!windowToDelete) return;

    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/window/${windowToDelete.id}`);
      toast.success('Store Window deleted successfully');
      fetchStoreWindows();
    } catch (error) {
      toast.error('Failed to delete Store Window');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Store Windows</h1>

      {/* Create Store Window Form */}
      <form onSubmit={handleCreateStoreWindow} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={newStoreWindow.title}
            onChange={(e) => setNewStoreWindow({ ...newStoreWindow, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
            disabled={creating}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            value={newStoreWindow.description}
            onChange={(e) => setNewStoreWindow({ ...newStoreWindow, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
            disabled={creating}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="url" className="block text-lg font-medium">URL</label>
          <input
            type="url"
            id="url"
            value={newStoreWindow.url}
            onChange={(e) => setNewStoreWindow({ ...newStoreWindow, url: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
            disabled={creating}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="image" className="block text-lg font-medium">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setNewStoreWindow({ ...newStoreWindow, image: e.target.files?.[0] || null })}
            className="w-full p-3 border border-gray-300 rounded-md"
            disabled={creating}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Store Window'}
        </button>
      </form>

      {/* Store Windows List */}
      <h2 className="text-2xl font-semibold mt-10">Existing Store Windows</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : storeWindows.length > 0 ? (
          storeWindows.map((window) => (
            <div key={window.id} className="border p-4 rounded-lg shadow-lg">
              <img src={window.imageUrl} alt={window.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{window.title}</h3>
              <p className="text-gray-600">{window.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <a href={window.url} className="text-blue-500 hover:underline">View</a>
                <button
                  onClick={() => {
                    setWindowToDelete(window);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-800"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No store windows found</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this store window?</h3>
            <div className="flex justify-between">
              <button
                className="py-2 px-4 bg-gray-300 text-black rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteStoreWindow}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoreWindow;
