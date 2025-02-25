import { Button } from "@/components/ui/button";
interface BtnProps {
  text: string; // The button's label text
  redirectTo: string; // The URL or path to redirect to
}

const Btn: React.FC<BtnProps> = ({ text, redirectTo }) => {
  return (
    // <Link href={redirectTo} className="relative group
    //       whitespace-nowrap
    //       bg-gradient-to-r from-red-800 to-red-600
    //       hover:from-red-800 hover:to-red-600
    //       rounded-lg
    //       w-2/5 h-16
    //       mb-4
    //       transition-all duration-300">
      <Button
        variant="ghost"
        className="
          relative group
          whitespace-nowrap
          bg-gradient-to-r from-red-800 to-red-600
          hover:from-red-800 hover:to-red-600
          rounded-lg
           h-16
          mb-4
          transition-all duration-300
          w-full max-w-md text-center
        "
      >

        {/* Text */}
        <span
          className="relative text-xl md:text-2xl font-bold text-white flex items-center justify-center h-full"
          style={{
            textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {text}
        </span>
      </Button>
    // </Link>
  );
};

export default Btn;
