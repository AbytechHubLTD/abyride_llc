import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import frontPartLicense from "../../../../../assets/driverLicenceFront.png";
import backPartLicense from "../../../../../assets/driverLicenceBack.png";

const DriverLicenseUploadPage = ({ setFormdata, setIsShow }) => {
  const handleDriverLicense = (e) => {
    const file = e.target.files[0];
    setFormdata((pre) => ({
      ...pre,
      third: {
        ...pre.third,
        licenseFile: file,
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
            <span>Driving licence (Class C only)</span>
          </div>
        </header>

        <main className="p-6">
          <h1 className="text-xl font-bold mb-6">
            Take a photo of your driving licence (Class C only)
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
                      className="border border-gray-200 w-full h-"
                    />
                  </div>
                  <ul className="text-xs">
                    <li className="flex items-start mb-1">
                      <span className="text-red-500 mr-1">•</span>
                      <span>
                        Passenger line to scan is <strong>21 years old</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-1">•</span>
                      <span>
                        In case of obtaining the{" "}
                        <strong>Renewal Receipt (NAKISI NAMBA)</strong> to
                        attach the scanned document in the application.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="w-1/2 p-2 border-b border-gray-300">
                  <div className="mb-2">
                    <img
                      src={frontPartLicense}
                      alt="License back example"
                      className="border border-gray-200 w-full"
                    />
                  </div>
                  <ul className="text-xs">
                    <li className="flex items-start mb-1">
                      <span className="text-red-500 mr-1">•</span>
                      <span>
                        Use the class status <strong>wanaohusika "A"</strong>{" "}
                        valid on <strong>date 23</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-1">•</span>
                      <span>
                        <strong>Note: </strong>Select class status winds votes
                        on passenger. Just ensure the driving class indicate
                        passenger vehicles that have not less than 5 seats but
                        not more than 7 seats.
                      </span>
                    </li>
                  </ul>
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
            <p className="text-gray-700 mb-4 text-md ">
              Ensure all information is readable and not blurry. Make sure that
              all corners of the document are visible. Your document may not be
              confirmed if it cannot be read properly or all four corners are
              not visible.
            </p>
            <button className="text-blue-600 font-medium">What is this?</button>
          </div>

          <input
            type="file"
            id="licenseFile"
            onChange={handleDriverLicense}
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

export default DriverLicenseUploadPage;
