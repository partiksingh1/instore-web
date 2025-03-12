import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useNavigate, useParams } from 'react-router-dom';
import Socials from "@/components/Socials";
const Africa = () => {
    const countriesInAsia = [
        "ALGERIA",
        "ANGOLA",
        "BENIN",
        "BOTSWANA",
        "BURKINA FASO",
        "BURUNDI",
        "CABO VERDE",
        "CAMEROON",
        "C.A.R",
        "CHAD",
        "COMOROS",
        "CONGO REPUBLIC",
        "COTE D’IVOIRE",
        "DJIBOUTI",
        "EGYPT",
        "EQUATORIAL GUINEA",
        "ERITREA",
        "ESWANTI",
        "ETHIOPIA",
        "GABON",
        "GAMBIA",
        "GHANA",
        "GUINEA",
        "GUINEA-BISSAU",
        "KENYA",
        "LESOTHO",
        "LIBERIA",
        "LIBYA",
        "MADAGASCAR",
        "MALAWI",
        "MALI",
        "MAURITANIA",
        "MAURITIUS",
        "MOROCCO",
        "MOZAMBIQUE",
        "NAMIBIA",
        "NIGER",
        "NIGERIA",
        "RWANDA",
        "SAO TOME & PRINCIPE",
        "SENEGAL",
        "SEYCHELLES",
        "SIERRA LEONE",
        "SOMALIA",
        "SOUTH AFRICA",
        "SOUTH SUDAN",
        "SUDAN",
        "TANZANIA",
        "TOGO",
        "TUNISIA",
        "UGANDA",
        "ZAMBIA",
        "ZIMBABWE"
      ];      
      const navigate = useNavigate();
      const { category,stores } = useParams(); 

  const handleCountryClick = (country: string) => {
    let formattedCountry = country.toLowerCase();
    navigate(`/${stores}/${category}/africa/${formattedCountry}`);
};


  return (
    <StoresLayout>
        <div>
      <div className="min-h-screen flex flex-col items-center text-black">
      <StylizedNav/>
      <Socials/>
      {/* Heading */}
      <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">AFRICA</h1>

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
                <span className="relative text-2xl font-bold text-white flex items-center justify-center h-full" style={{
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
    <AdsSection numOfAds={3}/>

    </StoresLayout>
  );
};

export default Africa;