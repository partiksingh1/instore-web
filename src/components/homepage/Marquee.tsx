import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MarqueeProps {
  speed?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ speed = '25s' }) => {
  const [text, setText] = useState<string>('');

  // Fetch the latest ScrollBar text from the API
  const fetchLatestScrollBarText = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/scrollBar/latest`); // Update with the correct endpoint
      setText(response.data.text); // Assuming the API response contains 'text' as the field
    } catch (error) {
      console.error('Error fetching latest text:', error);
    }
  };

  // Fetch the latest ScrollBar text when the component mounts
  useEffect(() => {
    fetchLatestScrollBarText();
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        className="whitespace-nowrap animate-marquee"
        style={{
          animationDuration: speed,
        }}
      >
        <p className="text-lg font-semibold text-white">{text}</p>
      </div>
    </div>
  );
};

export default Marquee;
