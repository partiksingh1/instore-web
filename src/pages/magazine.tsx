import MagazineLayout from '@/layouts/magazineLayout';
import React from 'react';
import StylizedNav from '@/components/homepage/Navbar';
import AdsSection from '@/components/homepage/AdsSection';
import Socials from '@/components/Socials';

const previousIssues = [
  { title: 'January 2025 Issue', coverImage: '/pdf1.png', link: 'https://link-to-january-2025' },
  { title: 'December 2024 Issue', coverImage: '/pdf1.png', link: 'https://link-to-december-2024' },
  { title: 'November 2024 Issue', coverImage: '/pdf1.png', link: 'https://link-to-november-2024' },
  // Add more issues here
];

const Magazine: React.FC = () => {
  return (
    <MagazineLayout>
      <div className="min-h-screen flex flex-col items-center text-black">
        <StylizedNav />
       <Socials/>

        {/* Heading */}
        <h1 className="text-4xl mt-6 md:-mt-14 sm:text-5xl md:text-6xl font-bold mb-6 text-center">MAGAZINE & BUYER’S GUIDES</h1>
        <h1 className="text-2xl sm:text-3xl font-bold text-center">LATEST ISSUE</h1>

{/* Embed Paperturn Flipbook */}
<iframe
  src="https://www.paperturn-view.com/?pid=ODg8872248&bgcolor=transparent&embed=iframe&shadow=1&flipSound=1&hardCover=1"
  width="100%"
  height="auto"
  allowFullScreen
  style={{
    border: '0px',
    maxWidth: '100%',
    display: 'block',
    backgroundColor: 'transparent',
    aspectRatio: '16/9', // Maintain 16:9 aspect ratio for responsiveness
  }}
/>

        
        {/* Previous Issues Section */}
        <div className="w-full text-center px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-6">Previous Issues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {previousIssues.map((issue, index) => (
              <div key={index} className="flex flex-col items-center">
                <a href={issue.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={issue.coverImage}
                    alt={`Cover of ${issue.title}`}
                    className="w-full h-auto object-cover mb-4 rounded-lg shadow-lg"
                    style={{ maxWidth: '300px', maxHeight: '400px' }}
                  />
                </a>
                <h3 className="text-xl font-semibold">{issue.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Informational Section */}
        <div className="relative w-full max-w-8xl mb-12 text-center p-6">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-12">
              <p className="text-xl sm:text-2xl font-bold text-center">
                Instore Network magazine is published every month in both print and digital formats.
              </p>
            </div>

            <div className="flex items-center justify-center mb-12">
              <p className="text-xl sm:text-2xl font-bold text-center">
                It contains product pricing guides, features, release schedules, product information, opinions and a news roundup across all of our main category channels: Phones, PC, Video Games, Merchandise Tech, and TCG.
              </p>
            </div>

            <div className="flex items-center justify-center mb-12">
              <p className="text-xl sm:text-2xl font-bold text-center">
                We strongly believe in maximising every opportunity, particularly in the area of GIFTING.
              </p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <p className="text-xl sm:text-2xl font-bold text-center">
                Throughout the year, there are many buying and GIFTING occasions across the world including:
              </p>
            </div>

            <div className="flex items-center justify-center mb-6 space-y-4 sm:space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-center">
                <span className="inline-block mx-2">❤️ VALENTINE’S DAY</span>
                <span className="inline-block mx-2">🌷 MOTHER’S DAY</span>
                <span className="inline-block mx-2">🐰 EASTER</span>
                <span className="inline-block mx-2">👔 FATHER’S DAY</span>
                <span className="inline-block mx-2">🌞 SUMMER HOLIDAYS</span>
                <span className="inline-block mx-2">🎃 HALLOWEEN</span>
                <span className="inline-block mx-2">🖤 BLACK FRIDAY</span>
                <span className="inline-block mx-2">🎄 CHRISTMAS</span>
              </p>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <img src="/emoji1.png" alt="Emoji" className="inline w-16 h-16 sm:w-20 sm:h-20" />
              <p className="text-xl sm:text-2xl font-bold text-center">
                And of course EVERYDAY is a BIRTHDAY!
              </p>
              <img src="/emoji1.png" alt="Birthday Emoji" className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>

          {/* Magazine Description */}
          <div className="flex items-center justify-center mb-8">
            <p className="text-xl sm:text-2xl font-bold mr-4 text-center">
              We will be producing comprehensive buyer guides for all of the major gifting celebratory occasions of the year in both digital and physical formats. The in-store videos and posters will also contain an appropriate theme for each calendar event.
            </p>
          </div>
          <div className="flex items-center justify-center mb-8">
            <p className="text-xl sm:text-2xl font-bold mr-4 text-center">
              In 2025 we will also be producing PHONE NETWORK, a dedicated magazine for all phone stores selling new and used handsets, accessories, and offering repair services.
            </p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <p className="text-xl sm:text-2xl font-bold mr-4 text-center">
              It will be published in many different languages and be available in both print and digital format through subscription.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <AdsSection numOfAds={3} position="homepage"/>
        </div>
      </div>
    </MagazineLayout>
  );
};

export default Magazine;
