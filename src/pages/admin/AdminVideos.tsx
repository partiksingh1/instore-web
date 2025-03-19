import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// TypeScript types
interface VideoFormData {
  title: string;
  video: File | null;
}

interface Video {
  id: number;
  title: string;
  url: string;
}

const AdminVideo: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoFormData>({
    title: '',
    video: null,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoData((prev) => ({
        ...prev,
        video: files[0],
      }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoData.title || !videoData.video) {
      toast.error('Please fill all fields and upload a video.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('video', videoData.video);
    formData.append('title', videoData.title);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/videos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideos((prev) => [...prev, response.data.video]);
      toast.success('Video uploaded successfully!');
      setVideoData({ title: '', video: null });
    } catch (error) {
      toast.error('Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!id) return;
    try {
      await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/videos/${id}`);
      setVideos((prev) => prev.filter((video) => video.id !== id));
      toast.success('Video deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete video.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const fetchVideos = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/videos`);
      console.log('API Response:', response.data);
      const videoList = Array.isArray(response.data) ? response.data : [];
      setVideos(videoList);
    } catch (error) {
      console.error('Fetch videos error:', error);
      toast.error('Failed to fetch videos.');
      setVideos([]);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Upload Form */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Video</h2>
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      {/* Video List with Previews */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-800">Uploaded Videos</h2>
      {fetchLoading ? (
        <p className="text-gray-600">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-600">No videos available.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <li
              key={video.id}
              className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex flex-col space-y-4">
                {/* Video Preview */}
                <div className="relative overflow-hidden rounded-md">
                  <video
                    src={video.url}
                    controls
                    className="w-full h-48 object-cover"
                    preload="metadata"
                    onError={(e) => {
                      console.error(`Failed to load video: ${video.url}`);
                      e.currentTarget.nextElementSibling?.classList.remove('hidden'); // Show fallback
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="hidden text-red-600 text-sm mt-2">
                    Video preview unavailable.
                  </p>
                </div>

                {/* Title and Delete Button */}
                <div className="flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {video.title}
                  </a>
                  <button
                    onClick={() => {
                      setVideoToDelete(video.id);
                      setShowDeleteModal(true);
                    }}
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Video</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this video?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => videoToDelete && handleDeleteVideo(videoToDelete)}
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideo;