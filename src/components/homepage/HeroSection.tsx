import { Button } from "../ui/button";

const HeroSection = () => (
  <section className="relative w-full h-[80vh] bg-red-600 " style={{ backgroundImage: 'url("/collage.png")' }}>
    {/* Optional Overlay */}
    <div className="absolute inset-0 bg-black opacity-75"></div>

    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4 sm:px-6 md:px-8 lg:px-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
        Welcome to Instore Network – The First B2B & B2B2C Media Platform
      </h1>
      <p className="text-lg sm:text-xl mb-6 max-w-3xl">
        Explore our global network of stores, products, and resources.
      </p>

      {/* Flex container for buttons, stack them on smaller screens */}
      <div className="space-x-4 flex flex-wrap justify-center gap-4 sm:space-x-0 sm:flex-col sm:space-y-4">
        {/* Blue Button */}
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg sm:text-xl">
          Join Our Network
        </Button>

        {/* Red Button */}
        <Button className="bg-red-600 text-white px-6 py-3 rounded-full text-lg sm:text-xl">
          Browse Stores by Category
        </Button>

        {/* White Button */}
        <Button className="bg-white text-red-600 px-6 py-3 rounded-full text-lg sm:text-xl">
          Learn More
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
