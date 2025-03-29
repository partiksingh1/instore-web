import { useRef, useEffect } from "react";

const VideoSection = () => {
  // Create a reference to the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
          controls
        ></video>
      </div>
    </div>
  );
};

export default VideoSection;
