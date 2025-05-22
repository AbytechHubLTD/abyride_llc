import React, { useEffect } from "react";
import StyledPhoneInput from "../../../../components/auth/StyledPhoneInput";

const DriverInfo = ({
  currentStep,
  setFormdata,
  setValid,
  nextStep,
  formData,
  error,
  setError,
}) => {
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  // Check if all inputs have data and no errors on mount and when inputs change
  useEffect(() => {
    const allFieldsFilled =
      formData.firstName?.trim() &&
      formData.lastName?.trim() &&
      formData.email?.trim() &&
      formData.phone?.trim();

    const noErrors =
      !error.firstName && !error.lastName && !error.email && !error.phone;

    // Update valid state based on conditions
    setValid((prev) => ({
      ...prev,
      1: allFieldsFilled && noErrors,
    }));
  }, [formData, error, setValid]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormdata((pre) => ({
      ...pre,
      one: {
        ...pre.one,
        [name]: value,
      },
    }));

    // Validate and set errors based on input type
    validateField(name, value);
  };

  // Handle phone input change (assuming StyledPhoneInput has a different onChange format)
  const handlePhoneChange = (value) => {
    setFormdata((pre) => ({
      ...pre,
      one: {
        ...pre.one,
        phone: value ? `+${value}` : "",
      },
    }));

    validateField("phone", value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          errorMessage = "First name is required";
        } else if (value.length < 2) {
          errorMessage = "First name must be at least 2 characters";
        }
        break;

      case "lastName":
        if (!value.trim()) {
          errorMessage = "Last name is required";
        } else if (value.length < 2) {
          errorMessage = "Last name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!isValidEmail(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value.trim()) {
          errorMessage = "Phone number is required";
        } else if (!isValidPhone(value)) {
          errorMessage = "Please enter a valid phone number";
        }
        break;

      default:
        break;
    }

    setError((prevErrors) => ({
      ...prevErrors,
      one: {
        ...prevErrors.one,
        [name]: errorMessage,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    nextStep();
  };

  return (
    <div className="flex flex-col h-full bg-white p-7 px-14 mt-0 max-sm:mt-[-30px] md:mt-0 lg:mt-0 w-11/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 rounded-lg justify-center items-center">
      <h1 className=" text-lg md:text-xl xl:text-2xl capitalize">
        {" "}
        Step {currentStep} : fill this the Driver info
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full xl:w-11/12 py-4 gap-2 "
      >
        <div className="flex gap-2 flex-col sm:flex-row w-full">
          <div className=" w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChangeValue}
              placeholder="Enter first name"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black ${
                error.firstName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.firstName && (
              <p className="text-red-500 text-sm mb-2">{error.firstName}</p>
            )}
          </div>

          <div className=" w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChangeValue}
              placeholder="Enter last name"
              className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black ${
                error.lastName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            {error.lastName && (
              <p className="text-red-500 text-sm mb-2">{error.lastName}</p>
            )}
          </div>
        </div>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeValue}
          placeholder="Enter email address"
          className={`w-full p-2.5 border rounded-lg mb-1 focus:outline-none text-black ${
            error.email
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-500"
          }`}
        />
        {error.email && (
          <p className="text-red-500 text-sm mb-2">{error.email}</p>
        )}

        <label htmlFor="phone">Phone:</label>
        <StyledPhoneInput
          value={formData.phone}
          onChange={handlePhoneChange}
          error={!!error.phone}
        />
        {error.phone && (
          <p className="text-red-500 text-sm mb-2">{error.phone}</p>
        )}

        <button
          type="submit"
          className="text-white py-2 px-4 disabled:opacity-55 rounded-lg mt-4 bg-primaryred transition"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone ||
            !!error.firstName ||
            !!error.lastName ||
            !!error.email ||
            !!error.phone
          }
        >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default DriverInfo;
