import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from "lucide-react";

const StylizedNav: React.FC = () => {
  const [navItems] = useState<{ label: JSX.Element | string; path: string }[]>([
    { label: <Home className='text-red-800 w-12 h-12' size={32}/>, path: "/" },
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SOME_KEY}/categories`);
        const data = await response.json();
        if (data.message === "categories fetched") {
          const items = data.categories.map((category: { name: string; }) => ({
            label: category.name,
            path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}` // Create a path based on the category name
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
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className="p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Render static items */}
        {[...navItems.slice(0, 3), ...dynamicItems, ...navItems.slice(2)].map((item, index) => (
          <motion.div
            key={item.path}
            onHoverStart={() => setHoveredItem(index)}
            onHoverEnd={() => setHoveredItem(null)}
            className="relative"
          >
<Button
  variant="ghost"
  onClick={() => handleNavClick(item.path)} 
  className={`
    relative group 
    whitespace-nowrap 
    bg-gradient-to-r from-blue-600 to-blue-400
    hover:from-blue-700 hover:to-blue-500 px-6 py-1
    transition-all duration-300
    ${hoveredItem === index ? 'scale-105' : ''}
    rounded-none  /* Ensure no rounding of the button */
  `}
>
  {/* Animated background grid */}
  <div className="absolute inset-0 bg-grid opacity-10 overflow-hidden animate-grid-flow"></div>
  
  {/* Glow effect */}
  <div className="absolute inset-0 bg-blue-400/20 blur-sm group-hover:blur-md transition-all"></div>

  {/* Vertical bars */}
  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-300"></span>
  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-2/3 bg-white/30 group-hover:h-full transition-all duration-300"></span>

  {/* Top light */}
  <motion.span
    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white opacity-0 group-hover:opacity-100"
    animate={hoveredItem === index ? { scale: [1, 1.5, 1] } : {}}
    transition={{ duration: 1, repeat: Infinity }}
  ></motion.span>

  {/* Bottom light */}
  <motion.span
    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white  opacity-0 group-hover:opacity-100"
    animate={hoveredItem === index ? { scale: [1, 1.5, 1] } : {}}
    transition={{ duration: 1, repeat: Infinity }}
  ></motion.span>

  {/* Text */}
  <span className="relative text-xl font-bold text-white" style={{
    textShadow: `-1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000`
  }}>
    {item.label}
    <motion.span
      className="absolute inset-0 text-blue-200 opacity-0 filter blur-sm"
      animate={hoveredItem === index ? { opacity: 0.5 } : {}}
    >
      {item.label}
    </motion.span>
  </span>
</Button>


            {/* Hover indicator */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredItem === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 32px 32px; }
        }
        .animate-grid-flow {
          animation: grid-flow 3s linear infinite;
        }
        .bg-grid {
          background-size: 16px 16px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </nav>
  );
};

export default StylizedNav;