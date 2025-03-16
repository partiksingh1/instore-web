import { useEffect, useState } from 'react';
import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import StoresLayout from "@/layouts/storesLayout";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Socials from '@/components/Socials';

// Define the type for the store object
interface Store {
  storeName: string;
  city: string;
  phoneNumber: string;
  facebookPage?: string;
  storeEmail?: string   // Assuming the email is sometimes null
}

const StoresCountryCategoryPage = () => {
  let { category, country } = useParams();

  // Convert category to uppercase
  let categoryH = category?.toUpperCase();

  // Add 'S' to the category if it is a singular form like 'PHONE' and make it plural
  if (categoryH === "PHONE") {
    categoryH = "PHONES";
  }

  // Convert country to uppercase
  let countryH = country?.toUpperCase();
  categoryH = categoryH?.replace(/-/g, ' ').toUpperCase();
  const [stores, setStores] = useState<Store[]>([]);
  const encodedCountry = encodeURIComponent(country || '');
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 50; // Set the number of items per page

  useEffect(() => {// Fallback to empty string if country is undefined
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/stores/${categoryH}/${encodedCountry}?page=${currentPage}&pageSize=${pageSize}`);
        const fetchedStores = Array.isArray(response.data.stores) ? response.data.stores : [];

        setStores(fetchedStores);
        setTotalPages(response.data.pagination.totalPages); // Set total pages from response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stores:", err);
        setError("Error fetching stores");
        setLoading(false);
      }
    };

    fetchStores();
  }, [category, country, currentPage]); // Add currentPage to dependencies

  // Display a loading message or error if applicable
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <h2>{error}</h2>
  //     </div>
  //   );
  // }

  return (
    <StoresLayout>
      <div>
        <div className="min-h-screen flex flex-col items-center text-black">
          <StylizedNav />
          <Socials />
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">{categoryH} STORES {countryH}</h1>
          <div className="relative w-full bg-center mb-8 min-h-screen">
            {/* Pseudo-element for background image */}
            <div
              className="mb-8 min-h-screen absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(/maps/${encodedCountry}.png)`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                opacity: 0.3, // Set the desired opacity for the background image
                zIndex: 0, // Ensure it is behind the content
              }}
            />

            {/* Content container */}
            <div className="relative z-10 w-full max-w-8x">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-6">
                {Array.isArray(stores) && stores.length > 0 ? (
                  stores.map((store, index) => (
                    <div key={index} className="p-2 bg-white rounded-lg opacity-90 border-2 border-red-500">
                      <h3 className="text-lg font-semibold mb-1">{store.storeName.toUpperCase()}</h3>
                      <p className="text-gray-600 mb-2 text-base">{store.city}</p>

                      {/* Display phone number if available */}
                      {store.phoneNumber && (
                        <p className="text-gray-700">Phone: <span className="font-semibold">{store.phoneNumber}</span></p>
                      )}

                      {/* Display Facebook page if phone number is not available or if both are available */}
                      {(!store.phoneNumber || store.storeEmail) && store.facebookPage && (
                        <p className="text-gray-700">
                          Email: <span className="font-normal">{store.storeEmail}</span>
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center w-full text-gray-600">No stores found</div>
                )}
              </div>
            </div>
          </div>


          {/* Pagination Controls */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-l"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-r"
            >
              Next
            </button>
          </div>
        </div>
        <AdsSection numOfAds={3} position="homepage"/>
      </div>
    </StoresLayout>
  );
};

export default StoresCountryCategoryPage;