import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,

  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const SimpleHeader = () => {
  return (
    <header className="bg-custom-dark text-white shadow-md flex flex-wrap flex-col lg:flex-row justify-between items-center  pl-14 pr-14 pt-2 pb-2 rounded-b-lg w-full mb-4 ">
      {/* Left side: Location and Email */}
      <div className="flex flex-wrap  md:flex-row md:space-x-6 justify-center items-center">
        {/* Location */}
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-white w-6 h-4" />
          <span className="text-white text-[12px] md:text-[13px] font-semibold text-center">
            31 Buckingham ST SW Grand Rapids, MI 49548
          </span>
        </div>
        <span className="hidden md:inline">|</span>
        {/* Email */}
        <div className="flex gap-2 justify-center items-center ml-4">
          <FaEnvelope className="text-white w-6 h-4" />
          <span className="text-white text-[12px] md:text-[13px] font-semibold">
            abyridellc@gmail.com
          </span>
        </div>
      </div>

      {/* Right side: Telephone and Social Media */}
      <div className=" flex flex-wrap  md:flex-row space-x-6 items-center ">
        {/* Telephone */}
        <div className="  flex items-center space-x-2 ">
          <FaPhoneAlt className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4" />
          <span className="text-white text-[11px] sm:text-[12px] md:text-[13px] font-semibold">
            +1 (616) 633 7026
          </span>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-2">
          <a href="https://x.com/AbyrideLLC" className="text-white">
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/abyride_llc"
            className="text-white"
          >
            <FaInstagram className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/company/abyride"
            className="text-white"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a href="https://www.youtube.com/@abyride2847" className="text-white">
            <FaYoutube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
