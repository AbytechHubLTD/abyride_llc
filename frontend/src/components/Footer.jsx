import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "../assets/css/ContactUs.css";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusedInput = () => {
    setIsFocused(true);
  };

  const handleBlurredInput = () => {
    setIsFocused(false);
  };

  return (
    <footer className="bg-[#293751] text-white py-16 px-6 sm:px-16 rounded-t-xl shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Logo Section */}
        <div className="w-full lg:w-2/5">
          <img src={Logo} alt="Logo" className="w-14 mb-4" />
          <p className="text-white font-semibold">
            Thank you for visiting our website! Stay connected <br /> and reach
            out to us on social media.
          </p>
          <a
  href="https://wa.me/16166337026?text=Hi, how can I get more information on your service?"
  target="_blank"
  rel="noopener noreferrer"
  className="flex w-[40%] items-center mt-8  bg-[#47B2E4] text-sm text-white py-3 px-6 rounded-full"
>
  <FaWhatsapp className="text-white mr-2" />
  <span className="font-semibold">+1 (616) 633 7026</span>
</a>

        </div>

        {/* Navigation Sections */}
        <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Our Services */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[#47B2E4] transition"
                >
                  Transportation Service
                </Link>
              </li>
              <li>
                <Link
                  to="/services/home-care"
                  className="text-gray-300 hover:text-[#47B2E4] transition"
                >
                  Home Care Service
                </Link>
              </li>
              <li>
                <Link
                  to="/services/language-translation"
                  className="text-gray-300 hover:text-[#47B2E4] transition"
                >
                  Language Translation
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/history"
                  className="text-gray-300 hover:text-[#47B2E4] transition"
                >
                  Our History
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-[#47B2E4] transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-semibold text-xl mb-4">
              Stay Connected with Us
            </h3>
            <p className="text-gray-300 mb-4">
              Stay connected with us to get the latest updates and exciting
              news!
            </p>
            <div className="flex space-x-4">
           
              <Link
                to="https://x.com/abyridellc"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-[#47B2E4] transition"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://www.instagram.com/abyride_llc"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-[#47B2E4] transition"
              >
                <FaInstagram />
              </Link>

              <Link
                to="https://www.linkedin.com/company/abyride/"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-[#47B2E4] transition"
              >
                <FaLinkedin />
              </Link>

              <Link
                to="https://www.youtube.com/watch?v=kt4irtXpbWo"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-[#47B2E4] transition"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-600 pt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Abyride LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
