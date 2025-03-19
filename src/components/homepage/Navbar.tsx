import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from "lucide-react";

const StylizedNav: React.FC = () => {
  const [navItems] = useState<{ label: JSX.Element | string; path: string }[]>([
    { label: <Home className='text-red-700' size={30} />, path: "/" },
    { label: "LATEST", path: "/latest" },
    { label: "MAGAZINE & BUYER'S GUIDES", path: "/magazine" },
    { label: "STORES", path: "/stores" },
    { label: "WHOLESALERS & DISTRIBUTORS", path: "/WandD" },
    { label: "STORE WINDOW", path: "/store-window" },
    { label: "DEMO DAYS", path: "/demo-days" },
    { label: "IN-STORE VIDEO", path: "/instore-video" },
    { label: "POSTERS", path: "/posters" },
    { label: "PODCAST", path: "/podcast" },
    { label: "ABOUT US", path: "/aboutus" },
    { label: "WORK WITH US", path: "/work-with-us" },
    { label: "CONTACT", path: "/contact" },
    { label: "MEMBERSHIP REGISTRATION", path: "/register" },
    { label: "MEMBERS LOG-IN", path: "/login" },
  ]);

  const [dynamicItems, setDynamicItems] = useState<{ label: string; path: string }[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();  // Get the current location (path)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SOME_KEY}/categories`);
        const data = await response.json();
        if (data.message === "categories fetched") {
          const items = data.categories.map((category: { name: string; }) => ({
            label: category.name,
            path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}`
          }));
          setDynamicItems(items);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);  // Navigate to the specified path
  };

  return (
    <nav className="p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Render static items */}
        {[...navItems.slice(0, 3), ...dynamicItems, ...navItems.slice(3)].map((item, index) => (
          <motion.div
            key={item.path}
            onHoverStart={() => setHoveredItem(index)}
            onHoverEnd={() => setHoveredItem(null)}
            className="relative"
          >
            <button
              onClick={() => handleNavClick(item.path)}
              className={`
                ${item.path === location.pathname ? 'bg-red-700' : 'bg-blue-600'} 
                text-white 
                px-6 py-2 rounded-md 
                transition-all duration-300
                ${hoveredItem === index ? 'scale-105' : ''}  {/* Keep hover scaling effect */}
              `}
            >
              {/* Text */}
              <span className="relative text-xl font-bold">
                {item.label}
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default StylizedNav;
