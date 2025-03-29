import StylizedNav from "@/components/homepage/Navbar";
import AdsSection from "@/components/homepage/AdsSection";
import RegisterLayout from "@/layouts/registerLayout";
import Socials from "@/components/Socials";

const ContactUs = () => {

  return (
    <RegisterLayout>
      <div>
        <div className="min-h-screen flex flex-col items-center text-black">
          <StylizedNav />

         <Socials/>
         <div className="flex justify-center items-center mt-4 md:-mt-10 w-3/4">
          <img
            src="/instore-video-bg1.png"
            alt="Left Image"
            className="w-32 md:w-1/4 h-auto"
          />

          <img
            src="/adbanner1.png"
            alt="Latest"
            className="w-32 md:w-3/4 h-auto mx-4"
          />

          <img
            src="/instore-video-bg1.png"
            alt="Right Image"
            className="w-32 md:w-1/4 h-auto"
          />
        </div>
         

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mt-4 -mb-4 text-center">CONTACT</h1>

          {/* Contact Information Section */}
          <div className="w-full max-w-4xl sm:p-10 text-center">
            <div className="space-y-4">
              <p className="text-lg sm:text-xl font-semibold underline">
                CONTENT, PRESS RELEASE AND EDITORIAL ENQUIRIES TO:
              </p>
              <p className="text-lg sm:text-xl text-blue-600">
                <a href="mailto:EDITORIAL@INSTORENETWORK.COM" className="hover:underline">
                  EDITORIAL@INSTORENETWORK.COM
                </a>
              </p>

              <p className="text-lg sm:text-xl font-semibold underline">
                ADVERTISING ENQUIRIES TO:
              </p>
              <p className="text-lg sm:text-xl text-blue-600">
                <a href="mailto:ADS@INSTORENETWORK.COM" className="hover:underline">
                  ADS@INSTORENETWORK.COM
                </a>
              </p>

              <p className="text-lg sm:text-xl font-semibold underline">
                SUBSCRIPTION ENQUIRES TO:
              </p>
              <p className="text-lg sm:text-xl text-blue-600">
                <a href="mailto:SUBS@INSTORENETWORK.COM" className="hover:underline">
                  SUBS@INSTORENETWORK.COM
                </a>
              </p>

              <p className="text-lg sm:text-xl font-semibold underline">
                ALL OTHER ENQUIRIES TO:
              </p>
              <p className="text-lg sm:text-xl text-blue-600">
                <a href="mailto:HELLO@INSTORENETWORK.COM" className="hover:underline">
                  HELLO@INSTORENETWORK.COM
                </a>
              </p>

              <p className="text-lg sm:text-xl">
                +44 (0)7973 459693 |{" "}
                <a href="https://instorenetwork.com" className="text-blue-600 hover:underline">
                  INSTORENETWORK.COM
                </a>
              </p>

              <p className="text-lg sm:text-xl">
                INSTORE NETWORK, 124 CITY ROAD, LONDON, ECIV 2NX <br />
                © DIGITAL DEPOT 2024 ALL RIGHTS RESERVED
              </p>
            </div>
          </div>

          {/* Ads Section */}
          <div className="mt-14 w-full">
          <AdsSection numOfAds={6} position="homepage"/>
          </div>
        </div>
      </div>
    </RegisterLayout>
  );
};

export default ContactUs;
