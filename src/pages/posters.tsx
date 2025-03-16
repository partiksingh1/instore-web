import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import PostersLayout from "@/layouts/postersLayout";
import Socials from "@/components/Socials";

const Posters = () => {

  return (
    <PostersLayout>
      <div className="min-h-screen flex flex-col items-center text-black px-4">
        <StylizedNav />
        <Socials />
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mt-6 md:-mt-12 text-center">
          IN-STORE POSTERS
        </h1>
        
        {/* Text Section with Background Images */}
        <div className="relative w-full max-w-8xl mb-12 text-center p-6">
          <div className="relative z-10">
            <p className="text-lg sm:text-2xl mb-4 font-bold">
              We produce a range of high quality full colour posters for use in-store to help your customers and maximise sales revenue.
            </p>
            <p className="text-lg sm:text-2xl mb-4 font-bold">
              Posters are sold in smaller packs to stores or in bulk to all wholesalers and distributors and are on sale on both Amazon and Ebay.
            </p>
            <p className="text-lg sm:text-2xl mb-4 font-bold">
              Phones, PC, Video Games, TCG, Merchandise, Repairs and Tech are all available in A2 format and can be shipped worldwide.
              <br />
              <span className="text-red-600 underline">CLICK HERE</span> for the full range.
            </p>
          </div>
        </div>

        {/* Posters Section */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 -mx-4 sm:-mx-6 md:-mx-8">
          <div className="w-full sm:w-1/2 md:w-1/3 p-3">
            <img
              src="/poster5.png"
              alt="Poster 1"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-3">
            <img
              src="/poster3.png"
              alt="Poster 2"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-3">
            <img
              src="/poster4.jpg"
              alt="Poster 3"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-3">
            <img
              src="/poster6.png"
              alt="Poster 4"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Ads Section */}
        <div className="mt-10 w-full">
          <AdsSection numOfAds={3} position="homepage"/>
        </div>
      </div>
    </PostersLayout>
  );
};

export default Posters;
