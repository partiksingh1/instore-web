import { useState, useEffect } from "react";
import StylizedNav from "@/components/homepage/Navbar";
import PhonesLayout from "@/layouts/phonesLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Socials from "@/components/Socials";
import AdsSection from "@/components/homepage/AdsSection";
import SpotlightSection from "@/components/homepage/SpotlightSection";

const StoreWindow = () => {
  const { category } = useParams();
  let categoryH = category?.replace(/-/g, " ").toUpperCase();
  const [,setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([]);
        const response = await axios.get(
          `${import.meta.env.VITE_SOME_KEY}/admin/category/${categoryH}/products`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryH) {
      fetchProducts();
    }
  }, [categoryH]);

  return (
    <PhonesLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />
        <Socials />

        {/* Heading */}
        {/* <h1 className="text-5xl font-bold mb-8 mt-8 md:-mt-12 text-center">{categoryH}</h1> */}
        <div className="flex justify-center mt-4 md:-mt-12">
          <img
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto"
          />
        </div>
        <div className="m-20 p-20 -mt-14">
              <SpotlightSection />
            </div>
        <div className="flex justify-center mb-10">
        <AdsSection numOfAds={6} position="homepage"/>
        </div>
      </div>
    </PhonesLayout>
  );
};

export default StoreWindow;
