import React, { useState, useEffect } from "react";
import { Check, ChevronRight, X } from "lucide-react";
import DriverLicenseUploadPage from "./documents/LicenseUpload";
import BackgroundUpload from "./documents/BackgroundUpload";
import InsuranceUpload from "./documents/InsuranceUpload";
import SupportingUpload from "./documents/SupportingUpload";

const DriverLicenseFile = ({
  currentStep,
  error,
  setError,
  formData,
  setFormdata,
  valid,
  setValid,
  nextStep,
  lastName,
}) => {
  const [isShow, setIsShow] = useState(null);
  const [isAllFilesUploaded, setIsAllFilesUploaded] = useState(false);

  // Check if all required files are uploaded
  useEffect(() => {
    const requiredFiles = [
      formData.licenseFile,
      formData.backgroundFile,
      formData.vehicleInsuranceFile,
      formData.supportingFile,
    ];

    const allUploaded = requiredFiles.every((file) => file !== null);

    // Update validation state
    setIsAllFilesUploaded(allUploaded);

    // Update the parent component's valid state for step 3
    setValid((prev) => ({
      ...prev,
      3: allUploaded,
    }));
  }, [formData, setValid]);

  const onboardingItems = [
    {
      id: 3,
      title: "Driving licence (Class C only)",
      subtitle: "license",
      file: formData.licenseFile,
    },
    {
      id: 4,
      title: "Enhanced background check result document",
      subtitle: "background",
      file: formData.backgroundFile,
    },
    {
      id: 5,
      title: "Vehicle insurance (commercial)",
      subtitle: "insurance",
      file: formData.vehicleInsuranceFile,
    },
    {
      id: 6,
      title: "Supporting files",
      subtitle: "supporting",
      file: formData.supportingFile,
    },
  ];

  const renderComponents = () => {
    switch (isShow) {
      case "license":
        return (
          <DriverLicenseUploadPage
            setIsShow={setIsShow}
            setFormdata={setFormdata}
          />
        );
      case "background":
        return (
          <BackgroundUpload setIsShow={setIsShow} setFormdata={setFormdata} />
        );
      case "insurance":
        return (
          <InsuranceUpload setIsShow={setIsShow} setFormdata={setFormdata} />
        );
      case "supporting":
        return (
          <SupportingUpload setIsShow={setIsShow} setFormdata={setFormdata} />
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    if (isAllFilesUploaded) {
      nextStep();
    }
  };

  return (
    <div className="bg-white flex flex-col mt-[-35px] max-sm:mt-[-20px] max-xl:mt-[10px]">
      {/* Main Content */}
      {!isShow ? (
        <main className="flex-grow flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-2">
              Step {currentStep} : Welcome, {lastName}
            </h1>
            <p className="text-gray-700 mb-8">
              Here's what you need to do to set up your account.
            </p>

            {/* Onboarding Items */}
            <div className="space-y-4">
              {onboardingItems.map((item, key) => (
                <div key={key} className="border-b border-gray-200 pb-4">
                  <button
                    className="w-full flex justify-between items-center"
                    onClick={() => setIsShow(item.subtitle)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{item.title}</div>
                      {!item.file && (
                        <div className="text-sm text-red-500">Required</div>
                      )}
                    </div>
                    {item.file ? (
                      <Check className="stroke-green-500" />
                    ) : (
                      <ChevronRight className="stroke-red-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* {!isAllFilesUploaded && (
                                <p className="text-red-500 text-sm mt-4">
                                    Please upload all required documents before proceeding
                                </p>
                            )} */}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={!isAllFilesUploaded}
              className="text-white w-full py-2 px-4 disabled:opacity-55 rounded-lg mt-4 bg-primaryred transition"
            >
              Next
            </button>
          </div>
        </main>
      ) : (
        renderComponents()
      )}
    </div>
  );
};

export default DriverLicenseFile;
