import { useState, useEffect } from "react";
import StylizedNav from "@/components/homepage/Navbar";
import Btn from "./Button";
import PhonesLayout from "@/layouts/phonesLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Socials from "@/components/Socials";
import AdsSection from "@/components/homepage/AdsSection";

const Phones = () => {
  const { category } = useParams();
  let categoryH = category?.replace(/-/g, " ").toUpperCase();
  const [products, setProducts] = useState<any[]>([]);

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


        {/* Layout for Products with Background Image */}
        <div className="relative w-full bg-center min-h-screen flex items-center justify-center">
          {/* Background Image behind Buttons */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url('/store1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>

          <div className="relative z-10 p-2 w-full flex">
            {/* Conditional Layout */}
            {products.length < 10 ? (
              <div className="flex flex-col items-center w-full gap-8">
                {products.map((product) => (
                  <Btn
                    key={product.id}
                    text={product.name}
                    redirectTo={`/accessories/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {products.map((product) => (
                  <Btn
                    key={product.id}
                    text={product.name}
                    redirectTo={`/accessories/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mb-10">
        <AdsSection numOfAds={6} position="homepage"/>
        </div>
      </div>
    </PhonesLayout>
  );
};

export default Phones;
