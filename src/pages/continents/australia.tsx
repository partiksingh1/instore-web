import { Button } from "@/components/ui/button";
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useNavigate, useParams } from "react-router-dom";
import Socials from "@/components/Socials";
const Australia = () => {
    const countriesInAsia = [
        "AUSTRALIA",
        "FIJI",
        "KIRIBATI",
        "MARSHALL ISLANDS",
        "MICRONESIA",
        "NAURA",
        "NEW ZEALAND",
        "PALAU",
        "PAPUA NEW GUINEA",
        "SAMOA",
        "SOLOMON ISLANDS"
      ]      
      const navigate = useNavigate();
      const { category,stores } = useParams();

  const handleCountryClick = (country: string) => {
    let formattedCountry = country.toLowerCase();
    navigate(`/${stores}/${category}/australia/${formattedCountry}`);
  };


  return (
    <StoresLayout>
        <div>
      <div className="min-h-screen flex flex-col items-center text-black">
      <StylizedNav/>
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
      <h1 className="text-5xl font-bold mb-2 mt-2 text-center">AUSTRALIA & OCEANIA</h1>

        <div className="relative w-full max-w-8xl mb-12">
          {/* Background Image behind Buttons */}
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/store1.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10 p-12">
            {countriesInAsia.map((country) => (
              <Button
              key={category}
              variant="ghost"
              className={`
                                      relative group
                  whitespace-nowrap
                  bg-gradient-to-r from-red-800 to-red-600
                  hover:from-red-800 hover:to-red-600
                  rounded-lg
                   h-16
                  mb-4
                  transition-all duration-300
                  w-full max-w-md text-center
                          `}
              onClick={() => handleCountryClick(country)} // Add onClick handler
            >
              <span
                className="relative text-xl md:text-2xl font-bold text-white flex items-center justify-center h-full"
                style={{
                  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                {country}
              </span>
            </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <AdsSection numOfAds={6} position="homepage"/>
    </StoresLayout>
  );
};

export default Australia;