import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-12 space-y-8 md:space-y-0">
      {/* Logo Section */}
      <div className="w-1/2 flex justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-full max-w-[100px] md:max-w-[200px] lg:max-w-[200px] xl:max-w-[300px]"
        />
      </div>

      {/* Privacy Policy, Terms & Conditions, and Copyright */}
      <div className="w-full text-lg font-bold text-center">
        <h4>
          <a href="" className="text-blue-800 underline">PRIVACY POLICY</a> |{" "}
          <a href="" className="text-blue-800 underline">TERMS & CONDITIONS</a> | Copyright Ⓒ 2025 <br />
          <span className="flex justify-center mt-2">
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
