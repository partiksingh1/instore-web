import { useState, useEffect } from "react";
import StylizedNav from "@/components/homepage/Navbar";
import LatestLayout from "@/layouts/latestLayout";
import axios from "axios";
import Socials from "@/components/Socials";

const NetworkPremiere = () => {
    const [newsletters, setNewsletters] = useState<any[]>([]); // State to store fetched newsletters
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const extractYouTubeID = (url: string): string => {
        const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : '';
    };


    useEffect(() => {
        // Fetch newsletters when component mounts
        const fetchNewsletters = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/premiere`);
                setNewsletters(response.data); // Store newsletters in state
            } catch (error) {
                console.error("Error fetching premiere:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        fetchNewsletters();
    }, []);

    return (
        <LatestLayout>
            <div className="min-h-screen flex flex-col items-center text-black font-mono">
                <StylizedNav />

                {/* Social Media Icons Section */}
                <Socials />

                {/* Heading */}
                <div className="flex justify-center mt-4 md:-mt-12">
                    <img
                        src="/adbanner1.png"
                        alt="Latest"
                        className="w-32 md:w-3/4 h-auto"
                    />
                </div>
                <h1 className="text-5xl md:text-5xl font-bold mt-4 text-center">NETWORK PREMIERE</h1>
                <div className="flex w-1/2 justify-center">
                    <img
                        src="/premiereLogo.png"
                        alt="Latest"
                        className="w-32 md:w-3/4 h-auto m-5 border-black border-2"
                    />
                    <img
                        src="/premiereLogo.png"
                        alt="Latest"
                        className="w-32 md:w-3/4 h-auto m-5 border-black border-2"
                    />
                </div>

                <div className="flex">
                    <div className="h-full w-full">
                        {/* Newsletters Section with Background Images */}
                        <div className="relative w-full mt-2 mb-12 text-center p-6">
                            {loading ? (
                                <div className="text-center text-xl">Loading Network Premiere...</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {newsletters.map((newsletter) => (
                                        <div key={newsletter.id} className="overflow-hidden mb-10 w-full max-w-xl mx-auto">
                                            <div className="flex flex-col border-2 border-black">
                                                <div className="h-1/2 p-2 bg-white flex flex-col justify-between  border-black">
                                                    <h3 className="text-lg sm:text-xl font-semibold my-3">{newsletter.title}</h3>
                                                    <p className="text-sm sm:text-base text-gray-700 flex-1 overflow-hidden text-ellipsis my-3">{newsletter.description}</p>
                                                </div>
                                                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                                    <iframe
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        src={`https://www.youtube.com/embed/${extractYouTubeID(newsletter.url)}`}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>


                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LatestLayout>
    );
};

export default NetworkPremiere;
