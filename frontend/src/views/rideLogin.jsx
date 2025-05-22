import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import StyledPhoneInput from "../components/auth/StyledPhoneInput";
import { useAuth } from "../context/AuthContext";

const RideLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [isPhoneInput, setIsPhoneInput] = useState(false);
  const [error, setError] = useState("");
  const { sendOtp, isLoading } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const phoneInputRef = useRef(null);

  const isProbablyEmail = (value) => value.includes("@") && value.includes(".");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  };
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
    !!value
      ? setTimeout(() => phoneInputRef.current?.focus(), 0)
      : setTimeout(() => emailRef.current?.focus(), 0);
    setIsPhoneInput(!!value);
    isPhoneInput
      ? setTimeout(() => phoneInputRef.current?.focus(), 0)
      : setTimeout(() => emailRef.current?.focus(), 0);
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
      if (response.usercontact && response.newuser) {
        navigate("/rideVerify", { state: response });
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;

    // Listen for messages from the backend about login success
    const checkLogin = setInterval(() => {
      if (googleLoginWindow?.closed) {
        clearInterval(checkLogin);
        fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((user) => {
            if (user?.id) {
              window.location.href = "/booking"; // Redirect to booking page
            }
          })
          .catch((err) => console.error("Error fetching user:", err));
      }
    }, 1000);
  };

  const handleAppleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      "https://appleid.apple.com/auth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=name%20email",
      "Apple Login",
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=no,resizable=no`,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4">
      <Header title="rider" />
      <h1 className="text-2xl font-semibold mb-6 mt-4">
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
            className={`w-full p-3 border rounded-lg mb-2 focus:outline-none text-black ${
              error
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-gray-500"
            }`}
          />
        )}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={!!error || !identifier || isLoading}
          className="w-full bg-black text-white p-3 rounded-lg text-center text-lg font-medium hover:bg-gray-800 transition mb-4 disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Continue"}
        </button>
      </form>

      <div className="flex items-center w-full max-w-md mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        className="w-full max-w-md flex items-center justify-center bg-gray-100 border border-gray-300 p-3 rounded-lg text-center text-lg font-medium text-gray-700 hover:bg-gray-200 transition mb-4 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={22} className="mr-3" />
        Continue with Google
      </button>

      <button
        className="w-full max-w-md flex items-center justify-center bg-gray-100 border border-gray-300 p-3 rounded-lg text-center text-lg font-medium text-gray-700 hover:bg-gray-200 transition mb-4 cursor-pointer"
        onClick={handleAppleLogin}
        disabled={!!error || !identifier}
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
    </div>
  );
};

export default RideLogin;
