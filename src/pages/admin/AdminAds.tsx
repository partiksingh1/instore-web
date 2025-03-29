import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
interface Ad {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;  // Image URL to display in the list
  position: string;
  link?: string;
}

const AdminAds = () => {
  const [ads, setAds] = useState<Ad[]>([]); // Ensure ads is always an array
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState<Ad | null>(null);
  const [newAdData, setNewAdData] = useState({
    title: '',
    description: '',
    position: 'homepage',  // Default value for position
    link: '',
    image: null as File | null,
  });
  

  // Loading states
  const [loading, setLoading] = useState(false);  // For general loading state
  const [creatingAd, setCreatingAd] = useState(false);  // While creating a new ad
  const [deletingAd, setDeletingAd] = useState(false);  // While deleting an ad
  const navigate = useNavigate();

  // Fetch ads from the API
  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/ads`);
      setAds(response.data.ads || []); // Ensure ads is an array, default to empty array if undefined
    } catch (error) {
      toast.error('Failed to fetch ads.');
    } finally {
      setLoading(false);
    }
  };

  // Handle ad creation
  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAd(true);
    const formData = new FormData();
    formData.append('title', newAdData.title);
    formData.append('description', newAdData.description);
    formData.append('position', newAdData.position);
    formData.append('link', newAdData.link || '');
    if (newAdData.image) {
      formData.append('image', newAdData.image);
    }

    try {
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/ads`, formData);
      toast.success('Ad created successfully');
      setNewAdData({
        title: '',
        description: '',
        position: '',
        link: '',
        image: null,
      });
      fetchAds();  // Re-fetch the ads after creating
    } catch (error) {
      toast.error('Failed to create ad');
    } finally {
      setCreatingAd(false);
    }
  };

  // Handle ad deletion
  const handleDeleteAd = async () => {
    if (adToDelete) {
      setDeletingAd(true);
      try {
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/ads/${adToDelete.id}`);
        toast.success('Ad deleted successfully');
        setShowDeleteModal(false);
        fetchAds();  // Re-fetch the ads after deletion
      } catch (error) {
        toast.error('Failed to delete ad');
      } finally {
        setDeletingAd(false);
      }
    }
  };

  // Open the delete confirmation modal
  const openDeleteModal = (ad: Ad) => {
    setAdToDelete(ad);
    setShowDeleteModal(true);
  };

  // Close the delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAdToDelete(null);
  };

  useEffect(() => {
    fetchAds();
  }, []);
  useEffect(() => {
    // Check if the user has the 'ADMIN' role
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      // If the user is not an admin, redirect them to the login page (or any other page)
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    } else {
      // Fetch ads if the user is an admin
      fetchAds();
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Ads</h1>
      
      <form onSubmit={handleCreateAd} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            id="title"
            value={newAdData.title}
            onChange={(e) => setNewAdData({ ...newAdData, title: e.target.value })}
            required
            disabled={creatingAd}  // Disable form fields while creating
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            id="description"
            value={newAdData.description}
            onChange={(e) => setNewAdData({ ...newAdData, description: e.target.value })}
            disabled={creatingAd}
          />
        </div>
        <div className="space-y-1">
  <label htmlFor="position" className="block text-lg font-medium">Position</label>
  <select
    className="w-full p-3 border border-gray-300 rounded-md"
    id="position"
    value={newAdData.position}  // Make sure this is linked to the state
    onChange={(e) => setNewAdData({ ...newAdData, position: e.target.value })}  // Update position
    required
    disabled={creatingAd}  // Disable when creating an ad
  >
    <option value="homepage">Homepage</option>
    <option value="homepage-top-banner">Homepage Top Banner</option>
  </select>
</div>



        <div className="space-y-1">
          <label htmlFor="link" className="block text-lg font-medium">Link</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            id="link"
            value={newAdData.link}
            onChange={(e) => setNewAdData({ ...newAdData, link: e.target.value })}
            disabled={creatingAd}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="image" className="block text-lg font-medium">Image</label>
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md"
            id="image"
            accept="image/*"
            onChange={(e) => setNewAdData({ ...newAdData, image: e.target.files?.[0] || null })}
            disabled={creatingAd}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={creatingAd}  // Disable submit button while creating
        >
          {creatingAd ? 'Creating...' : 'Create Ad'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-10">Existing Ads</h2>
      <div className="space-y-4 mt-4">
        {/* Ensure ads is not undefined */}
        {loading ? (
          <p>Loading ads...</p>  // Display loading message while fetching ads
        ) : ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="flex justify-between items-center p-4 border border-gray-300 rounded-md">
              <div className="flex items-center">
                {/* Display image preview if available */}
                {ad.imageUrl && (
                  <img src={ad.imageUrl} alt={ad.title} className="w-16 h-16 object-cover mr-4 rounded-md" />
                )}
                <div>
                  <h3 className="font-semibold text-xl">{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Position: {ad.position}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => openDeleteModal(ad)}
                disabled={deletingAd}  // Disable button while deleting
              >
                {deletingAd ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        ) : (
          <p>No ads available</p>
        )}
      </div>

      {/* Confirmation Modal for Deleting */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this ad?</h3>
            <div className="flex justify-between">
              <button
                className="py-2 px-4 bg-gray-300 text-black rounded-md"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteAd}
                disabled={deletingAd}
              >
                {deletingAd ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAds;
