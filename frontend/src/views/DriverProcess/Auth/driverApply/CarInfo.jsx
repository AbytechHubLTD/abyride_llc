import React from "react";

const CarInfo = ({
  currentStep,
  setFormdata,
  setValid,
  nextStep,
 
  formData,
  error,
  setError,
}) => {
  // Handle input changes with validation
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...error };
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Make is required";
        } else if (value.length < 2) {
          newErrors.name = "Make must be at least 2 characters";
        } else {
          newErrors.name = "";
        }
        break;

      case "model":
        if (!value.trim()) {
          newErrors.model = " model is required";
        } else if (value.length < 2) {
          newErrors.model = " model must be at least 2 characters";
        } else {
          newErrors.model = "";
        }
        break;

      case "manufactureYear":
        const yearRegex = /^(19|20)\d{2}$/;
        const currentYear = new Date().getFullYear();

        if (!value.trim()) {
          newErrors.manufactureYear = "Manufacture year is required";
        } else if (!yearRegex.test(value)) {
          newErrors.manufactureYear = "Please enter a valid year (1900-2099)";
        } else if (parseInt(value) > currentYear) {
          newErrors.manufactureYear = `Year cannot be greater than ${currentYear}`;
        } else if (parseInt(value) < 1900) {
          newErrors.manufactureYear = "Year cannot be earlier than 1900";
        } else {
          newErrors.manufactureYear = "";
        }
        break;
      case "carPalate":
        if (!value.trim()) {
          newErrors.carPalate = "Car palate is required";
        } else if (value.length < 2) {
          newErrors.carPalate = "Car palate must be at least 2 characters";
        } else {
          newErrors.carPalate = "";
        }
        break;
      case "carCapacity":
        if (!value.trim()) {
          newErrors.carCapacity = "Maximum Number Of Passenger is required";
        } else if (parseInt(value) < 2) {
          newErrors.carCapacity =
            "Maximum Number Of Passenger must be at least over or equal to 2 seats";
        } else {
          newErrors.carCapacity = "";
        }
        break;
      case "carColor":
        if (!value.trim()) {
          newErrors.carColor = "Car color is required";
        } else {
          newErrors.carColor = "";
        }
        break;
    }

    // Update the error state
    setError((pre) => ({
      ...pre,

      fourth: newErrors,
    }));

    // Update the form data in parent component
    setFormdata((prevData) => ({
      ...prevData,
      fourth: {
        ...prevData.fourth,
        [name]: value,
      },
    }));

    // Check if all fields are valid to enable the next button
    const isValid =
      !newErrors.name &&
      !newErrors.model &&
      !newErrors.manufactureYear &&
      !newErrors.carCapacity &&
      !newErrors.carPalate &&
      !newErrors.carColor &&
      !!formData.name &&
      !!formData.model &&
      !!formData.manufactureYear &&
      !!formData.carCapacity &&
      !!formData.carColor &&
      !!formData.carPalate 

    setValid((prev) => ({
      ...prev,
      4: isValid,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validation before submitting
    if (
      !error.name &&
      !error.model &&
      !error.manufactureYear &&
      !error.carCapacity &&
      !error.carPalate &&
      !error.carColor &&
      !!formData.name &&
      !!formData.model &&
      !!formData.manufactureYear &&
      !!formData.carCapacity &&
      !!formData.carColor &&
      !!formData.carPalate 
      
    ) {
      nextStep();
    }
  };



  
  

  

  return (
    <div
      className="flex flex-col h-full bg-white p-9 px-14 w-11/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 rounded-lg justify-center items-center 
    mt-[-36px]"
    >
      <h1 className="text-xl md:text-2xl xl:text-3xl capitalize">
        Step {currentStep} : Fill in the Vehicle Information
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full xl:w-11/12 py-4 gap-2"
      >
        <div className="flex gap-2 flex-col w-full">
          <div className="w-full">
            <label htmlFor="name">Make:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChangeValue}
              placeholder="Enter Make (e.g., Toyota, Honda)"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black text-[.9rem] ${
                error.name
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.name && (
              <p className="text-red-500 text-sm mb-2">{error.name}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="manufactureYear">Manufacture Year:</label>
            <input
              type="text"
              id="manufactureYear"
              name="manufactureYear"
              value={formData.manufactureYear}
              onChange={handleChangeValue}
              placeholder="Enter year (e.g., 2022)"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black text-[.9rem] ${
                error.manufactureYear
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.manufactureYear && (
              <p className="text-red-500 text-sm mb-2">
                {error.manufactureYear}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="carColor">Car Color:</label>
            <input
              type="text"
              id="carColor"
              name="carColor"
              value={formData.carColor}
              onChange={handleChangeValue}
              placeholder="Enter color (e.g.: red , blue)"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black ${
                error.carColor
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.carColor && (
              <p className="text-red-500 text-sm mb-2">{error.carColor}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="carCapacity">Maximum Number Of Passenger  :</label>
            <input
              type="number"
              id="carCapacity"
              name="carCapacity"
              min={0}
              max={10}
              value={formData.carCapacity}
              onChange={handleChangeValue}
              placeholder="Enter the Maximum Number Of Passenger (e.g.: it can support 4 or 5 people) "
              className={`w-full p-3 border rounded-lg mb-1 focus:outline-none text-black ${
                error.carCapacity
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.carCapacity && (
              <p className="text-red-500 text-sm mb-2">{error.carCapacity}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="carPalate">Car Palate:</label>
            <input
              type="text"
              id="carPalate"
              name="carPalate"
              value={formData.carPalate}
              onChange={handleChangeValue}
              placeholder="Enter car palate (e.g., park area)"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black ${
                error.carPalate
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.carPalate && (
              <p className="text-red-500 text-sm mb-2">{error.carPalate}</p>
            )}
          </div>
        </div>

        <label htmlFor="model"> Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChangeValue}
          placeholder="Enter  model (e.g., Camry, Civic)"
          className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black text-[.9rem] ${
            error.model
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-500"
          }`}
        />
        {error.model && (
          <p className="text-red-500 text-sm mb-2">{error.model}</p>
        )}


        <button
          type="submit"
          className={`text-white py-3  px-4 disabled:opacity-55 rounded-lg mt-6 bg-primaryred transition`}
          disabled={
            !formData.name ||
            !formData.model ||
            !formData.manufactureYear ||
            !!error.name ||
            !!error.model ||
            !!error.manufactureYear 
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CarInfo;
