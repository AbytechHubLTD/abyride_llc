import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/ClientProcess/Auth";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/ClientAuthContext";

const VerifyClient = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const location = useLocation();
  const [newuser, setNewuser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, code.length);
  }, [code.length]);

  useEffect(() => {
    if (location.state) {
      setNewuser(location.state);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const { verifyOtp } = useAuth();

  useEffect(() => {
    if (!newuser && !location.state) {
      navigate("/AbyrideClient", { replace: true });
    }
  }, [newuser, location.state, navigate]);

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, code.length);
    if (digits.length > 0) {
      const newCode = Array(code.length).fill("");
      [...digits].forEach((digit, index) => {
        if (index < code.length) newCode[index] = digit;
      });
      setCode(newCode);
      const focusIndex = Math.min(digits.length, code.length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    if (code.includes("") || !newuser) return;
    setIsLoading(true);
    try {
      const response = await verifyOtp({
        identifier: newuser.newuser.identifier,
        otp: code.join(""),
        code: newuser.newuser.code
      });

      if (newuser.newuser.exist) {
        Swal.fire("Success", "OTP verified successfully!", "success");
        setTimeout(() => {
          navigate("/booking", { replace: true });
        }, 300); // Change to 3000 for a 3-second delay
      } else {
        Swal.fire(
          "Info",
          "OTP verified. Please complete your profile.",
          "info",
        );
        setTimeout(() => {
          navigate("/AbyrideClient/fillUserInfo", {
            replace: true,
            state: newuser,
          });
        }, 1000); // Change to 3000 for a 3-second delay
      }
    } catch (err) {
      Swal.fire("Error", "OTP Verification failed. Please try again.", "error");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-md text-center mt-40">
        <h1 className="text-2xl font-semibold mb-4">
          {newuser?.newuser?.exist
            ? `Welcome back, ${newuser?.newuser?.username}.`
            : `Hi there, ${newuser?.usercontact}`}
        </h1>

        <p className="text-gray-600 mb-6">
          Enter the 4-digit code sent{" "}
          {newuser?.isEmail
            ? `${newuser?.usercontact
                .split("@")
                ?.map((part, index) =>
                  index === 0 ? part[0] + "*".repeat(part.length - 1) : part,
                )
                .join("@")}`
            : `${newuser?.usercontact?.slice(0, -4).replace(/\d/g, "*") + newuser?.usercontact?.slice(-4)}`}
        </p>

        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              maxLength="1"
              inputMode="numeric"
              value={digit}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 border-2 text-black border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          ))}
        </div>

        <button
          className="bg-primaryred p-2 w-full rounded-md border-2 text-white disabled:opacity-50"
          disabled={code.includes("") || isLoading}
          onClick={handleVerify}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyClient;
