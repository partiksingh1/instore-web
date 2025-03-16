import React, { useEffect, useState } from "react";
import axios from "axios";

interface LatestSectionProps {
  numOfNews: number; // Accept the number of newsletters to display
}

const LatestSection: React.FC<LatestSectionProps> = ({ numOfNews }) => {
  const [newsletters, setNewsletters] = useState<any[]>([]); // State to store fetched newsletters
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch newsletters when the component mounts
  useEffect(() => {
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

  // Only display the number of newsletters passed in the `numOfNews` prop
  const newslettersToShow = newsletters.slice(0, numOfNews);

  return (
    <section id="latest-section" className="border-black rounded-lg">
      {/* Newsletters Section with Background Images */}
      <div className="relative w-full max-w-8xl mt-6 text-center">
        {loading ? (
          <div className="text-center text-xl">Loading newsletters...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {newslettersToShow.map((newsletter) => (
              <div key={newsletter.id} className="shadow-lg overflow-hidden mb-10">
                <img
                  src={newsletter.imageUrl} // Fallback image if no image URL
                  alt={newsletter.subject}
                  className="w-full h-1/4 sm:h-56 md:h-48 lg:h-56 object-cover border-2 border-black"
                />
                <div className="mt-2 border-2 border-black bg-white">
                  <h3 className="text-lg sm:text-xl font-semibold underline">{newsletter.subject}</h3>
                  <p className="text-sm sm:text-base text-gray-700">{newsletter.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestSection;
