const VideoSection = () => {
  return (
    <div className="flex justify-center items-center gap-0 flex-wrap bg-transparent">
      {/* Row 1 */}
      <img src="/1.png" alt="Image 1" width={176} height={176} className="object-contain" />
      <img src="/2.png" alt="Image 2" width={176} height={176} className="object-contain" />
      <img src="/3.png" alt="Image 3" width={176} height={176} className="object-contain" />
      {/* Row 2 - Center Video */}
      <video
        src="./video.mp4"
        autoPlay
        className="w-40 h-40 object-contain"
        poster='./thumbnail.png'
      ></video>
      {/* Row 3 */}
      <img src="/4.png" alt="Image 4" width={176} height={176} className="object-contain" />
      <img src="/5.png" alt="Image 5" width={176} height={176} className="object-contain" />
      <img src="/6.png" alt="Image 6" width={176} height={176} className="object-contain" />
    </div>
  );
};

export default VideoSection;