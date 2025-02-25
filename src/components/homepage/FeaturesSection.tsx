import { useEffect, useState } from 'react';

const FeaturesSection = () => {
  // For triggering fade-in animation on section scroll
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('features-section');
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="features-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Core Offerings</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 ${
            isVisible ? 'animate-fadeIn' : 'opacity-0'
          }`}
        >
          {/* Feature 1 - Global Store Database */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-lg relative group">
              <img
                src="https://imgs.search.brave.com/AMmQovIar6xQUC4pXV_nbvq7b0K8s9tw1Uo7EDXzZbg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MjE4NjU1OS9waG90/by9hLWJ1c2luZXNz/LW1hbi11c2luZy1h/LWNvbXB1dGVyLXRv/LW1hbmFnZS1kb2N1/bWVudHMtb25saW5l/LWRvY3VtZW50LWNv/bW11bmljYXRpb24t/ZGF0YWJhc2UuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWxp/czhzOGdwMFk4WVhE/THE3VFNLUEZsY2NW/czE0akZleVdpTWNf/UWkwVlk9"
                alt="Global Store Database"
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Global Store Database</h3>
            <p className="text-gray-600">Access a vast collection of stores worldwide with powerful search tools.</p>
          </div>

          {/* Feature 2 - Product Listings */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-lg relative group">
              <img
                src="https://img.freepik.com/free-vector/digital-guide-abstract-concept-vector-illustration-mobile-guide-app-interactive-tour-user-manual-customer-help-brand-book-troubleshooting-information-distribution-abstract-metaphor_335657-2963.jpg?ga=GA1.1.138126306.1737391259&semt=ais_incoming" // Replace with actual image path
                alt="Product Listings"
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Product Listings</h3>
            <p className="text-gray-600">Find products from top brands across the tech, mobile, and gaming industries.</p>
          </div>

          {/* Feature 3 - Custom Video Branding */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-lg relative group">
              <img
                src="https://img.freepik.com/premium-photo/two-black-yellow-clapper-board-movie-slate-it-use-video-production-film-cinema-industry-yellow-background_335640-3764.jpg?ga=GA1.1.138126306.1737391259&semt=ais_incoming" // Replace with actual image path
                alt="Custom Video Branding"
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Custom Video Branding</h3>
            <p className="text-gray-600">Brand your business with custom video content tailored to your brand’s needs.</p>
          </div>

          {/* Feature 4 - Multilingual Emails */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-lg relative group">
              <img
                src="https://img.freepik.com/premium-photo/call-center-training-business-people-teamwork-technical-support-telemarketing-advice-help-strategy-professional-consulting-review-feedback-manager-consultant-woman-computer_590464-179328.jpg?ga=GA1.1.138126306.1737391259&semt=ais_incoming" // Replace with actual image path
                alt="Multilingual Emails"
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Marketing Support</h3>
            <p className="text-gray-600">Connect globally with customers using our multilingual email support system.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;