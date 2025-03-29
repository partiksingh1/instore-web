import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const AdminAddStore = () => {
  const countries = [
    "afghanistan",
    "albania",
    "algeria",
    "andorra",
    "angola",
    "antigua and barbuda",
    "argentina",
    "armenia",
    "australia",
    "austria",
    "azerbaijan",
    "the bahamas",
    "bahrain",
    "bangladesh",
    "barbados",
    "belarus",
    "belgium",
    "belize",
    "benin",
    "bhutan",
    "bolivia",
    "bosnia and herzegovina",
    "botswana",
    "brazil",
    "brunei",
    "bulgaria",
    "burkina faso",
    "burundi",
    "cabo verde",
    "cambodia",
    "cameroon",
    "canada",
    "central african republic",
    "chad",
    "chile",
    "china",
    "colombia",
    "comoros",
    "congo, democratic republic of the",
    "congo, republic of the",
    "costa rica",
    "côte d’ivoire",
    "croatia",
    "cuba",
    "cyprus",
    "czech republic",
    "denmark",
    "djibouti",
    "dominica",
    "dominican republic",
    "east timor (timor-leste)",
    "ecuador",
    "egypt",
    "el salvador",
    "equatorial guinea",
    "eritrea",
    "estonia",
    "eswatini",
    "ethiopia",
    "fiji",
    "finland",
    "france",
    "gabon",
    "the gambia",
    "georgia",
    "germany",
    "ghana",
    "greece",
    "grenada",
    "guatemala",
    "guinea",
    "guinea-bissau",
    "guyana",
    "haiti",
    "honduras",
    "hungary",
    "iceland",
    "india",
    "indonesia",
    "iran",
    "iraq",
    "ireland",
    "israel",
    "italy",
    "jamaica",
    "japan",
    "jordan",
    "kazakhstan",
    "kenya",
    "kiribati",
    "korea, north",
    "korea, south",
    "kosovo",
    "kuwait",
    "kyrgyzstan",
    "laos",
    "latvia",
    "lebanon",
    "lesotho",
    "liberia",
    "libya",
    "liechtenstein",
    "lithuania",
    "luxembourg",
    "madagascar",
    "malawi",
    "malaysia",
    "maldives",
    "mali",
    "malta",
    "marshall islands",
    "mauritania",
    "mauritius",
    "mexico",
    "micronesia, federated states of",
    "moldova",
    "monaco",
    "mongolia",
    "montenegro",
    "morocco",
    "mozambique",
    "myanmar (burma)",
    "namibia",
    "nauru",
    "nepal",
    "netherlands",
    "new zealand",
    "nicaragua",
    "niger",
    "nigeria",
    "north macedonia",
    "norway",
    "oman",
    "pakistan",
    "palau",
    "panama",
    "papua new guinea",
    "paraguay",
    "peru",
    "philippines",
    "poland",
    "portugal",
    "qatar",
    "romania",
    "russia",
    "rwanda",
    "saint kitts and nevis",
    "saint lucia",
    "saint vincent and the grenadines",
    "samoa",
    "san marino",
    "sao tome and principe",
    "saudi arabia",
    "senegal",
    "serbia",
    "seychelles",
    "sierra leone",
    "singapore",
    "slovakia",
    "slovenia",
    "solomon islands",
    "somalia",
    "south africa",
    "spain",
    "sri lanka",
    "sudan",
    "sudan, south",
    "suriname",
    "sweden",
    "switzerland",
    "syria",
    "taiwan",
    "tajikistan",
    "tanzania",
    "thailand",
    "togo",
    "tonga",
    "trinidad and tobago",
    "tunisia",
    "turkey",
    "turkmenistan",
    "tuvalu",
    "uganda",
    "ukraine",
    "united arab emirates",
    "united kingdom",
    "united states",
    "uruguay",
    "uzbekistan",
    "vanuatu",
    "vatican city",
    "venezuela",
    "vietnam",
    "yemen",
    "zambia",
    "zimbabwe"
  ]
  
  const continents = [
    "africa",
    "asia",
    "europe",
    "north america",
    "oceania",
    "south america",
    "antarctica",
  ]

  const initialFormData = {
    name: "owner",
    email: "",
    role:"STORE",
    password:"testing",
    storeDetails: {
      storeName: "",
      phoneNumber: "",
      position: "owner",
      website: "",
      role:"STORE",
      facebookPage: "",
      instagramPage: "",
      tiktok: "",
      city: "",
      country: "",
      continent: "",
    },
    categories: [] as string[],
  };
  const [unverifiedStores, setUnverifiedStores] = useState([] as any[]);
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([] as { id: number; name: string }[]);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();
   // Fetch unverified stores
   useEffect(() => {
    const fetchUnverifiedStores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/stores/unverified`);
        setUnverifiedStores(response.data.stores);
      } catch (error) {
        console.error('Error fetching unverified stores:', error);
        toast.error('Error fetching unverified stores');
      }
    };

    fetchUnverifiedStores();
  }, []);

  // Verify store handler
  const handleVerifyStore = async (storeId: number) => {
    setLoading(true);

    try {
      const response = await axios.put(`${import.meta.env.VITE_SOME_KEY}/admin/store/${storeId}/verify`);
      toast.success(response.data.message);

      // Refresh the list of unverified stores after verifying
      setUnverifiedStores(unverifiedStores.filter((store: any) => store.id !== storeId));
    } catch (error) {
      console.error('Error verifying store:', error);
      toast.error('Error verifying store');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/categories`);
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStoreDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      storeDetails: {
        ...prevState.storeDetails,
        [field]: value,
      },
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newCategories = checked
        ? [...prevState.categories, value]
        : prevState.categories.filter((category) => category !== value);

      return {
        ...prevState,
        categories: newCategories,
      };
    });
  };

  const handleSubmit = async () => {

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SOME_KEY}/auth/adminRegister`, formData);
      toast.success("Store added successfully!");
      console.log(response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding store:", error);
      toast.error("Error adding store!");
    } finally {
      setLoading(false);
      setShowConfirmationModal(false); // Close confirmation modal
    }
  };

  const handleConfirmSubmission = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center text-black">
      <h1 className="text-5xl font-bold mt-4">ADMIN STORE REGISTRATION</h1>

      <div className="w-full max-w-4xl mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Add New Store</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmSubmission();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Store Name"
              className="p-2 border rounded"
              value={formData.storeDetails.storeName}
              onChange={(e) => handleStoreDetailsChange(e, "storeName")}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="p-2 border rounded"
              value={formData.storeDetails.phoneNumber}
              onChange={(e) => handleStoreDetailsChange(e, "phoneNumber")}
            />
            <input
              type="text"
              placeholder="Website URL"
              className="p-2 border rounded"
              value={formData.storeDetails.website}
              onChange={(e) => handleStoreDetailsChange(e, "website")}
            />
            <input
              type="email"
              name="email"
              placeholder="Store Email"
              className="p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Facebook Page"
              className="p-2 border rounded"
              value={formData.storeDetails.facebookPage}
              onChange={(e) => handleStoreDetailsChange(e, "facebookPage")}
            />
            <input
              type="text"
              placeholder="Instagram Page"
              className="p-2 border rounded"
              value={formData.storeDetails.instagramPage}
              onChange={(e) => handleStoreDetailsChange(e, "instagramPage")}
            />
            <input
              type="text"
              placeholder="TikTok"
              className="p-2 border rounded"
              value={formData.storeDetails.tiktok}
              onChange={(e) => handleStoreDetailsChange(e, "tiktok")}
            />
            <input
              type="text"
              placeholder="City"
              className="p-2 border rounded"
              value={formData.storeDetails.city}
              onChange={(e) => handleStoreDetailsChange(e, "city")}
            />
            <select
              className="p-2 border rounded"
              value={formData.storeDetails.country}
              onChange={(e) => handleStoreDetailsChange(e, "country")}
            >
              <option value="" disabled>Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded"
              value={formData.storeDetails.continent}
              onChange={(e) => handleStoreDetailsChange(e, "continent")}
            >
              <option value="" disabled>Select Continent</option>
              {continents.map((continent) => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Store Categories (tick box)</h3>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={category.name}
                    checked={formData.categories.includes(category.name)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`mt-6 px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded hover:bg-blue-700`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit Store Registration"}
          </button>
        </form>
      </div>
      <div className="min-h-screen flex flex-col items-center text-black">
      <h1 className="text-5xl font-bold mt-4">Unverified Stores</h1>

      <div className="w-full max-w-6xl mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">List of Unverified Stores</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {unverifiedStores.length === 0 ? (
            <div className="col-span-3 text-center text-xl">No unverified stores</div>
          ) : (
            unverifiedStores.map((store: any) => (
              <div key={store.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                  <span className="font-semibold">Store Name:</span>
                  <p>{store.storeName}</p>
                </div>
                <div>
                  <span className="font-semibold">Store Email:</span>
                  <p>{store.storeEmail}</p>
                </div>
                <div>
                  <span className="font-semibold">Store City:</span>
                  <p>{store.city || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-semibold">Store Country:</span>
                  <p>{store.country}, {store.continent}</p>
                </div>
                <div>
                  <span className="font-semibold">Store Phone Number:</span>
                  <p>{store.phoneNumber || 'N/A'}</p>
                </div>

                <div>
                  <span className="font-semibold">Facebook:</span>
                  <p>
                    {store.facebookPage ? (
                      <a href={store.facebookPage} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Facebook
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>

                <div>
                  <span className="font-semibold">Instagram:</span>
                  <p>
                    {store.instagramPage ? (
                      <a href={store.instagramPage} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Instagram
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>

                <div>
                  <span className="font-semibold">Categories:</span>
                  <p>
                    {store.categories.length > 0 ? (
                      store.categories.map((storeCategory: any, index: number) => (
                        <span key={storeCategory.category.id}>
                          {storeCategory.category.name}
                          {index < store.categories.length - 1 && ', '}
                        </span>
                      ))
                    ) : (
                      'No Categories'
                    )}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleVerifyStore(store.id)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Confirm Submission</h3>
            <p className="mb-4">Are you sure you want to submit the store details?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseConfirmationModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddStore;