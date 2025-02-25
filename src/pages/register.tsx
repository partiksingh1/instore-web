import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import RegisterLayout from "@/layouts/registerLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import Socials from "@/components/Socials";

const Register = () => {
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STORE",
    storeDetails: {
      storeName: "",
      phoneNumber: "",
      position: "",
      website: "",
      role:"",
      isVerified:false,
      facebookPage: "",
      instagramPage: "",
      tiktok: "",
      city: "",
      country: "",
      continent: "",
    },
    categories: [] as string[] || null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([] as { id: number; name: string }[]);
  const [loading, setLoading] = useState(false); // Loading state

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

  const handleStoreDetailsChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Set loading to true
        formData.role="STORE"

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/auth/register`,
        formData
      );
      toast.success("Store registered successfully");
      console.log(response.data);
      setFormData(initialFormData); // Reset form data after successful registration
    } catch (error) {
      console.error("Error registering store:", error);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    formData.role="NON_STORE"
    formData.storeDetails.position="OWNER"

    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/auth/register`,
        formData
      );
      toast.success("Store registered successfully");
      console.log(response.data);
      setFormData(initialFormData); // Reset form data after successful registration
    } catch (error) {
      console.error("Error registering store:", error);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <RegisterLayout>
      <div>
        <div className="min-h-screen flex flex-col items-center text-black">
          <StylizedNav />
          <Socials/>

          <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center">MEMBERSHIP REGISTRATION</h1>

          <div className="w-full max-w-4xl mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">STORES REGISTRATION</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-2 border rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="p-2 border rounded"
                  value={formData.storeDetails.position}
                  onChange={(e) => handleStoreDetailsChange(e, "position")}
                />
                <input
                  type="text"
                  placeholder="Store name"
                  className="p-2 border rounded"
                  value={formData.storeDetails.storeName}
                  onChange={(e) => handleStoreDetailsChange(e, "storeName")}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="p-2 border rounded"
                  value={formData.storeDetails.phoneNumber}
                  onChange={(e) => handleStoreDetailsChange(e, "phoneNumber")}
                />
                <input
                  type="text"
                  placeholder="Website"
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
                  placeholder="Facebook page"
                  className="p-2 border rounded"
                  value={formData.storeDetails.facebookPage}
                  onChange={(e) => handleStoreDetailsChange(e, "facebookPage")}
                />
                <input
                  type="text"
                  placeholder="Instagram page"
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
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="p-2 border rounded"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="p-2 border rounded"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
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

              {/* Optional extra options */}
              <div className="mt-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Would you like to be contacted by us regarding exciting offers and promotions?
                </label>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-100">
                    <span className="text-sm">I accept the</span>
                    <a href="#" className="text-blue-500 underline mx-1">Terms and Conditions</a>
                  </span>
                </label>
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

            <div className="w-full max-w-4xl mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">NON-STORES REGISTRATION</h2>
            <form className="space-y-4" onSubmit={handleSubmit2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-2 border rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Company name"
                  className="p-2 border rounded"
                  value={formData.storeDetails.storeName}
                  onChange={(e) => handleStoreDetailsChange(e, "storeName")}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="p-2 border rounded"
                  value={formData.storeDetails.phoneNumber}
                  onChange={(e) => handleStoreDetailsChange(e, "phoneNumber")}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="p-2 border rounded"
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Address"
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
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="p-2 border rounded"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="p-2 border rounded"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-100">
                    <span className="text-sm">I accept the</span>
                    <a href="#" className="text-blue-500 underline mx-1">I accept to the Terms and Conditions</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className={`mt-6 px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white rounded hover:bg-blue-700`}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Submitting..." : "Submit Non-Store Registration"}
              </button>
            </form>
          </div>

          <div className="mt-24">
            <AdsSection />
          </div>
        </div>
      </div>
    </RegisterLayout>
  );
};

export default Register;