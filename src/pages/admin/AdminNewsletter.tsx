import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  country: string;
  categories: string[];
}

const StoreEmailsExport: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      country: '',
      categories: [],
    });
    const [categoryInput, setCategoryInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // Sample countries for dropdown (you might want to fetch this from an API)
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
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SOME_KEY}/admin/getStores`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            responseType: 'blob', // Important for file download
          }
        );
  
        // Create a blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formData.country} stores for ${formData.categories}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
  
      } catch (err) {
        setError(
          axios.isAxiosError(err) && err.response?.data
            ? 'Error downloading the file'
            : 'An error occurred while fetching store emails'
        );
      } finally {
        setLoading(false);
      }
    };
  
    const addCategory = () => {
      if (categoryInput.trim() && !formData.categories.includes(categoryInput.trim())) {
        setFormData({
          ...formData,
          categories: [...formData.categories, categoryInput.trim()],
        });
        setCategoryInput('');
      }
    };
  
    const removeCategory = (category: string) => {
      setFormData({
        ...formData,
        categories: formData.categories.filter((cat) => cat !== category),
      });
    };
  
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Export Store Emails</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Country Selection */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
  
          {/* Categories Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter a category"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
  
            {/* Display selected categories */}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-800"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.country || formData.categories.length === 0}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Downloading...
              </span>
            ) : (
              'Download CSV'
            )}
          </button>
        </form>
  
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    );
  };
  
  export default StoreEmailsExport;