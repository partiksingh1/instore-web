import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const VideoSection = () => {
  // Create a reference to the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);  // Set initial mute state to true
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Set the video to be muted when the page loads (initially)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;  // Mute video by default
    }
  }, []); // Empty dependency array to ensure this runs once on mount

  return (
    <div className="flex justify-center items-center bg-transparent w-full">
      {/* Center Video */}
      <div className="relative">
        <video
          ref={videoRef}
          src="./video.mp4"
          autoPlay
          className="w-full object-contain border-2 border-black p-2"
          poster="./thumbnail.png"
        ></video>

        <div className="absolute inset-0 flex justify-center items-end">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="flex justify-items-end items-end text-black text-xl rounded-lg m-2"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="flex justify-center items-end text-black text-xl rounded-lg m-2"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
