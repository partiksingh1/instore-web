import { SocialIcon } from 'react-social-icons';
import SpotlightSection from '@/components/homepage/SpotlightSection';
import StylizedNav from '@/components/homepage/Navbar';
import AdsSection from '@/components/homepage/AdsSection';
import VideoSection from '@/components/homepage/VideoSection';
import Footer from '@/components/Footer';
import LatestSection from '@/components/homepage/LatestSection';

const HomePage = () => {
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
      <div className="border-8 md:border-[18px] border-blue-700 m-2 md:m-4 p-2 md:p-4 relative rounded-lg">
      <div className="w-full p-2 m-2">
  {/* Use flex to make them align in a single row */}
  <div className="flex flex-row space-x-2">
    {/* First Ads Section */}
    <div className="flex-1 m-1">
      <AdsSection numOfAds={1} />
    </div>
    
    {/* Second Ads Section */}
    <div className="flex-1 m-1">
      <AdsSection numOfAds={1} />
    </div>
    <div className="flex-1 m-1">
      <AdsSection numOfAds={1} />
    </div>
    <div className="flex-1 m-1">
      <AdsSection numOfAds={1} />
    </div>
    <div className="flex-1 m-1">
      <AdsSection numOfAds={1} />
    </div>
  </div>
</div>



        <div className="flex">
          {/* Main Content Section on the right side (3/4 width) */}
          <div className="w-3/4">

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

            {/* Flex container for Latest Section and Hero Content */}
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-8">

              {/* Left: Latest Section */}
              <div className="w-full md:w-1/2">
                <LatestSection />
              </div>

              {/* Right: Hero Content */}
              <div className="w-full md:w-1/2 text-center md:text-left md:py-12">
                {/* Background for <h1> */}
                <div
                  className="relative bg-cover bg-center mb-4 md:mb-6"
                  style={{ backgroundImage: 'url(map1.png)' }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-white opacity-80"></div>

                  <h1 className="text-xl md:text-xl lg:text-xl font-extrabold text-center mb-4 md:mb-6 relative z-10">
                    B2B & B2B2C MEDIA AND MARKETING SUPPORT FOR THE INDEPENDENT TECH, MOBILE PHONE,
                    <br className="hidden md:block px-2 md:px-4" />
                    VIDEO GAMING AND TCG TRADE & RETAIL COMMUNITIES
                  </h1>
                </div>

                <VideoSection />

                {/* Background for <p> */}
                <div
                  className="relative bg-cover bg-white mt-8 md:mt-4"
                  style={{ backgroundImage: 'url(map1.png)' }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-white opacity-80"></div>

                  <p className="text-xl md:text-xl lg:text-xl text-center font-extrabold relative z-10">
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
          {/* Ads Section on the left side (1/4 width) */}
          <div className="w-1/4 p-2 m-2">
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
            <div className='m-1'>
              <AdsSection numOfAds={1} />
            </div>
          </div>
        </div>


        <Footer />
      </div>
    </div>
  );
};

export default HomePage;