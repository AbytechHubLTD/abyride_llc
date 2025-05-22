import React from 'react';
import iosicon from '../../assets/carimages/iosapp-icon.png'
import andrioid from '../../assets/carimages/android.png'
import ipad from '../../assets/carimages/app-screen.png'

function Advertisement() {
  return (
    <div className="w-[90%] m-auto rounded-lg bg-gray-100 py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
      
      {/* Left Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-[#293751]">ABY RIDE</h1>
        <h2 className="text-2xl font-semibold">DOWNLOAD OUR NEW APP NOW!</h2>
        <p className="text-gray-700">
          Download Our New App Today And Book A Ride To Your Destination With Just A Few Taps.
        </p>

        {/* Grid of 6 buttons */}
        <div className="grid grid-cols-2 gap-4">
          {['Book Ride', 'Track Driver', 'Share Location', 'History', 'Support', 'Profile'].map((label, index) => (
            <button
              key={index}
              className="bg-[#293751] text-white py-3 px-4 rounded hover:bg-slate-700 transition"
            >
              {label}
            </button>
          ))}
        </div>

        {/* App store images */}
        <div className="flex gap-4 mt-6">
          <img
            src={iosicon}
            alt="App Store"
            className="w-56 border-none cursor-pointer"
          />
          <img
            src={andrioid}
            alt="Google Play"
            className="w-56 border-none cursor-pointer"
          />
        </div>
      </div>

      {/* Right Section - Mobile App Image */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={ipad} // Placeholder, you can replace with your app screenshot
          alt="Mobile App"
          className="w-64 md:w-72"
            />
      </div>
    </div>
  );
}

export default Advertisement;
