import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useDriveStore from "../stores/useDriverStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function DriverRegister() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setIsAuthenticated, setGoogleAccountName, setCredentialToken } =
    useDriveStore();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //waiting for backend
      toast.success("login successfully");
      setIsAuthenticated(true);
      navigate("/apply");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { access_token, token_type } = credentialResponse;
      const {
        data: { name },
      } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      });
      toast.success("login successfully");
      setGoogleAccountName(name);
      setIsAuthenticated(true);
      navigate("/apply");
    },
    onError: (responseError) => {
      toast.error("failed to login with google");
      console.log(responseError);
    },
  });
  return (
    <div className="flex items-center  justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-sm">
        <h1 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Register as Driver
        </h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 text-base pl-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg mb-2 focus:outline-none text-black ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 text-base pl-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg mb-2 focus:outline-none text-black ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-gray-500"
              }`}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full max-w-md bg-black text-white p-3 rounded-lg text-center text-lg font-medium hover:bg-gray-800 transition mb-2"
          >
            Sign Up
          </button>
          {/* Separator */}
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          {/* Continue with Google */}
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full max-w-md flex items-center justify-center bg-gray-100 border border-gray-300 p-3 rounded-lg text-center text-lg font-medium text-gray-700 hover:bg-gray-200 transition mb-4 cursor-pointer"
          >
            <FcGoogle size={22} style={{ margin: "5" }} />
            Continue with Google
          </button>

          {/* Separator */}
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <hr className="flex-grow border-gray-300" />
          </div>
          <Link
            to={"/driverLogin"}
            className="text-sm block px-2 hover:text-gray-600 hover:underline"
          >
            Already have an account? Sign In.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default DriverRegister;
