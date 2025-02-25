import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify

// Define Types
interface Category {
  id: number;
  name: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<"create" | "delete" | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch categories.");
      toast.error("Failed to fetch categories."); // Toastify error message
    }
  };

  // Create a new category
  const createCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newCategory.trim()) {
      setError("Category name is required");
      toast.error("Category name is required"); // Toastify error message
      return;
    }
    setConfirmAction("create");
    setShowConfirmation(true);
  };

  const handleCreateConfirm = async () => {
    if (confirmAction === "create" && newCategory.trim()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_SOME_KEY}/categories`, { name: newCategory });
        setCategories((prevCategories) => [...prevCategories, response.data.category]);
        setNewCategory(""); // Clear the input field after successful creation
        setError(""); // Reset error
        toast.success("Category created successfully!"); // Toastify success message
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to create category.");
        toast.error(error.response?.data?.message || "Failed to create category."); // Toastify error message
      }
    }
    setShowConfirmation(false); // Close confirmation modal
  };

  const handleCreateCancel = () => {
    setShowConfirmation(false);
  };

  // Delete a category
  const deleteCategory = (id: number) => {
    setConfirmAction("delete");
    setCategoryToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/categories/${categoryToDelete}`);
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDelete));
        toast.success("Category deleted successfully!"); // Toastify success message
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to delete category.");
        toast.error(error.response?.data?.message || "Failed to delete category."); // Toastify error message
      }
    }
    setShowConfirmation(false); // Close confirmation modal
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  // Use effect to fetch categories on component load
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Category Manager</h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {/* Category Creation Form */}
      <form onSubmit={createCategory} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-l-lg w-1/2 text-lg"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-300">
          Create Category
        </button>
      </form>

      {/* Category List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center p-4 border-b border-gray-300">
              <span className="text-xl font-semibold text-gray-700">{category.name}</span>
              <button 
                onClick={() => deleteCategory(category.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">
              {confirmAction === "create" ? "Create Category" : "Delete Category"}
            </h3>
            <p className="mb-4">
              Are you sure you want to {confirmAction === "create" ? "create" : "delete"} this category?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmAction === "create" ? handleCreateCancel : handleDeleteCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction === "create" ? handleCreateConfirm : handleDeleteConfirm}
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

export default CategoriesPage;
