import { useState, useEffect, Suspense } from "react";
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
        <Socials />

        {/* Heading */}
        {/* <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">LATEST</h1> */}
        <div className="flex justify-center mt-4 md:-mt-12">
          <img
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto"
          />
        </div>

        <div className="flex">
          <div className="w-3/4">
            {/* Newsletters Section with Background Images */}
            <div className="relative w-full max-w-8xl mt-6 mb-12 text-center p-6">
              {loading ? (
                <div className="text-center text-xl">Loading news...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="overflow-hidden mb-10 w-full max-w-md mx-auto">
                      <div className="h-64 sm:h-72 md:h-80 lg:h-96 flex flex-col border-2 border-black">
                        <div className="h-1/2">
                          <img
                            src={newsletter.imageUrl || "/news.png"} // Fallback image if no image URL
                            alt={newsletter.subject}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-1/2 p-2 bg-white flex flex-col justify-between border-t-2 border-black">
                          <h3 className="text-lg sm:text-xl font-semibold">{newsletter.subject}</h3>
                          <p className="text-sm sm:text-base text-gray-700 flex-1 overflow-hidden text-ellipsis">{newsletter.content}</p>
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
                    </div>

                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Ads Section on the left side (1/4 width) */}
          <div className="w-1/4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="mt-12">
                <Suspense fallback={<div>Loading Ads...</div>}>
                  <AdsSection numOfAds={1} position='homepage' />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LatestLayout>
  );
};

export default Latest;
