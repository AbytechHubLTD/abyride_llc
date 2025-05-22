import React from "react";
import Collaborators from "../components/index/Collaborators.jsx";
import Blog from "../components/blog-card/Blog.jsx";
import AboutUsImage from "../assets/images/casestudy/hello.webp";
import AboutUsImage1 from "../assets/images/casestudy/image1.jpg";

import { aboutUsText, powerPatnersData } from "../staticData/data.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import WhyPeopleChooseUs from "../components/index/WhyPeopleChooseUs.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import { useEffect } from "react";
import MapWithRoute from "./MapView.jsx";
import { FaCheckCircle } from 'react-icons/fa';


const AboutUs = () => {

  const items = [
    'Individuals who can walk and get in and out of a vehicle independently',
    'Clients using wheelchairs',
    'Clients with disabilities',
    'Insured clients',
    'Private pay clients'
  ];
  const navigate = useNavigate();

  // power patners jsx Element 👇
  const powerPatnersElement = powerPatnersData.map((data) => {
    return (
      <div key={data.id} className="flex items-center gap-4">
        <div className="bg-[#47B2E4] w-20 text-white p-4 rounded-full">
          <img src={data.logo} alt="logos " className="w-full" />
        </div>
        <div>
          <h4 className="font-semibold text-xl leading-10 ">{data.title}</h4>
          <p className="text-gray-600 text-sm">{data.description}</p>
        </div>
      </div>
    );
  });

  // each time the url or path change it changes the header name
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",

      inline: "start",
    });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header title="About Us" />

      <section className="flex flex-col lg:flex-row items-center lg:gap-14 gap-5 lg:items-start bg-gray-50 p-8 lg:p-16 text-xl">
        <div className=" lg:w-1/2 w-full">
          <img
            src={AboutUsImage1}
            alt="About Us"
            className="w-full object-cover lg:h-[480px]  rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section Texts 🔠 */}
        <div className=" lg:w-1/2 w-full p-4 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2 -mt-4 text-gray-800 lg:text-5xl leading-loose ">
         Welcome to Abyride LLC
          </h1>
          <p className="text-gray-600 mb-6  font-normal text-[15px] leading-loose capitalize">
          Abyride is a non-emergency medical transportation provider serving West Michigan. We provide professional door-to-door transportation anywhere originating from Kent County.

From pick-up to drop-off, we ensure our clients arrive on-time at their destination and return safely. We provide quality ambulatory and wheelchair accessible van services to
          </p>
          <div className="bg-white p-6 rounded shadow-md space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <FaCheckCircle className="text-green-600 mt-1" />
          <p className="text-gray-800 text-sm">{item}</p>
        </div>
      ))}
      <p className="mt-4 text-sm text-blue-700 font-semibold">
        We care for our clientele as if they were our own family members.
      </p>
    </div>
        </div>
      </section>

      {/* About Section under HeaderZ */}
      <section className="flex flex-col lg:flex-row items-center lg:gap-14 gap-5 lg:items-start bg-gray-50 p-8 lg:p-16 text-xl -mt-20">
      

        {/* Right Section Texts 🔠 */}
        <div className=" lg:w-1/2 w-full p-4 flex flex-col justify-center">
       
          <h1 className="text-2xl font-bold mb-6 text-gray-800 lg:text-5xl leading-loose capitalize ">
            {aboutUsText.headerTitle}
          </h1>
          <p className="text-gray-600 mb-2  font-normal text-[15px] leading-loose capitalize">
            At Abyride LLC, we believe in transforming the way people
            move and connect. Since our inception, we've been committed to
            providing seamless, reliable, and innovative transportation
            solutions that cater to the needs of modern commuters and businesses
            alike. Our mission is to redefine convenience by offering a platform
            that bridges the gap between passengers and drivers with the highest
            standards of safety, affordability, and efficiency. With
            cutting-edge technology and a customer-centric approach, we aim to
            make every journey stress-free and memorable.
          </p>
          <hr className="w-full h-2 mx-auto my-3" />
          <div className="flex flex-col sm:flex-row gap-6 ">
            {powerPatnersElement}
          </div>
        </div>
        <div className=" lg:w-1/2 w-full">
          <img
            src={AboutUsImage}
            alt="About Us"
            className="w-full object-cover lg:h-[540px]  rounded-lg shadow-lg"
          />
        </div>
      </section>
        {/* About Section under HeaderZ */}
       

      <Collaborators className="mb-4" />
    </div>
  );
};

export default AboutUs;
