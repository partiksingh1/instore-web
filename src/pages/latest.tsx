import  { useState, useEffect } from "react";
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import LatestLayout from "@/layouts/latestLayout";
import axios from "axios";
import Socials from "@/components/Socials";

const Latest = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]); // State to store fetched newsletters
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetch newsletters when component mounts
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/latest`);
        setNewsletters(response.data); // Store newsletters in state
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchNewsletters();
  }, []);

  return (
    <LatestLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />
        
        {/* Social Media Icons Section */}
        <Socials/>

        {/* Heading */}
        <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">LATEST</h1>

        {/* Newsletters Section with Background Images */}
        <div className="relative w-full max-w-8xl mt-6 mb-12 text-center p-6">
          {loading ? (
            <div className="text-center text-xl">Loading newsletters...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="shadow-lg overflow-hidden mb-10">
                  <img
                    src={newsletter.imageUrl || "/news.png"} // Fallback image if no image URL
                    alt={newsletter.subject}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover border-2 border-black"
                  />
                  <div className="p-2 mt-2 border-2 border-black bg-white">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{newsletter.subject}</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">{newsletter.content}</p>
                    <a
                      href={newsletter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      VIEW MORE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ads Section */}
        <div className="mt-24">
          <AdsSection />
        </div>
      </div>
    </LatestLayout>
  );
};

export default Latest;
