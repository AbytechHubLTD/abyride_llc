import React from "react";
import ServiceCard from "../ServiceCard";
import { WifiIcon, HeartIcon, LanguageIcon } from "@heroicons/react/16/solid";
import {
  CarIcon,
  MedicalIcon,
  AmbulanceIcon,
  AirportIcon,
} from "../../widgets/Icons";
// import { CarIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion";
import image1 from "../../assets/images/service/medical.webp";
import image2 from "../../assets/images/avatar/avatar1.jpg";
import image3 from "../../assets/images/service/airport.webp";
import image4 from "../../assets/images/avatar/avatar2.jpg";
const Services = () => {
  // array of services
  const Services = [
    {
      num: "01",
      icon: LanguageIcon,
      img: image4,
      title: "Language translation",
      des: " AbyRide offers seamless language translation services to bridge communication gaps. Whether you need assistance with documents, live conversations, or digital content, our expert linguists ensure accurate and culturally appropriate translations, making global communication effortless",
      link: "/services",
    },
    {
      num: "02",
      icon: CarIcon,
      img: image2,
      title: "Abyride Tax Ride",
      des: " AbyRide provides safe, reliable, and convenient taxi rides for all your transportation needs. Whether it's a quick errand, a ride to work, or a trip across the city, our professional drivers ensure you arrive at your destination on time and in comfort.",
      link: "/services",
    },
    {
      num: "03",
      icon: AirportIcon,
      img: image3,
      title: "airport Taxi pick up",
      des: " If you are looking to take the stress and hassle out of airport transportation, we offer the shuttle services you need. Our reliable airport taxi services will ensure that you are greeted with a simple and convenient experience, whether you are inbound or outbound. There's no need to trouble friends or family with the chaos of drop-offs or pickups at the airport; we take care of everything for you. To take advantage of our airport transportation services, please contact us at AbyRide Taxi Service today.",
      link: "/services",
    },
    {
      num: "04",
      icon: AmbulanceIcon,
      img: image1,
      title: "medical transport  services",
      des: " Ambulatory Transportation and Wheelchair Accessible Van Transportation for Non-Emergency Medical Appointments and Non-Medical Events.",
      link: "/services",
    },
  ];
  return (
    // services container
    <div className=" p-2  capitalize flex  flex-col items-center mt-24 ">
      <div className=" flex flex-col  items-center gap-4 w-full lg:w-[500px] xl:w-[700px] ">
        <h2 className=" bg-gray-200 pl-8 pr-8 pt-1  pb-1  rounded-md text-xl text-center ">
          services
        </h2>
        <h1 className=" text-2xl font-semibold text-center lg:text-4xl md:text-3xl mb-2   xl:text-4xl ">
          Explore more of our service
        </h1>
        <p className=" text-center text-gray-700 mb-6">
          Reliable and affordable transportation solutions for your business
          needs. Commutes, meetings, deliveries – we've got you covered
        </p>
      </div>
      <div className="p-2 xl:p-6 w-full flex flex-wrap gap-5 xl:gap-7 justify-center  ">
        {/* maping the services array into an imported servoces component */}
        {Services.map((service, i) => (
          <ServiceCard
            key={i}
            num={service.num}
            SvgIcon={service.icon}
            Img={service.img}
            title={service.title}
            par={service.des}
            link={service.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
