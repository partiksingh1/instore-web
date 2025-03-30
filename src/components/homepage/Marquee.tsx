import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = '25s' }) => {
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
