import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDriverAuth } from "../../../context/DriverAuthContext";
// import StyledPhoneInput from "../../../components/StyledPhoneInput";
import Swal from "sweetalert2";
import axios from "axios";
import StyledPhoneInput from "../../../components/auth/StyledPhoneInput";

const DriverLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [isPhoneInput, setIsPhoneInput] = useState(false);
  const [error, setError] = useState("");
  const { sendOtp, isLoading } = useDriverAuth();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const phoneInputRef = useRef(null);

  const isProbablyEmail = (value) => value.includes("@") && value.includes(".");
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\d{10,15}$/.test(phone);

  const showAlert = (message, type = "error") => {
    Swal.fire({
      icon: type,
      title: type === "error" ? "Validation Error" : "Success",
      text: message,
      confirmButtonColor: "#3085d6",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const status = searchParams.get("status");
    if (status) {
      if (status === "pending") {
        showAlert(
          "Your account is pending approval. Please wait for the admin to approve your account.",
        );
      } else if (status === "rejected") {
        showAlert("Your account has been rejected");
      } else if (status === "notfound") {
        showAlert(
          "Your account was not found. Please apply to create an account.",
        );
      }
      searchParams.delete("status");
      searchParams.delete("acceptance");
      navigate({ search: searchParams.toString() });
    }
  }, [location.search]);

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

  const handlePhoneChange = (value) => {
    setIsPhoneInput(!!value);
    setIdentifier(value ? `+${value}` : "");
    setError(
      value && !isValidPhone(`+${value}`) ? "Enter a valid phone number." : "",
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error || !identifier) return;

    try {
      const response = await sendOtp(identifier);
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "Check your email or phone for the OTP.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/AbyrideDriver/DriverVerify", { state: response });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.location.href = `${import.meta.env.VITE_API_URL}/driver/google`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white p-4 w-full sm:w-4/6 md:w-3/6 xl:w-2/6 2xl:w-1/4  mt-[3%]  ">
        <h1 className="text-xl text-capitalize font-semibold mb-6 mt-4">
          What's your phone number or email?
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

        <Link
          className="text-sm -ml-[70%] underline text-slate-800 "
          to="/driver-apply"
        >
          {" "}
          Apply for job{" "}
        </Link>

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

export default DriverLogin;
