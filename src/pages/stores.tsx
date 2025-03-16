import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useNavigate } from 'react-router-dom';
import Socials from "@/components/Socials";

const Stores = () => {
  const categories = [
    "PHONES",
    "PC",
    "TECH",
    "AUDIO",
    "VIDEO GAMES",
    "TCG",
    "MERCHANDISE",
    "SPARES & REPAIRS"
  ];

  const navigate = useNavigate();
  const handleContinentClick = (category: string) => {
    let formattedContinent = category.toLowerCase();

    // Handle specific formatting for Australia & Oceania
    if (category === "SPARES & REPAIRS") {
      formattedContinent = "SPARES-AND-REPAIRS";
    } else if(category === "PHONES"){
      formattedContinent = "PHONE";
    } else {
      // Replace spaces with hyphens and handle " & " to "-and-"
      formattedContinent = formattedContinent.replace(/ & /g, '-and-').replace(/ /g, '-');
    }

    // Redirect to the continent-specific page
    navigate(`/stores/${formattedContinent}`); // Adjust the URL format as needed
  };

  return (
    <StoresLayout>
      <div>
        <div className="min-h-screen flex flex-col items-center text-black">
          <StylizedNav />
          
         <Socials/>

          {/* Heading */}
          <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">STORES</h1>

          {/* Layout for Categories with Background Image */}
          <div className="relative w-full max-w-8xl mb-12">
            {/* Background Image behind Buttons */}
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/store1.png')" ,backgroundSize:"cover",backgroundPosition:"center"}}></div>

            <div className="flex flex-col items-center relative z-10 p-8 md:p-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`
                    relative group 
                    whitespace-nowrap 
                    bg-gradient-to-r from-red-800 to-red-600
                    hover:from-red-800 hover:to-red-600
                    rounded-lg 
                    w-full sm:w-2/5 md:w-1/3 lg:w-1/4 h-16 
                    mb-4 
                    transition-all duration-300
                  `}
                  onClick={() => handleContinentClick(category)} // Add onClick handler
                >
                  {/* Animated background grid */}
                  <div className="absolute inset-0 bg-grid opacity-10 rounded-lg overflow-hidden animate-grid-flow"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-sm group-hover:blur-md transition-all"></div>

                  {/* Vertical bars */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-300"></span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-300"></span>

                  {/* Top light */}
                  <motion.span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 1, repeat: Infinity }}
                  ></motion.span>

                  {/* Bottom light */}
                  <motion.span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 1, repeat: Infinity }}
                  ></motion.span>

                  {/* Text */}
                  <span className="relative text-xl md:text-3xl font-bold text-white flex items-center justify-center h-full" style={{
                    textShadow: `-1px -1px 0 #000,
                                  1px -1px 0 #000,
                                  -1px 1px 0 #000,
                                  1px 1px 0 #000`
                  }}>
                    {category}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <AdsSection numOfAds={3} position="homepage"/>
      </div>
    </StoresLayout>
  );
};

export default Stores;
