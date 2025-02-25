import { SocialIcon } from 'react-social-icons';
import SpotlightSection from '@/components/homepage/SpotlightSection';
// import InteractiveMap from '@/components/homepage/InteractiveMap';
import StylizedNav from '@/components/homepage/Navbar';
import AdsSection from '@/components/homepage/AdsSection';
import VideoSection from '@/components/homepage/VideoSection';
import World from "@react-map/world";
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const worldSize = windowWidth < 640 ? 350 : 1000;
  const navigate = useNavigate();
  const redirect = (state: string | null) => {
    if (state) {
      // Only navigate if `state` is a valid string
      navigate(`/country/${state}`);
    } else {
      console.warn("Invalid country code: state is null");
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg')" }}
      />

      {/* Arrows Container */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 md:-top-0 z-10 flex gap-2">
        <div className="text-white text-xl md:text-7xl font-extralight flex m-0.5">
          <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11" />
          <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11 -ml-4" />
        </div>
      </div>

      {/* Main container with responsive padding */}
      <div className="border-8 md:border-[18px] border-blue-700 m-2 md:m-4 p-4 md:p-8 relative rounded-lg">

        {/* Rest of your existing components */}
        <div className="flex flex-col md:flex-row md:justify-evenly md:items-center pb-6 md:space-y-0 space-y-4">
          {/* Logo 1 */}
          <div className="w-full m-auto md:w-5/12 px-4">
            <img
              src="/logo.png"
              alt="Logo"
              width={200}
              height={100}
              className="w-full"
            />
          </div>

          {/* Logo 2 */}
          <div className="w-full m-auto md:w-1/2 pl-4">
            <img
              src="/roundedlogo.png"
              alt="Logo"
              width={200}
              height={100}
              className="w-full"
            />
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap m-auto w-3/5 md:w-60 justify-center gap-2 md:justify-center">
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.instagram.com/instorenetwork/" />
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://x.com/instorenetwork" />
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://facebook.com/instorenetworkuk" />
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://tiktok.com/instorenetwork" />
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.youtube.com/@InstoreNetwork" />
            <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.linkedin.com/company/instore-network/" />
          </div>
        </div>


        <StylizedNav />

        {/* Hero Content */}
        <div className="text-center md:py-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 md:mb-6  px-2 md:px-4">
            B2B & B2B2C MEDIA AND MARKETING SUPPORT FOR THE TECH, MOBILE PHONE,
            <br className="hidden md:block  px-2 md:px-4" />
            VIDEO GAMING AND TCG TRADE & RETAIL COMMUNITIES
          </h1>
          <div className="my-4 md:my-8">
            <VideoSection />
          </div>
          <p className="text-lg md:text-2xl lg:text-4xl font-extrabold mt-8 md:mt-8">
            A DATABASE AND DIRECTORY CONTAINING OVER 150,000 STORES AND IN EXCESS OF 5,000 WHOLESALERS & DISTRIBUTORS WORLDWIDE
          </p>
        </div>

        {/* <InteractiveMap /> */}
        <div className="flex flex-col justify-center items-center">
          <World
            onSelect={redirect}
            size={worldSize}
            hoverColor="orange"
            type="select-single"
          />
        </div>


        <div className="md:py-12">
          <SpotlightSection />
        </div>


        <AdsSection />

        <div className="md:py-6">
          <StylizedNav />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;