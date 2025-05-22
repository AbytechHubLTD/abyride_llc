import React from "react";
import CaseStudyCard from "./CaseStudyCard";
import { WifiIcon } from "@heroicons/react/16/solid";
import caseImg1 from "../../assets/images/casestudy/hair.jpg";
import caseImg2 from "../../assets/images/casestudy/home2.webp";
import caseImg3 from "../../assets/images/casestudy/english.jpg";
import caseImg4 from "../../assets/images/casestudy/home.jpg";
const CaseStudy = () => {
  const Cases = [
    {
      imageBg: caseImg1,
      Icon: WifiIcon,
      head: "we ensure that our success is to pick you up in safe manner",
    },
    {
      imageBg: caseImg3,
      Icon: WifiIcon,
      head: "we ensure that language barrier can't stop you to do your work",
    },
    {
      imageBg: caseImg2,
      Icon: WifiIcon,
      head: "don't worry about medical transportation because we worried about you ",
    },
    {
      imageBg: caseImg4,
      Icon: WifiIcon,
      head: "we provide home care service to you and your family",
    },
  ];
  return (
    <div className="  py-2 p-2 xl:py-9 capitalize flex   flex-col items-center ">
      <div className=" flex flex-col  items-center gap-4 w-full lg:w-[500px] xl:w-[700px] ">
        <h2 className=" bg-gray-200 pl-8 pr-8 pt-1  pb-1  rounded-md text-xl text-center ">
          case study
        </h2>
        <h1 className=" text-2xl font-semibold text-center lg:text-4xl md:text-3xl mb-2   xl:text-4xl ">
          Explore our successfuly story
        </h1>
        <p className=" text-center text-gray-700 mb-6">
          Reliable and affordable transportation solutions for your business
          needs. Commutes, meetings, deliveries – we've got you covered
        </p>
      </div>
      <div className=" p-4 flex flex-wrap gap-8 w-[95%] mb-6 mt-4 ">
        {Cases.map((caseStudy, i) => (
          <CaseStudyCard
            key={i}
            bgImage={caseStudy.imageBg}
            SvgIcon={caseStudy.Icon}
            h1={caseStudy.head}
            p={caseStudy.par}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseStudy;
