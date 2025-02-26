import  { useRef, useState } from "react";

const VideoSection = () => {
  // Create a reference to the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div className="flex justify-center items-center gap-0 flex-wrap bg-transparent">
      {/* Row 1 */}
      <img src="/1.png" alt="Image 1" width={176} height={176} className="object-contain" />
      <img src="/2.png" alt="Image 2" width={176} height={176} className="object-contain" />
      <img src="/3.png" alt="Image 3" width={176} height={176} className="object-contain" />
      
      {/* Row 2 - Center Video */}
      <div className="relative">
        <video
          ref={videoRef}
          src="./video.mp4"
          autoPlay
          className="w-40 h-40 object-contain"
          poster="./thumbnail.png"
        ></video>
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex justify-center items-center text-white text-xl rounded-lg"
        >
          {isPlaying ? "" : ""}
        </button>
      </div>

      {/* Row 3 */}
      <img src="/4.png" alt="Image 4" width={176} height={176} className="object-contain" />
      <img src="/5.png" alt="Image 5" width={176} height={176} className="object-contain" />
      <img src="/6.png" alt="Image 6" width={176} height={176} className="object-contain" />
    </div>
  );
};

export default VideoSection;
