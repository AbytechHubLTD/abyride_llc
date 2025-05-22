import React from "react";
import About1 from "../../assets/images/about1.jpg";
import { CheckmarkIcon } from "../../widgets/Icons";
import { CheckIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
const About = () => {
  const qualities = [
    " unemergency medical transportation services",
    "good airport pick up  transports",
    "good home care service",
    "good language translation service",
  ];
  return (
    <div className="bg-[#293751] p-3 mt-16 mb-14 rounded-xl text-white flex capitalize flex-wrap">
      <div className=" w-full flex flex-col gap-5 lg:w-1/2 p-8 pt-10  flex-auto ">
        <h2 className=" -pb-6  text-lg text-gray-300 "> // about us</h2>
        <h1 className=" font-bold text-2xl  md:text-4xl -mb-2 ">
          About Abyride LLC{" "}
        </h1>
        <p className="text-[12px] md:text-md leading-10 pr-6 scroll-pb-10">
          Welcome to AbyRide Transportation, your premier company for taxicab
          services in Grand Rapids, MI and the surrounding area . Reliable and
          affordable transportation solutions for your business needs. Commutes,
          meetings, deliveries – we've got you covered. Aby Home Care is
          dedicated to offering compassionate, personalized care to individuals
          in the comfort of their homes
        </p>
        <div className=" grid grid-cols-2 p-4 -pt-14 gap-3 ">
          {qualities.map((quality, i) => (
            <div key={i} className=" flex items-center gap-1">
              <CheckIcon className=" w-6 h-6 md:w-7 md:h-7 " />
              <p className=" text-[12px] md:text-md ">{quality}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=" md:w-1/2 lg:5/12 w-full p-6 h-[600px] object-cover flex-auto ">
        <img
          src={About1}
          className=" w-full h-full rounded-2xl object-cover "
          alt=""
        />
      </div>
    </div>
  );
};

export default About;
