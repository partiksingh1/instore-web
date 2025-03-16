import { useState, useEffect } from "react";
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import Btn from "./Button";
import PhonesLayout from "@/layouts/phonesLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Socials from "@/components/Socials";

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
        <h1 className="text-5xl font-bold mb-8 mt-8 md:-mt-12 text-center">{categoryH}</h1>

        {/* Layout for Products with Background Image */}
        <div className="relative w-full bg-center mb-8 min-h-screen flex items-center justify-center">
          {/* Background Image behind Buttons */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url('/store1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>

          <div className="relative z-10 p-2 md:p-12 w-full flex justify-center">
            {/* Conditional Layout */}
            {products.length < 10 ? (
              <div className="flex flex-col -mt-56 md:-mt-32 items-center gap-4 md:p-0 w-full max-w-sm mx-auto">
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

        {/* Ads Section */}
        <div className="-mt-10">
        <AdsSection numOfAds={3} position="homepage"/>
        </div>
      </div>
    </PhonesLayout>
  );
};

export default Phones;
