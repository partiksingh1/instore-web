import Footer from "@/components/Footer";

export default function PodcastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative">
   <div
  className="absolute bg-cover bg-center m-5"
  style={{
    backgroundImage: "url('/podcast.png')",
    width: '100%', // Make sure the width covers the entire area
    height: '100vh', // Use full viewport height
    backgroundSize: '130%',
    backgroundRepeat:"no-repeat"
  }}>
        </div>
        

    
    {/* Arrows Container */}
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 z-10 flex gap-2">
      <div className="text-gray text-7xl font-extralight flex m-0.5">
        <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11" />
        <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11 -ml-4" />
      </div>
    </div>
    <div className="border-8 md:border-[18px] border-blue-700 m-2 md:m-4 p-4 md:p-4 relative rounded-lg">
        {children}
        <Footer/>
    </div>
    </div>
  );
}
