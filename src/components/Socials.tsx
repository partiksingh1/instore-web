import { SocialIcon } from "react-social-icons";

const Socials = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full mt-2 gap-4 px-4">
      {/* First row (mobile center): 3 icons */}
      <div className="flex justify-center gap-4 w-full md:w-auto">
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://x.com/instorenetwork" />
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://facebook.com/instorenetworkuk" />
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://tiktok.com/instorenetwork" />
      </div>

      {/* Second row (mobile center): 3 icons */}
      <div className="flex justify-center gap-4 w-full md:w-auto">
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://www.youtube.com/@InstoreNetwork" />
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://www.linkedin.com/company/instore-network/" />
        <SocialIcon className="h-8 w-8 md:h-10 md:w-10" url="https://www.instagram.com/instorenetwork/" />
      </div>
    </div>
  );
};

export default Socials;
