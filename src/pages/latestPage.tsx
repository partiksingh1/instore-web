import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for dynamic route parameter
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import LatestLayout from "@/layouts/latestLayout";
import axios from "axios";
import Socials from "@/components/Socials";

const NewsletterPage = () => {
  const { id } = useParams<{ id: string }>(); // Fetch the dynamic ID from the URL
  const [newsletter, setNewsletter] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/latest/${id}`);
        setNewsletter(response.data);
      } catch (error) {
        console.error("Error fetching newsletter:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNewsletter();
  }, [id]);

  return (
    <LatestLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />

        {/* Social Media Icons Section */}
        <Socials />

        {/* Heading */}
        <div className="flex justify-center mt-4 md:-mt-12">
          <img
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto"
          />
        </div>

        <div className="w-3/4 mt-8">
          {loading ? (
            <div className="text-center text-xl">Loading newsletter...</div>
          ) : (
            <div className="bg-white p-4 border-2 border-black">
              {/* Image of the newsletter */}
              {newsletter.imageUrl && (
                <div className="mb-4">
                  <img
                    src={newsletter.imageUrl} // Show the image from the newsletter object
                    alt={newsletter.subject}
                    className="w-full h-auto object-cover" // Adjust class as needed
                  />
                </div>
              )}

              <h1 className="text-3xl font-semibold text-center">{newsletter.subject}</h1>
              <p className="text-base text-gray-700 mt-4 text-center">{newsletter.content}</p>

              {/* Conditionally render the YouTube link */}
              {newsletter.link && (
                <a
                  href={newsletter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block text-center underline"
                >
                  VIEW ON YOUTUBE
                </a>
              )}
            </div>
          )}
        </div>

        {/* Ads Section on the right side */}
        <div className="w-1/4 mt-8">
          <AdsSection numOfAds={1} position="homepage" />
        </div>
      </div>
    </LatestLayout>
  );
};

export default NewsletterPage;
