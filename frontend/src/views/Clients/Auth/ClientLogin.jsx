import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import StyledPhoneInput from "../../../components/auth/StyledPhoneInput";
import AuthService from "../../../Services/ClientProcess/Auth"; // Import the service
import Swal from "sweetalert2";
import { useAuth } from "../../../context/ClientAuthContext";
import FillUserInfo from "./FillUserInfo";

const ClientLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [isPhoneInput, setIsPhoneInput] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialCode,setDialCode] = useState(null)
  const navigate = useNavigate();

  const { sendOtp } = useAuth();

  const emailRef = useRef(null);
  const phoneInputRef = useRef(null);

  const isProbablyEmail = (value) => value.includes("@") && value.includes(".");
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\d{10,15}$/.test(phone);

  const handleChange = (e) => {
    const value = e.target.value;
    setIdentifier(value);

    if (!value) {
      setError("This field is required.");
      setIsPhoneInput(false);
    } else if (/[a-zA-Z]/.test(value) || isProbablyEmail(value)) {
      setIsPhoneInput(false);
      setTimeout(() => emailRef.current?.focus(), 0);
      setError(isValidEmail(value) ? "" : "Enter a valid email address.");
    } else {
      setIsPhoneInput(true);
      setTimeout(() => phoneInputRef.current?.focus(), 0);
      setError(isValidPhone(value) ? "" : "Enter a valid phone number.");
    }
  };

  const handlePhoneChange = (value,data) => {
    setDialCode(data.dialCode)
    setIsPhoneInput(!!value);
    setIdentifier(value ? `+${value}` : "");
    setError(
      value && !isValidPhone(`+${value}`) ? "Enter a valid phone number." : "",
    );
  };

  useEffect(()=>{
    if(!isPhoneInput){
      setDialCode(null)
    }
  },[isPhoneInput])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error || !identifier) return;

    setIsLoading(true);
    try {
      const response = await sendOtp(identifier,dialCode);

      if (response.usercontact && response.newuser) {
        Swal.fire({
          title: "Success!",
          text: "OTP sent successfully. Please check your messages.",
          icon: "success",
          timer: 2000, // 2 seconds delay
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/AbyrideClient/ClientVerify", { state: response });
        }, 2000);
      } else {
        Swal.fire(
          "Info",
          "We couldn't find your contact details. Please try again.",
          "info",
        );
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.message || "Failed to send OTP. Please try again.",
        "error",
      );
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    AuthService.googleLogin();

    const checkLogin = setInterval(async () => {
      const user = await AuthService.getUser();
      if (user?.id) {
        clearInterval(checkLogin);
        window.location.href = "/booking";
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center bg-white p-4 w-full sm:w-4/6 md:w-3/6 xl:w-2/6 2xl:w-1/4  mt-[3%]  ">
        <h1 className="text-xl text-capitalize font-semibold mb-6 mt-4">
          What&apos;s your phone number or email?
          {dialCode}
        </h1>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {isPhoneInput ? (
            <StyledPhoneInput
              value={identifier}
              onChange={handlePhoneChange}
              error={error}
              inputRef={phoneInputRef}
            />
          ) : (
            <input
              type="text"
              name="user"
              value={identifier}
              onChange={handleChange}
              placeholder="Enter phone number or email"
              ref={emailRef}
              className={`w-full border rounded-lg mb-2 focus:outline-none text-gray-700 text-sm ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-1 focus:ring-slate-500 text-md"
              }`}
              style={{ padding: "10px" }}
            />
          )}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            style={{ padding: "10px" }}
            disabled={!!error || !identifier || isLoading}
            className="w-full bg-black text-white rounded-lg text-center text-md font-medium hover:bg-gray-800 transition mb-4 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center w-full max-w-md mb-2">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          className="w-full max-w-md flex items-center justify-center bg-gray-100 border border-gray-300  rounded-lg text-center text-md font-medium text-gray-700 hover:bg-gray-200 transition mb-4 cursor-pointer"
          onClick={handleGoogleLogin}
          style={{ padding: "10px" }}
        >
          <FcGoogle size={22} className="mr-3" />
          Continue with Google
        </button>

        <button
          className="w-full max-w-md flex items-center justify-center bg-gray-100 border border-gray-300  rounded-lg text-center text-md font-medium text-gray-700 hover:bg-gray-200 transition mb-4 cursor-pointer"
          disabled={!!error || !identifier}
          style={{ padding: "10px" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple Icon"
            className="h-5 w-5 mr-3"
          />
          Continue with Apple
        </button>

        <div className="flex items-center w-full max-w-md mb-4">
          <hr className="flex-grow border-gray-300" />
        </div>
        <p
          className=" text-capitalize text-gray-600 leading-6"
          style={{ fontSize: "13px" }}
        >
          By proceeding, you consent to get calls, SMS, including by automated
          means, from Abyride LLC and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};
export default ClientLogin;
