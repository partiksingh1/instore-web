import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScrollBarPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedText, setFetchedText] = useState<string | null>(null);

  // Function to update an existing ScrollBar
  const updateScrollBar = async () => {
    if (!text) {
      toast.error('Please provide both ID and text to update a ScrollBar!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_SOME_KEY}/admin/scrollBar/1`, { text });
      toast.success('ScrollBar updated successfully!');
      setFetchedText(response.data.text);  // Update the fetched text after update
    } catch (error) {
      toast.error('An error occurred while updating the ScrollBar.');
    } finally {
      setLoading(false);
    }
  };
    // Fetch ScrollBar text when the component mounts
    useEffect(() => {
        fetchScrollBarText();
      }, []);

  // Function to fetch the ScrollBar text by ID
  const fetchScrollBarText = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/scrollBar/latest`);
      setFetchedText(response.data.text);  // Set the fetched text in the state
      toast.success('ScrollBar text fetched successfully!');
    } catch (error) {
      toast.error('An error occurred while fetching the ScrollBar text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">ScrollBar Management</h1>

        {/* Input for Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the ScrollBar text"
          />
        </div>
        {/* Display the fetched ScrollBar text */}
        {fetchedText && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Current ScrollBar Text:</h3>
            <p className="p-2 border border-gray-300 rounded-md">{fetchedText}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {/* Update Button */}
          <button
            onClick={updateScrollBar}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-300"
          >
            {loading ? 'Updating...' : 'Update ScrollBar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollBarPage;
