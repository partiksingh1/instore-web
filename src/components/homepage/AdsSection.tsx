"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for ad data
interface Ad {
  id: number;
  imageUrl: string;
  position: string;
}

interface AdsSectionProps {
  numOfAds: number; // Accept the number of ads to display
  position: string; // Accept position to filter ads
}

const AdCard: React.FC<Ad> = ({ imageUrl }) => (
  <div className="flex flex-col justify-evenly">
    <img
      src={imageUrl}
      className="w-full h-full object-cover border-4 border-black"
    />
  </div>
);

const AdsSection: React.FC<AdsSectionProps> = ({ numOfAds, position }) => {
  const [ads, setAds] = useState<Ad[]>([]); // State to store ads data
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch ads data from API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SOME_KEY}/admin/ads`
        );
        const allAds: Ad[] = response.data.ads || [];

        // Filter ads based on position
        const filteredAds = allAds.filter((ad) => ad.position === position);
        setAds(filteredAds);
      } catch (error) {
        console.error("Error fetching ads", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchAds();
  }, [position]); // Re-fetch ads when position changes

  // Dynamically set the grid layout based on the number of ads
  const gridClasses =
    numOfAds === 1 ? "grid-cols-1" : "sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6";

  return (
    <section id="ads-section" className="border-black rounded-lg">
      <div className="w-full mx-auto text-center">
        {loading ? (
          <p>Loading ads...</p> // Display loading message while fetching ads
        ) : ads.length === 0 ? (
          <p>No ads available for this position</p> // Show message if no ads are found
        ) : (
          <div
            className={`w-full grid ${gridClasses} gap-2 justify-evenly items-center`}
          >
            {ads.slice(0, numOfAds).map((ad) => (
              <AdCard key={ad.id} imageUrl={ad.imageUrl} id={ad.id} position={ad.position} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdsSection;
