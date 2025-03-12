import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

const VideoSection = () => {
  // Create a reference to the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // State to track whether the video is playing or paused
  const [isPlaying, setIsPlaying] = useState(false);

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
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex justify-center items-center bg-transparent w-full">
      {/* Left Images - Align vertically
      <div className="flex flex-col gap-4">
        <img src="/1.png" alt="Image 1" width={176} height={176} className="object-contain" />
        <img src="/2.png" alt="Image 2" width={176} height={176} className="object-contain" />
        <img src="/3.png" alt="Image 3" width={176} height={176} className="object-contain" />
      </div> */}

      {/* Center Video */}
      <div className="relative">
        <video
          ref={videoRef}
          src="./video.mp4"
          autoPlay
          className="w-full object-contain" // Increased the size of the video
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

      {/* Right Images - Align vertically
      <div className="flex flex-col gap-4">
        <img src="/4.png" alt="Image 4" width={176} height={176} className="object-contain" />
        <img src="/5.png" alt="Image 5" width={176} height={176} className="object-contain" />
        <img src="/6.png" alt="Image 6" width={176} height={176} className="object-contain" />
      </div> */}
    </div>
  );
};

export default VideoSection;
