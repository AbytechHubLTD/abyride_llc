import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import bgImage from "../../assets/images/tax1.jpg";
import { color } from "framer-motion";
const CaseStudyCard = ({ SvgIcon, bgImage, h1, p }) => {
  return (
    <div className="w-full md:w-5/12 lg:w-5/12 xl:w-[330px] flex-auto h-[450px] overflow-hidden text-white relative rounded-2xl flex justify-center group ">
      <div className=" absolute w-full h-full bg-gradient-to-b from-transparent to-primary z-[5] pointer-events-none "></div>
      {/* Image */}
      <img
        src={bgImage}
        className="w-full h-full absolute object-cover z-[3]"
        alt=""
      />

      {/* Content */}
      <div className="flex flex-col items-center gap-3 justify-end mb-14 lg:p-9 xl:p-5 p-2 z-[5] ">
        <div className="flex flex-col items-center ">
          <h1 className="font-bold lg:text-2xl  text-center xl:text-2xl">
            {h1}
          </h1>
          <p className="text-lg text-white-300 font-semibold mb-4">{p}</p>
        </div>
      </div>

      {/* NavLink */}
      <NavLink
        className="absolute bg-white p-3 px-2 w-[160px] rounded-xl text-black -bottom-2 left-[50%] flex -translate-x-[50%] items-center justify-center gap-2 font-normal z-[5]"
        to="blog"
      >
        Read More
        <ArrowUpRightIcon className="w-[25px] h-[25px]" />
      </NavLink>
    </div>
  );
};

export default CaseStudyCard;
