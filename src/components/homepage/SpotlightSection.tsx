import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SpotlightSection = ({ borderFrame = "/border.svg" }) => {
  const [product, setProduct] = useState<any>(null); // State to store the fetched product

  useEffect(() => {
    // Fetch the first product from the API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/windows`);
        if (response.data.success && response.data.data.length > 0) {
          setProduct(response.data.data[0]); // Set the first product
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="relative max-w-full mx-auto my-20 px-4 sm:px-6 lg:px-8">
        <p>Loading...</p>
      </div>
    );
  }

  // Check if the product image URL is a video
  const isVideo = product.imageUrl?.endsWith(".mp4") || product.imageUrl?.endsWith(".webm");

  return (
    <div className="relative max-w-full mx-auto my-20 px-4 sm:px-6 lg:px-8">
      {/* External Border Frame */}
      <img
        src={borderFrame}
        alt="Border Frame"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none scale-[1.6] hidden md:block"
      />

      <section className="relative overflow-hidden border-[20px] border-red-500 md:border-0 rounded-lg">
        {/* SpotlightSection content */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Content */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start space-y-8 md:space-y-0">

            {/* Image or Video Section */}
            <motion.div
              className="md:w-2/5 flex justify-center md:justify-end"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative group flex justify-center items-center h-full">
                {/* Gradient effect */}
                <div className="absolute -inset-1  rounded-lg transition duration-1000"></div>

                {/* Conditionally Render Image or Video */}
                {isVideo ? (
                  <video
                    src={product.imageUrl} // Use the fetched product's video URL
                    className="mt-20 relative rounded-lg shadow-2xl object-cover transform group-hover:scale-[1.10] transition duration-500"
                    width={300}
                    height={200}
                    controls
                    loop
                    playsInline
                    muted
                  />
                ) : (
                  <img
                    src={product.imageUrl} // Use the fetched product's image URL
                    alt={product.title}
                    className="relative rounded-lg shadow-2xl object-cover transform group-hover:scale-[1.10] transition duration-500"
                    width={300}
                    height={200}
                  />
                )}
              </div>

            </motion.div>

            {/* Content Section */}
            <motion.div
              className="flex flex-col md:w-1/2 space-y-6 p-5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4 self-center text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-extrabold text-black">
                  {product.title} {/* Use the fetched product's title */}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-black leading-relaxed">
                {product.description} {/* Use the fetched product's description */}
              </p>

              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <button className="group relative inline-flex overflow-hidden rounded-lg bg-red-500 self-center md:self-start">
                  <span className="relative rounded-md bg-black text-white px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-white group-hover:text-black">
                    View Details
                  </span>
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpotlightSection;
