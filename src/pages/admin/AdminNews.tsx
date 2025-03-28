import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminNews: React.FC = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewsletters();
  }, []);

  // Fetch newsletters from the server
  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/latest`);
      setNewsletters(response.data);
    } catch (error) {
      toast.error("Failed to fetch newsletters.");
    }
  };

  // Handle form submission to create a newsletter
  const onSubmit = async (data: any) => {
    try {
      setLoading(true); // Start loading
      console.log('Form Data:', data); // Log the form data
      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("content", data.content);
      formData.append("link", data.link);
      
      // Check if image exists
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else {
        console.error('No image file provided');
        toast.error("Please upload an image.");
        setLoading(false); // Stop loading
        return; // Exit if no image is provided
      }

      // Create newsletter
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/latest`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      // On success, show success toast and reload the newsletters
      toast.success("Latest created successfully!");
      fetchNewsletters(); // Reload newsletters
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to create newsletter.");
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
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/latest/${deleteId}`);
        toast.success("Latest deleted successfully.");
        fetchNewsletters(); // Reload newsletters
      } catch (error) {
        toast.error("Failed to delete newsletter.");
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
      fetchNewsletters();
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">MANAGE LATEST</h2>

      {/* Create Newsletter Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">Create a New LATEST</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Enter subject"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("subject", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
            <textarea
              id="content"
              placeholder="Enter content"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("content", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 font-medium">Video link</label>
            <textarea
              id="link"
              placeholder="Enter video link"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("link", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium">Image</label>
            <input
              type="file"
              id="image"
              className="w-full mt-2"
              {...register("image", { required: true })}
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
              <span>Create Latest</span>
            )}
          </button>
        </form>
      </div>

      {/* List Newsletters */}
      <h3 className="text-2xl font-semibold mb-4">Latest List</h3>
      <div className="space-y-4">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <strong className="text-xl m-3">{newsletter.subject}</strong>
              <p className="text-sm text-gray-600 m-3">{newsletter.content}</p>
              {newsletter.imageUrl && (
                <img src={newsletter.imageUrl} alt="Newsletter" className="mt-2 w-32 h-32 object-cover m-3" />
              )}
              <p className="text-sm text-gray-600 m-3">Video Link : {newsletter.link}</p>
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

export default AdminNews;
