import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // added state for category ID
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>("");
  const [brandUrl, setBrandUrl] = useState<string>("");
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Failed to fetch categories.");
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch products whenever selected category changes
  useEffect(() => {
    if (selectedCategoryName) {
      fetchProductsByCategory(selectedCategoryName);
    }
  }, [selectedCategoryName]);

  const fetchProductsByCategory = async (categoryName: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/category/${categoryName}/products`);
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to fetch products for the selected category.");
    }
  };
  const onSubmit = async () => {
    if (!productName || !selectedCategoryName) {
      toast.error("Please fill out both product name and category.");
      return;
    }
  
    setLoading(true);
    try {
      const productData = {
        name: productName.toUpperCase(),
        brandUrl: brandUrl,
        categoryId: selectedCategoryId, // Pass the categoryId here
      };
  
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/products`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      toast.success("Product created successfully");
      fetchProductsByCategory(selectedCategoryName || ""); // Provide default value here
      resetForm(); // Reset the form
    } catch (error) {
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setProductName("");
    setSelectedCategoryId(null);
    setBrandUrl("");
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    if (deleteId !== null && selectedCategoryName) {
      try {
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/products/${deleteId}`);
        toast.success("Product deleted successfully");
        fetchProductsByCategory(selectedCategoryName); // Reload products after deletion
      } catch (error) {
        toast.error("Error deleting product");
      } finally {
        closeDeleteModal();
      }
    }
  };

  useEffect(() => {
    // Check if the user has the 'ADMIN' role
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    setSelectedCategoryName(categoryName);

    // Find the categoryId based on the selected categoryName
    const selectedCategory = categories.find((category) => category.name === categoryName);
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory.id); // Set the categoryId based on the selected category
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {/* Create Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">Create a New Product</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brandUrl" className="block text-gray-700 font-medium">Brand URL</label>
          <input
            type="text"
            id="brandUrl"
            placeholder="Enter Brand URL"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={brandUrl}
            onChange={(e) => setBrandUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium">Category</label>
          <select
            id="category"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={selectedCategoryName || ""}
            onChange={handleCategoryChange} // Update category change logic
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>

      {/* Select Category */}
      <div className="mb-6">
        <label htmlFor="category" className="text-3xl font-bold text-center mb-6 block text-gray-700">SELECT PRODUCTS FROM CATEGORY</label>
        <select
          id="category"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={selectedCategoryName || ""}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* List Products */}
      <h3 className="text-2xl font-semibold mb-4">Product List</h3>
      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
  <div>
    <a
      href={product.brandUrl}  // Redirects to the brand URL
      target="_blank"           // Opens in a new tab
      rel="noopener noreferrer" // Security measure to prevent reverse tabnabbing
      className="text-xl hover:underline"
    >
      <strong>{product.name}</strong>
    </a>
  </div>
              <button
                onClick={() => openDeleteModal(product.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this product?</h2>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
