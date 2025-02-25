import Footer from "@/components/Footer";

export default function WwsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mt-4"
        style={{ backgroundImage: "url('/wwu5.jpeg')" }}
      />
    
      {/* Arrows Container */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 md:-top-4 z-10 flex gap-2 overflow-hidden">
        <div className="text-white text-7xl font-extralight flex m-0.5">
        </div>
      </div>

      {/* Main Container with Border */}
      <div className="border-8 md:border-[18px] border-blue-700 m-2 md:m-4 p-2 md:p-4 relative rounded-lg overflow-hidden">
        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
