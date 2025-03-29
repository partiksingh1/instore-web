import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useNavigate, useParams } from "react-router-dom";
import Socials from "@/components/Socials";
const NorthAmerica = () => {
    const countriesInAsia = [
        "ANTIGUA",
        "BAHAMAS",
        "BARBADOS",
        "BELIZE",
        "CANADA",
        "COSTA RICA",
        "CUBA",
        "DOMINICA",
        "DOMINICAN REPUBLIC",
        "EL SALVADOR",
        "GRENADA",
        "GUATEMALA",
        "HAITI",
        "HONDURAS",
        "JAMAICA",
        "MEXICO",
        "NICARAGUA",
        "PANAMA",
        "SAINT KITTS",
        "SAINT LUCIA",
        "SAINT VINCENT",
        "TRINIDAD TOBAGO",
        "USA"
      ]      
      const navigate = useNavigate();
      const { category,stores } = useParams();

  const handleCountryClick = (country: string) => {
    let formattedCountry = country.toLowerCase();
    navigate(`/${stores}/${category}/northAmerica/${formattedCountry}`);
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
      <h1 className="text-5xl font-bold mb-2 mt-2 text-center">NORTH AMERICA</h1>

        <div className="relative w-full max-w-8xl mb-12">
          {/* Background Image behind Buttons */}
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/store1.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10 p-12">
            {countriesInAsia.map((country) => (
              <Button
                key={country}
                variant="ghost"
                className={`
                  relative group 
                  whitespace-nowrap 
                  bg-gradient-to-r from-red-800 to-red-600
                  hover:from-red-800 hover:to-red-600
                  rounded-lg 
                  w-full h-16 
                  transition-all duration-100
                `}
                onClick={() => handleCountryClick(country)} // Add onClick handler
              >
                {/* Animated background grid */}
                <div className="absolute inset-0 bg-grid opacity-10 rounded-lg overflow-hidden animate-grid-flow"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-sm group-hover:blur-md transition-all"></div>

                {/* Vertical bars */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-100"></span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-100"></span>

                {/* Top light */}
                <motion.span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                ></motion.span>

                {/* Bottom light */}
                <motion.span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                ></motion.span>

                {/* Text */}
                <span className="relative text-xl md:text-3xl font-bold text-white flex items-center justify-center h-full" style={{
                  textShadow: `-1px -1px 0 #000,
                                1px -1px 0 #000,
                                -1px 1px 0 #000,
                                1px 1px 0 #000`
                }}>
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

export default NorthAmerica;