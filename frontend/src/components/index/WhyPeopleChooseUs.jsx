import React from "react";
import { NavLink } from "react-router-dom";
import {
  TruckIcon,
  HeartIcon,
  GlobeAltIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import QualityCard from "../QualityCard";
const WhyPeopleChooseUs = () => {
  const qualities = [
    {
      icon: TruckIcon, // Example icon for transportation
      title: "Reliable Transportation",
      par: "We ensure on-time, safe, and comfortable transportation services for all your needs, from medical appointments to airport pickups.",
    },
    {
      icon: HeartIcon, // Example icon for care
      title: "Caring Home Services",
      par: "Our compassionate team provides tailored home care services, ensuring the well-being and comfort of your loved ones.",
    },
    {
      icon: GlobeAltIcon, // Example icon for global reach
      title: "Accurate Language Translation",
      par: "Break language barriers with our precise and culturally sensitive translation services, ideal for global communication.",
    },
    {
      icon: ClipboardDocumentIcon, // Example icon for documentation
      title: "Professionalism Guaranteed",
      par: "Our dedicated staff delivers top-notch service with professionalism, ensuring your satisfaction every step of the way.",
    },
    {
      icon: ClockIcon, // Example icon for punctuality
      title: "Punctuality You Can Trust",
      par: "We value your time and pride ourselves on providing timely pick-ups and drop-offs, no matter the destination.",
    },
    {
      icon: UserGroupIcon, // Example icon for customer care
      title: "Customer-Centric Approach",
      par: "We prioritize your needs and feedback, tailoring our services to offer you the best possible experience.",
    },
  ];

  return (
    <div className=" capitalize mb-4 p-10 pt-20 ">
      <div className=" bg-gray-200 p-6 rounded-2xl  ">
        <div className=" leading-loose md:flex items-end justify-between p-7 ">
          <div className=" md:flex flex-col items-start gap-2 ">
            <h2 className=" bg-white flex items-center justify-center rounded-md  px-2 py-2 font-normal pr-5 pl-4 mt-2 ">
              why people choose us
            </h2>
            <h1 className=" text-2xl lg:text-3xl md:text-2xl xl:text-4xl  mb-2 mt-2 font-semibold ">
              Success Stories that Inspire
            </h1>
          </div>
          <NavLink
            className=" bg-[#293751] text-white p-2 w-36 text-center px-3 rounded-xl text-lg "
            to="about"
          >
            view more
          </NavLink>
        </div>
        <div className="  p-6 py-9 grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-3 ">
          {qualities.map((quality, i) => (
            <QualityCard
              key={i}
              SvgIcon={quality.icon}
              title={quality.title}
              des={quality.par}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyPeopleChooseUs;
