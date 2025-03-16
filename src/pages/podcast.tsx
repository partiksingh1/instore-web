import React from 'react';
import StylizedNav from '@/components/homepage/Navbar';
import AdsSection from '@/components/homepage/AdsSection';
import PodcastLayout from '@/layouts/podcastLayout';
import Socials from '@/components/Socials';

const Podcast: React.FC = () => {
    return (
        <PodcastLayout>
            <div className="min-h-screen flex flex-col items-center text-black">
                <StylizedNav />
                <Socials/>
                

                {/* Heading */}
                <h1 className="text-5xl md:text-5xl font-bold mt-4 md:-mt-12 text-center text-red-700">PODCAST</h1>
                <div className="relative w-full max-w-8xl text-center p-6 md:mt-8 ">
                    <div className="relative z-1">
                        <div className="flex items-center justify-center mb-6">
                            <p className="text-lg sm:text-2xl font-bold md:mb-14 px-4">
                                There's always plenty in store to look forward to in our official podcast.
                            </p>
                        </div>

                        <div className="flex items-center justify-center mb-12">
                            <p className="text-lg sm:text-2xl font-bold mr-4 px-4">
                                With exclusive guests and great topics, we go behind the counter to discuss all the latest trends and topics in the Phone, PC, Tech, Video Games, and TCG retail marketplace
                            </p>
                        </div>
                    </div>

                    {/* Logo and Coming Soon Section */}
                    <div className="flex items-center justify-center mb-6 flex-wrap gap-4">
                        {/* Left logo */}
                        <img src="/1roundedlogo.svg" alt="Left Logo" className="h-28 w-28 sm:h-36 sm:w-36" />

                        {/* Centered text */}
                        <h1 className="text-4xl sm:text-6xl font-bold text-center">COMING SOON</h1>

                        {/* Right logo */}
                        <img src="/1roundedlogo.svg" alt="Right Logo" className="h-28 w-28 sm:h-36 sm:w-36" />
                    </div>

                    <button className="mb-6 m-auto flex justify-center items-center bg-purple-600 text-white py-4 px-8 rounded-lg hover:bg-purple-700 transition duration-300">
                        <span className="mr-2 text-lg font-semibold">Latest Episode</span>
                        {/* SVG Play Button */}
                        <svg
                            className="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="5,3 19,12 5,21 5,3" />
                        </svg>
                    </button>

                </div>
            </div>

            {/* Ads Section */}
            <div className="mt-6">
                <AdsSection numOfAds={3} position="homepage"/>
            </div>
        </PodcastLayout>
    );
};

export default Podcast;
