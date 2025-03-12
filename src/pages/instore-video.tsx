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
        <Socials/>
        
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center mt-4">INSTORE VIDEO</h1>

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
                <li><a href="/phones-pc-audio-video-games-tech-merchandise-tcg" className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES & TECH & MERCHANDISE & TCG</a></li>
                <li><a href="/phones-pc-audio-video-games-tech" className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES & TECH</a></li>
                <li><a href="/phones-pc-audio-video-games" className="text-blue-500 hover:underline">PHONES & PC & AUDIO & VIDEO GAMES</a></li>
                <li><a href="/phones-pc" className="text-blue-500 hover:underline">PHONES & PC</a></li>
                <li><a href="/phones-pc-video-games" className="text-blue-500 hover:underline">PHONES & PC & VIDEO GAMES</a></li>
                <li><a href="/pc-video-games" className="text-blue-500 hover:underline">PC & VIDEO GAMES</a></li>
                <li><a href="/pc-audio" className="text-blue-500 hover:underline">PC & AUDIO</a></li>
                <li><a href="/pc-audio-video-games" className="text-blue-500 hover:underline">PC & AUDIO & VIDEO GAMES</a></li>
                <li><a href="/video-games-merchandise" className="text-blue-500 hover:underline">VIDEO GAMES & MERCHANDISE</a></li>
                <li><a href="/video-games-merchandise-tcg" className="text-blue-500 hover:underline">VIDEO GAMES & MERCHANDISE & TCG</a></li>
                <li><a href="/video-games-tcg" className="text-blue-500 hover:underline">VIDEO GAMES & TCG</a></li>
                <li><a href="/merchandise-tcg" className="text-blue-500 hover:underline">MERCHANDISE & TCG</a></li>
              </ul>
            </p>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl">
              For any other requirements or queries, please email us at <a href="mailto:POSVideo@instorenetwork.com" className="text-blue-500">POSVideo@instorenetwork.com</a>
            </p>
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
                      className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 ${
                        selectedVideo === video.url
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    >
                      <video
                        src={video.url}
                        className="w-full h-40 object-cover rounded-md mb-2"
                        muted
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                        onClick={(e) => e.preventDefault()}
                      />
                      <p className="text-sm text-gray-600 text-center truncate">{video.title}</p>
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

        <AdsSection numOfAds={3} />
      </div>
    </InstoreVideoLayout>
  );
};

export default InstoreVideo;
