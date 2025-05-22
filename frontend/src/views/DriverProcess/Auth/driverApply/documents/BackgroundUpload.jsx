import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import frontPartLicense from "../../../../../assets/driverLicenceFront.png";
import backPartLicense from "../../../../../assets/driverLicenceBack.png";

const BackgroundUpload = ({ setFormdata, setIsShow }) => {
  const handleDriverBackground = (e) => {
    const file = e.target.files[0];
    setFormdata((pre) => ({
      ...pre,
      third: {
        ...pre.third,
        backgroundFile: file,
      },
    }));
    setIsShow(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-sm">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <ChevronLeft
              className="mr-3"
              size={24}
              onClick={() => setIsShow(null)}
            />
            <span>Enhanced background check result document</span>
          </div>
        </header>

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            Take a photo of your Enhanced background check result document
          </h1>

          <div className="mb-6">
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-black text-white text-xs p-2">
                <span className="text-red-500 font-bold">Avoid</span> blurry
                images or photos with a glare as they will slow your approval
                process
              </div>

              <div className="flex flex-wrap">
                <div className="w-1/2 p-2 border-r border-b border-gray-300">
                  <div className="mb-2">
                    <img
                      src={frontPartLicense}
                      alt="License front example"
                      className="border border-gray-200 w-full"
                    />
                  </div>
                </div>

                <div className="w-1/2 p-2 border-b border-gray-300">
                  <div className="mb-2">
                    <img
                      src={frontPartLicense}
                      alt="License back example"
                      className="border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-black text-white text-xs p-2 flex justify-between">
                <div>
                  Take only the documents that are required to use the service
                </div>
                <div className="text-red-500">Mandatory</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Please make sure we can read all of the details easily.
            </p>
            <button className="text-blue-600 font-medium">What is this?</button>
          </div>

          <input
            type="file"
            id="licenseFile"
            onChange={handleDriverBackground}
            hidden
          />

          <label
            htmlFor="licenseFile"
            className="w-full bg-gray-200 text-black font-medium py-3 rounded text-center"
          >
            Upload File
          </label>
        </main>
      </div>
    </div>
  );
};

export default BackgroundUpload;
