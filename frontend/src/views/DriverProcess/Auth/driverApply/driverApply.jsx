import React, { useState } from "react";

import DriverInfo from "./DriverInfo";
import DriverImageUploader from "./DriverImageUploader";
import DriverLicenseFile from "./DriverLicenseFile";
import CarInfo from "./CarInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/DashboardNavbar";
import Swal from "sweetalert2";
import CarImages from "./CarImages";

const DriverApply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [valid, setValid] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    one: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    second: {
      profilePic: null,
    },
    third: {
      licenseFile: null,
      backgroundFile: null,
      vehicleInsuranceFile: null,
      supportingFile: null,
    },
    fourth: {
      manufactureYear: "",
      model: "",
      name: "",
      carPalate: "",
      carCapacity: "",
      carColor: "",
    },
    fifth:{
      innerImages:[],
      outerImages:[],
    }
  });

  function flattenFormData(nestedFormData) {
    const formDataBackend = new FormData();

    // Add 'one' object properties
    formDataBackend.append("firstName", nestedFormData.one.firstName);
    formDataBackend.append("lastName", nestedFormData.one.lastName);
    formDataBackend.append("phone", nestedFormData.one.phone);
    formDataBackend.append("email", nestedFormData.one.email);

    // Add 'second' object properties
    if (nestedFormData.second.profilePic) {
      formDataBackend.append("profile", nestedFormData.second.profilePic);
    }

    // Add 'third' object properties
    if (nestedFormData.third.licenseFile) {
      formDataBackend.append("driverLicense", nestedFormData.third.licenseFile);
    }

    if (nestedFormData.third.backgroundFile) {
      formDataBackend.append(
        "bgcheckfile",
        nestedFormData.third.backgroundFile,
      );
    }

    if (nestedFormData.third.vehicleInsuranceFile) {
      formDataBackend.append(
        "insurancefile",
        nestedFormData.third.vehicleInsuranceFile,
      );
    }

    if (nestedFormData.third.supportingFile) {
      formDataBackend.append(
        "latraD4license",
        nestedFormData.third.supportingFile,
      );
    }

    // Add 'fourth' object properties
    formDataBackend.append(
      "manufactureYear",
      nestedFormData.fourth.manufactureYear,
    );

    formDataBackend.append("carmodel", nestedFormData.fourth.model);
    formDataBackend.append("carname", nestedFormData.fourth.name);
    formDataBackend.append("carPalate", nestedFormData.fourth.carPalate);
    formDataBackend.append("carCapacity", nestedFormData.fourth.carCapacity);
    formDataBackend.append("carColor", nestedFormData.fourth.carColor);

    // Properly handle the car images array
    const allCarImages = [
      ...(nestedFormData.fifth.innerImages || []),  // Default to empty array if undefined
      ...(nestedFormData.fifth.outerImages || []),  // Default to empty array if undefined
    ];
    
    if (allCarImages.length > 0 && allCarImages.length <= 8) {
      allCarImages.forEach((imageObj, index) => {
        // Ensure imageObj is an object and has a valid file property
        if (imageObj?.file && imageObj.file instanceof File) {
          formDataBackend.append(`carphoto${index + 1}`, imageObj.file);
          console.log(`Appended carphoto${index + 1}: ${imageObj.file.name}`);
        } else {
          console.error(`Invalid image object at index ${index}:`, imageObj);
        }
      });
    } else {
      console.error('You need exactly 8 images.');
    }
    

    return formDataBackend;
  }

  const [error, setError] = useState({
    one: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    second: {
      profilePic: null,
    },
    third: {
      licenseFile: null,
      backgroundFile: null,
      vehicleFile: null,
      supportingFile: null,
    },
    fourth: {
      manufactureYear: "",
      model: "",
      name: "",
      carPalate: "",
      carCapacity: "",
      carColor: "",
     
    },
    fifth:{
      innerImages:[],
      outerImages:[],
    }
  });

  console.log(valid);

  const nextStep = () => {
    // Add validation before moving to next step
    if (validateCurrentStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
      console.log(`working`);
    }
    console.log(`validation failed`);
  };

  const navigate = useNavigate();

  // Move to previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmitAllForm = async () => {
    setLoading(true);
    try {
      const flatFormData = flattenFormData(formData);

      // Debug: Log the car images structure
      console.log(
        "Car Images Structure:",
        JSON.stringify(
          [...formData.fifth.innerImages,...formData.fifth.outerImages].map((img) => ({
            hasFile: !!img.file,
            fileName: img.file ? img.file.name : "No file",
            preview: img.preview,
            name: img.name,
          })),
        ),
      );

      // Optional: Log FormData entries for debugging
      for (let pair of flatFormData.entries()) {
        console.log(
          pair[0] +
            ": " +
            (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]),
        );
      }

      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/driver/apply`,
        flatFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (resp.data.message) {
        Swal.fire({
          icon: "success",
          title: "Successfully sent your application",
          text: "Updates will be sent on your email.",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/", { replace: true });
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return valid["1"];
      case 2:
        return valid["2"];
      case 3:
        return valid["3"];
      case 4:
        return valid["4"];
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DriverInfo
            currentStep={currentStep}
            error={error.one}
            valid={valid}
            setError={setError}
            setFormdata={setFormData}
            nextStep={nextStep}
            setValid={setValid}
            formData={formData.one}
          />
        );
      case 2:
        return (
          <DriverImageUploader
            currentStep={currentStep}
            error={error.second}
            valid={valid}
            setError={setError}
            setFormdata={setFormData}
            nextStep={nextStep}
            setValid={setValid}
            formData={formData.second}
          />
        );
      case 3:
        return (
          <DriverLicenseFile
            currentStep={currentStep}
            error={error.third}
            lastName={formData.one.lastName}
            valid={valid}
            setError={setError}
            setFormdata={setFormData}
            nextStep={nextStep}
            setValid={setValid}
            formData={formData.third}
          />
        );
      case 4:
        return (
          <CarInfo
            currentStep={currentStep}
            error={error.fourth}
            valid={valid}
            setError={setError}
            setFormdata={setFormData}
            nextStep={nextStep}
            setValid={setValid}
            formData={formData.fourth}
          />
        );
      case 5:
        return (
          <CarImages
            currentStep={currentStep}
            error={error.fourth}
            valid={valid}
            setError={setError}
            nextStep={nextStep}
            setFormdata={setFormData}
            handleSubmitAllForm={handleSubmitAllForm}
            setValid={setValid}
            formData={formData.fifth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col  gap-12 max-sm:gap-10 md:gap-[60px] bg-gray-100 h-screen">
      <Header />
      <div className="flex flex-col gap-4 bg-gray-100 items-center justify-center p-6 mt-[-20px] max-sm:mt-[10px] md:mt-[-10px]">
        {renderStep()}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md">
              Submitting application...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverApply;
