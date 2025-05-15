import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPremiere: React.FC = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchPremiere();
  }, []);

  // Fetch newsletters from the server
  const fetchPremiere = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/premiere`);
      setNewsletters(response.data);
    } catch (error) {
      toast.error("Failed to fetch premiere.");
    }
  };

  // Handle form submission to create a newsletter
  const onSubmit = async (data: any) => {
    try {
      setLoading(true); // Start loading
      // Create newsletter
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/premiere`, {
        title: data.title,
        description: data.description,
        url: data.url,
      });

      // On success, show success toast and reload the newsletters
      toast.success("Premiere created successfully!");
      fetchPremiere(); // Reload newsletters
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to create premiere.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  // Handle newsletter deletion
  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        setLoading(true); // Start loading for deletion
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/premiere/${deleteId}`);
        toast.success("Premiere deleted successfully.");
        fetchPremiere(); // Reload newsletters
      } catch (error) {
        toast.error("Failed to delete premiere.");
      } finally {
        setLoading(false); // Stop loading
        closeDeleteModal(); // Close modal
      }
    }
  };
  useEffect(() => {
    // Check if the user has the 'ADMIN' role
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      // If the user is not an admin, redirect them to the login page (or any other page)
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    } else {
      fetchPremiere();
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">MANAGE NETWORK PREMIERE</h2>

      {/* Create Newsletter Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">Create a New PREMIERE</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("title", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("description", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-medium">Link</label>
            <textarea
              id="url"
              placeholder="Enter video Link"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("url", { required: false })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span>Loading...</span> // Display loading text or spinner while loading
            ) : (
              <span>Create Premiere</span>
            )}
          </button>
        </form>
      </div>

      {/* List Newsletters */}
      <h3 className="text-2xl font-semibold mb-4">Network Premiere List</h3>
      <div className="space-y-4">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <strong className="text-xl m-3">{newsletter.title}</strong>
              <p className="text-sm text-gray-600 m-3">{newsletter.description}</p>
              <p className="text-sm text-gray-600 m-3">Video Link : {newsletter.url}</p>
            </div>
            <button
              onClick={() => openDeleteModal(newsletter.id)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this newsletter?</h2>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                disabled={loading} // Disable delete button when loading
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPremiere;
