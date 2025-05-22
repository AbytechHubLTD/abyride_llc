import React from 'react'
import Header from "../components/Header";
import { BsPersonStanding } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import image1 from '../assets/carimages/saloon.png'
import image2 from '../assets/carimages/ford.png'
import image3 from '../assets/carimages/toyota.png'

function Fleet() {
    const fleetData = [
        {
          title: "Sedan",
          passengers: 4,
          suitcases: 3,
          smallCases: 3,
          image:image1,
        },
        {
          title: "SUV",
          passengers: 6,
          suitcases: 4,
          smallCases: 4,
          image: image2,
        },
        {
          title: "Luxury Van",
          passengers: 8,
          suitcases: 6,
          smallCases: 5,
          image:image3,
        },
      ];
  return (
    <div>
            <Header title=" Our Fleet" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {fleetData.map((fleet, index) => ( 
        <div key={index} className="bg-white shadow-md border-2  border-slate-600 rounded-2xl overflow-hidden flex flex-col justify-between transition-transform hover:scale-105">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 p-2 bg-[#293751] rounded-sm text-center text-white">{fleet.title}</h2>
            <p className="text-gray-600 mb-4">
              This type of vehicle can accommodate a maximum of:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className='p-2 bg-slate-300 text-md rounded-md flex  text-slate-950 mb-3 justify-between'><BsPersonStanding className='w-10 h-6'/>  {fleet.passengers} Passengers</li>
              <li  className='p-2 bg-slate-300 text-md rounded-sm flex  text-slate-950 mb-3 justify-between'><FaSuitcase className='w-10 h-6' /> {fleet.suitcases} Suitcases</li>
              <li  className='p-2 bg-slate-300 text-md rounded-sm flex  text-slate-950 mb-3 justify-between'><FaBriefcase className='w-10 h-6' /> {fleet.smallCases} Small Cases</li>
            </ul>
          </div>
          <div className="mt-auto ">
            <img src={fleet.image} alt={fleet.title} className="w-full object-contain h-60 bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Fleet