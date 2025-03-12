import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { useNavigate } from 'react-router-dom'; // For routing
import { toast } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Include the CSS for Toastify
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT
import AdsSection from '@/components/homepage/AdsSection';
import RegisterLayout from '@/layouts/registerLayout';
import StylizedNav from '@/components/homepage/Navbar';
import Socials from '@/components/Socials';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [userName, setUserName] = useState<string | null>(null); // State to store the username
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the token to get user information
      const decodedToken: any = jwtDecode(token);
      setUserName(decodedToken.name); // Set the user's name from the token
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Show loading state

    try {
      const response = await axios.post(`${import.meta.env.VITE_SOME_KEY}/auth/login`, { email, password });

      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', response.data.token);
        toast.success('Login successful! Redirecting...'); // Success notification
        // Decode the token to get user information
        const decodedToken: any = jwtDecode(response.data.token);
        setUserName(decodedToken.name); // Set the user's name from the token
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong!');
      toast.error('Login failed. Please try again.'); // Error notification
    } finally {
      setLoading(false); // Hide loading state after request completion
    }
  };

  // Logout function
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    setUserName(null); // Clear the userName state
    toast.info('You have logged out successfully.'); // Logout success notification
    // Redirect to login page or home page
    navigate('/login');
  };

  return (
    <RegisterLayout>
      <div className="min-h-screen flex flex-col items-center text-black px-4">
        <StylizedNav />
        <Socials />

        <h1 className="text-4xl md:text-5xl font-bold mt-6 md:-mt-12 text-center">MEMBER LOG-IN</h1>

        {/* Display Welcome Message if User is Logged In */}
        {userName ? (
          <div className="text-2xl text-green-600 flex flex-col items-center">
            <div>Welcome, {userName}! You are logged in.</div>
            {/* Display logout button below the text */}
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className="text-2xl text-gray-600"></div>
        )}

        {/* Login Form */}
        {!userName && (
          <div className="w-full sm:w-4/5 md:w-1/2 max-w-4xl mt-12 p-6 bg-red-600 rounded-lg shadow-md">
            <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
              {/* Email and Password Inputs */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 border rounded w-full"
                disabled={loading}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="p-2 border rounded w-full"
                disabled={loading}
              />

              {/* Error Message */}
              {error && <div className="text-red-600">{error}</div>}

              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-white rounded hover:bg-blue-700 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOG-IN'}
              </button>
            </form>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-14 w-full">
        <AdsSection numOfAds={3} />
        </div>
      </div>

      {/* Toastify container for notifications */}
    </RegisterLayout>
  );
};

export default Login;
