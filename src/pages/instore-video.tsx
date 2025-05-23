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
  logoUrl: string
}

const InstoreVideo = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
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
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Please Login/Register to continue!")
      return;
    }

    if (!logo || !selectedVideo) {
      setMessage('Please upload a logo and select a video');
      return;
    }

    setLoading(true);
    setMessage('Processing video...');

    const formData = new FormData();
    formData.append('logoFile', logo);
    formData.append('videoUrl', selectedVideo);
    formData.append('email', email);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/process-video`,
        formData,
        {
          responseType: 'blob',
          timeout: 3 * 60 * 60 * 1000,
        }
      );
      if(response.status==200){
        console.log(response);
        
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl = window.URL.createObjectURL(videoBlob);
  
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = 'IN-STORE VIDEO.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        setMessage('Video processed and downloaded successfully!');
      }
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
        <div className="flex justify-center items-center mt-4 md:-mt-4 w-3/4">
          <img crossOrigin="anonymous"
            src="/instore-video-bg1.png"
            alt="Left Image"
            className="w-32 md:w-1/4 h-auto"
          />

          <img crossOrigin="anonymous"
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto mx-4"
          />

          <img crossOrigin="anonymous"
            src="/instore-video-bg1.png"
            alt="Right Image"
            className="w-32 md:w-1/4 h-auto"
          />
        </div>


        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center mt-3">IN-STORE VIDEO</h1>

        <div className="relative">
          <div className="relative z-10 text-center m-2">
            <p className="text-base sm:text-lg md:text-xl leading-8 text-black mb-4 font-semibold">
              You’re now just a few clicks away from having your own personalised in-store video.This will be a long-playable high quality production which will have your own store logo featured in the top right-hand corner of the screen. On completion of processing, the video will automatically download to your device.
            </p>
            <p className='text-base sm:text-lg md:text-xl leading-8 text-black mb-4 font-semibold'>
              Our videos will play on any device and are suitable for a family audience. There is no violent, or sexual content and no language which might cause offence. They are made to full high quality television broadcast standard.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-8 text-black mb-4 font-semibold">
              Here is a simple, step-by-step guide to obtaining your in-store video.
            </p>
          </div>
        </div>
        <p className='text-2xl font-extrabold text-center mt-4'>1. CLICK AND SELECT YOUR VIDEO</p>
        <p className='text-lg leading-8 text-black mb-4 font-semibold text-center px-20'>We have a huge range of videos to choose from that are perfect for in-store displays. Browse through our library and pick the one that suits your needs.</p>
        <div className="flex items-center justify-center px-4 mt-8 md:mt-8 sm:px-8 md:px-12">
          <div className="p-6 w-full max-w-8xl bg-white rounded-xl shadow-lg">
            {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select video and upload logo</h2> */}
            <form onSubmit={handleProcessVideo} className="space-y-8">
              <div>
                <label className="block mb-4 text-lg font-semibold text-gray-700 text-center -mt-16">Select video:</label>
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
                      crossOrigin="anonymous"
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
                <label className="block mb-2 text-2xl font-extrabold text-center">2. ENTER YOUR EMAIL</label>
                <p className="text-lg leading-8 text-black mb-4 font-semibold text-center">
                  Please provide your email address to receive a link to download your processed video.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-2xl font-extrabold text-center">3. PREPARE AND UPLOAD YOUR LOGO</label>

                <p className="text-lg leading-8 text-black mb-4 font-semibold text-center">
                  We recommend using a PNG file with a transparent background for the best results.
                  There are many free tools online (including Adobe) if you need help creating your logo.
                  Below you will see some screenshots showing a sample logo with different sizes and how it will look on a finished video.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo2.png" alt="Logo Example 2" className="p-2 object-contain" />
                  </div>
                  {/* Logo */}
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo1.2.png" alt="Logo Example 1" className="p-2 -mt-5 object-contain max-w-xl" />
                  </div>

                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo7.png" alt="Logo Example 2" className="p-2 object-contain" />
                  </div>
                  {/* Logo*/}
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo1.3.png" alt="Logo Example 1" className="p-2 -mt-2 object-contain max-w-xl" />
                  </div>

                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo8.png" alt="Logo Example 2" className="p-2 object-contain" />
                  </div>

                  {/* Logo */}
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo1.png" alt="Logo Example 1" className="p-2 -mt-2 object-contain max-w-xl" />
                  </div>
 
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo4.png" alt="Logo Example 4" className="p-2 object-contain" />
                  </div>


                  {/* Logo  */}
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo3.png" alt="Logo Example 3" className="p-2 -mt-2 object-contain max-w-xl" />
                  </div>

                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo6.png" alt="Logo Example 6" className="p-2 object-contain" />
                  </div>

                  {/* Logo */}
                  <div className="flex flex-col items-center">
                    <img crossOrigin="anonymous" src="/logoDemo5.png" alt="Logo Example 5" className="p-2 -mt-2 object-contain max-w-xl" />
                  </div>

                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 mt-4"
                />
              </div>

              <div>
                <label className="block mb-2 text-2xl font-extrabold text-center">4. PROCESS VIDEO</label>

                <p className="text-lg leading-8 text-black mb-4 font-semibold">
                - Now click the PROCESS VIDEO to begin video production. Your logo will feature on the entire video from start to finish. <br />
                - There will be a waiting time as the system generates your video in a similar way that YouTube processes videos after uploading. <br /> 
                - Your video will automatically download on completion. <br />
                - You will now have a fully bespoke and cusomised high quality video to run in your store. <br /> 
                - If you have any queries please email us POSVideo@instorenetwork.com <br />
                - For best results and performance times we recommend using a laptop or PC/Mac to undertake this process. A mobile phone or tablet is not ideally suitable to undertake this task.
                </p>
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

        <div className="relative w-full mt-10">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10"
            style={{ backgroundImage: "url('/bv2.png')" }}
          ></div>
        </div>


        <AdsSection numOfAds={6} position="homepage" />

      </div>
    </InstoreVideoLayout>
  );
};

export default InstoreVideo;
