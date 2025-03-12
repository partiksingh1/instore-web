"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for ad data
interface Ad {
  id: number;
  imageUrl: string;
  // title: string;
  // description: string;
}

interface AdsSectionProps {
  numOfAds: number;  // Accept the number of ads to display
}

const AdCard: React.FC<Ad> = ({ imageUrl }) => (
  <div className="flex items-center justify-center h-full">
    <img
      src={imageUrl}
      alt={"ad"}
      className="w-3/4 h-full object-cover border-8 border-black"
    />
  </div>
);

const AdsSection: React.FC<AdsSectionProps> = ({ numOfAds }) => {
  const [ads, setAds] = useState<Ad[]>([]);  // State to store ads data
  const [loading, setLoading] = useState(true);  // State to manage loading state

  // Fetch ads data from API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/ads`);
        setAds(response.data.ads || []); // Ensure ads is an array
      } catch (error) {
        console.error("Error fetching ads", error);
      } finally {
        setLoading(false);  // Stop loading when data is fetched
      }
    };

    fetchAds();
  }, []);

  return (
    <section id="ads-section" className="border-black rounded-lg">
      <div className="max-w-7xl mx-auto text-center">
        {loading ? (
          <p>Loading ads...</p>  // Display loading message while fetching ads
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {ads.slice(0, numOfAds).map((ad) => (  // Use the numOfAds prop to determine how many ads to show
              <AdCard
                key={ad.id}
                imageUrl={ad.imageUrl}
                id={ad.id}
              />
            ))}
          </div>
        )}

        {/* MORE Button (optional) */}
        <div className="mt-6 text-right">
          {/* <button className="px-8 py-3 bg-red-700 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors">
            MORE
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
