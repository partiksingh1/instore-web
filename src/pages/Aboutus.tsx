import StylizedNav from "@/components/homepage/Navbar";
import Socials from "@/components/Socials";
import AboutusLayout from "@/layouts/aboutusLayout";
import { SocialIcon } from "react-social-icons";

const Aboutus = () => {
  return (
    <AboutusLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />
        
        {/* Social Media Icons Section */}
        <Socials/>

        {/* About Us Heading */}
        <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center mb-8 md:mb-8">ABOUT US</h1>

        {/* About Us Details Section */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-6xl mx-4 sm:mx-6">
          <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4">
            <strong>Instore Network</strong> is the B2B and B2B2C media and
            marketing platform dedicated to the independent PC, Mobile Phone,
            Tech, Video Games, TCG & Merchandise retail communities throughout
            the whole world.
          </p>
          <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4">
            <strong>REACHING OUT TO RETAIL</strong> is what we do, and that
            means delivering support to over 150,000 stores across the entire
            group of sectors and to in excess of 5,000 specialist wholesalers
            and distributors who supply the retail trade channels.
          </p>
          <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4">
            Instore Network produces <strong>MARKETING SUPPORT</strong> and
            supplies a variety of items which are shipped to online and physical
            retail stores to help boost product marketing and brand awareness.
            From supplying window posters, in-store video to download, or
            stickers and flyers which are packed into boxes for online orders -
            Instore Network is geared to boosting business for supplier brands
            and stores across all sectors of the entire marketplace.
          </p>
          <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4">
            <strong>MEDIA:</strong> From market stalls to mini-multiple chain
            stores, Instore Network delivers high-quality content targeted
            specifically for people working in six vibrant and growing trade
            sectors. Buyer Guides, Distributor Directories, product guides,
            sales trends, retail feedback, launch events, or respectfully
            honoring people that pass - Instore Network is across everything
            that matters.
          </p>
          <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4">
            We put people first and are driven by their stories of hard work and
            dedication to their businesses. It’s people who sell products and
            provide a service, not computer-generated algorithms.
          </p>
        </div>

        {/* Images Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4">
          <div className="overflow-hidden rounded-md shadow-md">
            <img
              src="/aboutus1.png"
              alt="Instore Network Image 1"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-md shadow-md">
            <img
              src="/aboutus2.png"
              alt="Instore Network Image 2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* About the Founder Section */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 mt-16 text-center">ABOUT THE FOUNDER</h1>
        <p className="text-lg sm:text-xl leading-8 text-gray-700 mb-4 text-center font-bold">
          Instore Network has been founded by Jonathan Beales - a media and marketing professional with extensive experience in the B2B tech & games sectors. A specialist career involving much innovation & includes magazine publishing, B2B marketing, video production, in-store launch events, national radio and tv broadcasting, esports commentary and the making of a feature-length film documentary.
        </p>

        {/* Founder Image */}
        <div className="mt-10 w-full px-4">
          <div className="overflow-hidden rounded-md shadow-lg">
            <img
              src="/founder.png"
              alt="Instore Network Founder"
              className="w-full h-auto object-cover border-8 border-black"
            />
          </div>
        </div>
      </div>
    </AboutusLayout>
  );
};

export default Aboutus;
