import { Button } from "@/components/ui/button";
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useNavigate, useParams } from 'react-router-dom';
import Socials from "@/components/Socials";
const Continent = () => {
    const { category,stores } = useParams(); 
  const continents = [
    "AFRICA",
    "ASIA",
    "AUSTRALIA & OCEANIA",
    "EUROPE",
    "NORTH AMERICA",
    "SOUTH AMERICA"
  ]; 
  const navigate = useNavigate();
  const handleContinentClick = (continent: string) => {
    let formattedContinent = continent.toLowerCase();

    // Handle specific formatting for Australia & Oceania
    if (continent === "AUSTRALIA & OCEANIA") {
      formattedContinent = "australia-and-oceania";
    } else {
      // Replace spaces with hyphens and handle " & " to "-and-"
      formattedContinent = formattedContinent.replace(/ & /g, '-and-').replace(/ /g, '-');
    }

    // Redirect to the continent-specific page
    navigate(`/${stores}/${category}/${formattedContinent}/`); // Adjust the URL format as needed
  };
  return (
    <StoresLayout>
        <div>
      <div className="min-h-screen flex flex-col items-center text-black">
      <StylizedNav/>
     <Socials/>
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-8 mt-8 md:-mt-12 text-center">STORES</h1>

      {/* Layout for Continents Tabs with Background Image */}
      <div className="relative w-full max-w-8xl mb-12">
        {/* Background Image behind Buttons */}
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/store1.png')" ,backgroundSize:"cover",backgroundPosition:"center"}}></div>

        <div className="flex flex-col items-center relative z-10 p-2">
          {continents.map((continent) => (
            <Button
            onClick={()=>handleContinentClick(continent)}
            variant="ghost"
            className="
              relative group
              whitespace-nowrap
              bg-gradient-to-r from-red-800 to-red-600
              hover:from-red-800 hover:to-red-600
              rounded-lg
               h-16
              mb-4
              transition-all duration-300
              w-full max-w-md text-center
            "
          >
    
            {/* Text */}
            <span
              className="relative text-2xl font-bold text-white flex items-center justify-center h-full"
              style={{
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              {continent}
            </span>
          </Button>
          ))}
        </div>
      </div>
    </div>
    <AdsSection numOfAds={3} />
    </div>
    </StoresLayout>
  );
};

export default Continent;