import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-12 space-y-8 md:space-y-0">
      {/* Logo Section */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <img
          src="/logo.png"
          alt="Logo"
          width={200}
          height={100}
          className="w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]"
        />
      </div>

      {/* Privacy Policy, Terms & Conditions, and Copyright */}
      <div className="w-full md:w-2/3 text-lg font-bold text-center md:text-left px-2">
        <h4>
          <a href="" className="text-blue-800 underline">PRIVACY POLICY</a> |{" "}
          <a href="" className="text-blue-800 underline">TERMS & CONDITIONS</a> | Copyright Ⓒ 2025 <br />
          <span className="flex justify-center md:justify-start mt-2 md:mt-0">
            Powered by PEOPLE NOT ALGORITHMS!
          </span>
        </h4>
      </div>

      {/* Social Icons */}
      <div className="w-full flex justify-center gap-3 md:justify-end md:w-1/3">
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://x.com/instorenetwork" />
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://facebook.com/instorenetworkuk" />
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://tiktok.com/instorenetwork" />
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://www.youtube.com/@InstoreNetwork" />
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://www.linkedin.com/company/instore-network/" />
        <SocialIcon style={{ height: '40px', width: '40px' }} url="https://www.instagram.com/instorenetwork/" />
      </div>
    </div>
  );
};

export default Footer;
