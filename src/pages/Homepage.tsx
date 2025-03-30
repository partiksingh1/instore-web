import {lazy } from 'react';
import { SocialIcon } from 'react-social-icons';

// Lazy load components
const SpotlightSection = lazy(() => import('@/components/homepage/SpotlightSection'));
const StylizedNav = lazy(() => import('@/components/homepage/Navbar'));
const AdsSection = lazy(() => import('@/components/homepage/AdsSection'));
const VideoSection = lazy(() => import('@/components/homepage/VideoSection'));
const Footer = lazy(() => import('@/components/Footer'));
const LatestSection = lazy(() => import('@/components/homepage/LatestSection'));
const Marquee = lazy(() => import('@/components/homepage/Marquee'));

const HomePage = () => {

  const MainContent = () => (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg')" }}
      />
      {/* Arrows Container */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 md:top-1.5 z-10 flex gap-2">
        <div className="text-white text-xl md:text-7xl font-extralight flex -mt-1">
          <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11" />
          <img src="/arrow.png" alt="Arrow" width={44} height={44} className="w-auto h-11 -ml-4" />
        </div>
      </div>

      {/* Main container with responsive padding */}
      <div className="border-8 md:border-[18px] border-blue-700 m-2 md:m-4 p-2 relative rounded-lg">
      <div className="w-full bg-red-600">
        <Marquee text="This is a sample scrolling text! Customize it to show important information or news." />
      </div>
        {/* Top Banner Ads */}
        <div className="flex justify-center w-full">
          <div className="w-2/5 p-2 m-2 flex flex-row space-x-2 justify-center">
            <AdsSection numOfAds={1} position="homepage-top-banner" />
          </div>
        </div>

        <div className="flex">
          {/* Main Content Section (3/4 width) */}
          <div className="w-3/4">
            <div className="flex flex-col md:flex-row md:justify-evenly md:items-center pb-6 md:space-y-0 space-y-4">
              {/* Logo 1 */}
              <div className="w-full m-auto md:w-5/12 px-4">
                <img src="/logo.png" alt="Logo" width={200} height={100} className="w-full" />
              </div>

              {/* Logo 2 */}
              <div className="w-full m-auto md:w-1/2 pl-4">
                <img src="/roundedlogo.png" alt="Logo" width={200} height={100} className="w-full" />
              </div>

              {/* Social Icons */}
              <div className="flex flex-wrap m-auto w-3/5 md:w-60 justify-center gap-2">
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.instagram.com/instorenetwork/" />
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://x.com/instorenetwork" />
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://facebook.com/instorenetworkuk" />
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://tiktok.com/instorenetwork" />
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.youtube.com/@InstoreNetwork" />
                <SocialIcon className="h-6 w-6 md:h-3 md:w-3" url="https://www.linkedin.com/company/instore-network/" />
              </div>
            </div>

            <StylizedNav />

            {/* Flex container for Latest Section and Hero Content */}
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start space-x-0">
              {/* Left: Latest Section */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <LatestSection numOfNews={2} />
              </div>

              {/* Right: Hero Content */}
              <div className="w-full md:w-1/2 flex flex-col text-center md:text-left md:py-6 p-2">
                <div
                  className="relative bg-cover bg-center mb-4 md:mb-6"
                  style={{ backgroundImage: 'url(map1.png)' }}
                >
                  <div className="absolute inset-0 bg-white opacity-80"></div>
                  <h1 className="text-xl md:text-xl lg:text-2xl font-extrabold mb-1 relative z-10 text-center">
                    B2B & B2B2C MEDIA AND MARKETING SUPPORT FOR THE INDEPENDENT GLOBAL TECH, MOBILE PHONE,
                    <br className="hidden md:block px-2 md:px-4 text-center" />
                    VIDEO GAMING AND TCG TRADE & RETAIL COMMUNITIES
                  </h1>
                </div>

                <VideoSection />

                <div
                  className="relative bg-cover bg-white mt-8 md:mt-4"
                  style={{ backgroundImage: 'url(map1.png)' }}
                >
                  <div className="absolute inset-0 bg-white opacity-80"></div>
                  <p className="text-xl md:text-xl lg:text-2xl font-extrabold relative z-10 text-center">
                    A DATABASE AND DIRECTORY CONTAINING OVER 150,000 STORES AND IN EXCESS OF 5,000 WHOLESALERS & DISTRIBUTORS WORLDWIDE
                  </p>
                </div>
              </div>
            </div>

            <div className="m-6">
              <SpotlightSection />
            </div>

            <div className="md:py-6">
              <StylizedNav />
            </div>
          </div>

          {/* Ads Section on the right side (1/4 width) */}
          <div className="w-1/4">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="m-1">
                <AdsSection numOfAds={1} position="homepage" />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );

  return (
      <MainContent />
  );
};

export default HomePage;