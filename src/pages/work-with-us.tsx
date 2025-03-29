import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import WwsLayout from "@/layouts/work-with-usLayout";
import Socials from "@/components/Socials";

const WorkWithUs = () => {
  return (
    <WwsLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />

        {/* Social Media Icons Section */}
        <Socials/>

        <div className="flex justify-center items-center mt-4 md:-mt-10 w-3/4">
          <img
            src="/instore-video-bg1.png"
            alt="Left Image"
            className="w-32 md:w-1/4 h-auto"
          />

          <img
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto mx-4"
          />

          <img
            src="/instore-video-bg1.png"
            alt="Right Image"
            className="w-32 md:w-1/4 h-auto"
          />
        </div>
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mt-4  text-center">WORK WITH US</h1>

        {/* Text Section with Background Images */}
        <div className="relative w-full max-w-8xl mb-12 text-center p-6 sm:px-10">
          <div className="relative z-10">
            <p className="text-lg sm:text-xl mb-6 font-semibold">
              We are the first Business-to-Business media and marketing platform which offers a global presence in the independent retail marketplace to all companies in the Phone, PC, Video Games, Tech, TCG, and Merchandise sectors.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              All of the independent sectors have huge loyal communities because the stores offer a fantastic unrivaled service coupled with great pricing and product availability.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              Chain stores and Tech Giant online offerings cannot match this level of service. If your phone needed to be repaired, would you post it back to Amazon? Unlikely. Would you take it to a local independent store? Very likely.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              It’s not just repairs either. Because technology is constantly evolving, many people cannot keep up with current trends. People need advice, and a local independent store will have that advice. It will be great advice because they know customers respect their suggestions and recommendations.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              At Instore Network, we pride ourselves in offering all of our commercial clients and partners the very best value for money.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              Like the independent stores, we are highly efficient and pass on our cost savings, which means we can offer a huge choice of<br />COST-EFFECTIVE, highly targeted marketing activity.
            </p>

            <p className="text-lg sm:text-xl mb-6 font-semibold">
              Click <span className="text-red-600 underline">HERE</span> for more information.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-full sm:w-5/6 mb-12">
          <video 
            className="w-full h-auto object-cover border-8 border-black rounded-md"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Ads Section */}
        <div className="mt-24 w-full">
        <AdsSection numOfAds={6} position="homepage"/>
        </div>
      </div>
    </WwsLayout>
  );
};

export default WorkWithUs;
