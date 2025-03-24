import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import InstoreVideoLayout from "@/layouts/instore-videoLayout";
import Socials from '@/components/Socials';

interface Video {
  id: string;
  title: string;
  url: string;
  logoUrl :string
}

const InstoreVideo = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>(`${import.meta.env.VITE_SOME_KEY}/admin/videos`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setMessage('Failed to fetch videos');
      }
    };

    fetchVideos();
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const handleProcessVideo = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!logo || !selectedVideo) {
      setMessage('Please upload a logo and select a video');
      return;
    }

    setLoading(true);
    setMessage('Processing video...');

    const formData = new FormData();
    formData.append('logoFile', logo);
    formData.append('videoUrl', selectedVideo);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/process-video`,
        formData,
        {
          responseType: 'blob',
          timeout: 30 * 60 * 1000,
        }
      );

      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = window.URL.createObjectURL(videoBlob);

      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = 'processed_video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage('Video processed and downloaded successfully!');
    } catch (error) {
      console.error('Error processing video:', error);
      setMessage('Failed to process video');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <InstoreVideoLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />
        <Socials />

        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center -mt-10">INSTORE VIDEO</h1>

        <div className="relative">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10"
            style={{ backgroundImage: "url('/bv1.png')" }}
          ></div>
          <div className="relative z-10 text-left mt-10">
            <p className="text-base sm:text-lg md:text-2xl leading-8 text-black mb-4 font-bold">
              <ul className="m-5">
                <li>• Video has been a proven and effective sales and marketing tool for over four decades, especially inside stores.</li>
                <li>• Now, bespoke, store-branded downloadable videos are available to play in your store.</li>
                <li>• The in-store video range is accessible to all registered stores and businesses.</li>
                <li>• Any store wishing to sign up and register can do so by visiting the REGISTER page and filling in the required information.</li>
                <li>• Simply upload a 2MB file of your store or business logo, and we will edit it into a 3-hour video that appears on screen every 5 minutes.</li>
                <li>• We offer a wide variety of in-store videos, from single-category options to fully mixed product spreads.</li>
              </ul>
              <br />
              <ul className="m-5">
                <li>We have a huge choice of in-store videos to choose from, ranging from a single solus category to a fully mixed product spread.</li>
                <li>Available categories include:</li><br />
                <li><a href="/phones" className="text-blue-500 hover:underline">PHONES</a></li>
                <li><a href="/pc" className="text-blue-500 hover:underline">PC</a></li>
                <li><a href="/audio" className="text-blue-500 hover:underline">AUDIO</a></li>
                <li><a href="/video-games" className="text-blue-500 hover:underline">VIDEO GAMES</a></li>
                <li><a href="/tech" className="text-blue-500 hover:underline">TECH</a></li>
                <li><a href="/merchandise" className="text-blue-500 hover:underline">MERCHANDISE</a></li>
                <li><a href="/tcg" className="text-blue-500 hover:underline">TCG (TRADING CARD GAMES)</a></li>
              </ul>
            </p>
          </div>
        </div>

        <div className="relative w-full mt-10">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10"
            style={{ backgroundImage: "url('/bv2.png')" }}
          ></div>
          <div className="relative z-10 mt-10 p-5">
            <h2 className="text-3xl font-bold mb-4">Do You Require More Than One Category?</h2>
            <p className="text-base sm:text-lg md:text-xl leading-8 text-black mb-4 font-bold">
              <ul className="list-disc pl-5 text-lg sm:text-xl">
                <li><a className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES & TECH & MERCHANDISE & TCG</a></li>
                <li><a className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES & TECH</a></li>
                <li><a className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES</a></li>
                <li><a className="text-blue-500 hover:underline">PHONES & PC</a></li>
                <li><a className="text-blue-500 hover:underline">PHONES & PC & VIDEO GAMES</a></li>
                <li><a className="text-blue-500 hover:underline">PC & VIDEO GAMES</a></li>
                <li><a className="text-blue-500 hover:underline">PC & AUDIO</a></li>
                <li><a className="text-blue-500 hover:underline">PC & AUDIO & VIDEO GAMES</a></li>
                <li><a className="text-blue-500 hover:underline">VIDEO GAMES & MERCHANDISE</a></li>
                <li><a className="text-blue-500 hover:underline">VIDEO GAMES & MERCHANDISE & TCG</a></li>
                <li><a className="text-blue-500 hover:underline">VIDEO GAMES & TCG</a></li>
                <li><a className="text-blue-500 hover:underline">MERCHANDISE & TCG</a></li>
              </ul>
            </p>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl">
              For any other requirements or queries, please email us at <a href="mailto:POSVideo@instorenetwork.com" className="text-blue-500">POSVideo@instorenetwork.com</a>
            </p>
          </div>
        </div>
         {/* Instruction Section */}
         <div className="w-full max-w-4xl p-8 mt-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Use In-Store Video</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">1. SELECT A VIDEO</h3>
              <p className="text-base text-gray-700">
                We have a huge range of videos to choose from that are perfect for in-store displays. Browse through our library and pick the one that suits your needs.
              </p>
                            {/* Add images for logo examples */}
                            <div className="flex justify-center mt-4">
                <img src="/logoDemo2.png" alt="Example 1" className="p-2 object-contain" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold mb-4">2. PREPARE AND UPLOAD YOUR LOGO</h3>
              <p className="text-base text-gray-700">
                We recommend using a PNG file with a transparent background for the best results.There are many free tools online (including Adobe) if you need help creating your logo. Here are some examples:
              </p>
              {/* Add images for logo examples */}
              <div className="flex justify-center mt-4">
                <img src="/logoDemo1.png" alt="Example 2" className="p-2 object-contain" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">3. WAIT FOR THE VIDEO TO PROCESS</h3>
              <p className="text-base text-gray-700">
              The videos are made to a high standard and have a long running time. Please be patient and wait for the video to process. It's no different to waiting for YouTube videos to prcoess after they have been uploaded.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">4. VIDEO DOWNLOADS AUTOMATICALLY</h3>
              <p className="text-base text-gray-700">
              Once your video has finished processing it will automatically download to your device and will be ready for use.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 mt-8 md:mt-8 sm:px-8 md:px-12">
          <div className="p-6 w-full max-w-4xl bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select video and upload logo</h2>
            <form onSubmit={handleProcessVideo} className="space-y-8">
              <div>
                <label className="block mb-2 text-lg font-semibold text-gray-700">Select video:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video.url)}
                      className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 ${selectedVideo === video.url
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:bg-gray-100 hover:shadow-md'
                        }`}
                    >
                   <p className="text-lg text-center truncate m-3">{video.title}</p>
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
                      <p className="text-md  text-center break-words m-3">{video.logoUrl}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-lg font-semibold text-gray-700">Upload logo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading || !selectedVideo}
                >
                  {loading ? 'Processing...' : 'Process Video'}
                </button>
              </div>
            </form>

            {message && <p className="mt-6 text-center text-gray-600">{message}</p>}
          </div>
        </div>

        <AdsSection numOfAds={3} position="homepage" />
      </div>
    </InstoreVideoLayout>
  );
};

export default InstoreVideo;
