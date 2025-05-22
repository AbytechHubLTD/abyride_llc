import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import userService from "../../../Services/ClientProcess/Auth";
import { useAuth } from "../../../context/ClientAuthContext";
import DashboardNavbar from "../../../components/DashboardNavbar";

const FillUserInfo = () => {
  const { isAuthenticated, user } = useAuth();

  const [values, setValues] = useState({
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    email: "",
    phone: "",
  });
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { updateClient } = useAuth();

  const [errors, setErrors] = useState({
    firstName: { message: "", isNotValid: false },
    lastName: { message: "", isNotValid: false },
  });

  const handleChangeVal = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]:
        value.trim() === ""
          ? { message: `${name} is required`, isNotValid: true }
          : { message: "", isNotValid: false },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      Swal.fire("Error", "You are not authenticated", "error");
      navigate("/rideLogin", { replace: true });
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(values).forEach(
        (key) => values[key] && formData.append(key, values[key]),
      );
      if (profilePic) formData.append("profilePic", profilePic);

      const response = await updateClient(formData);
      if (response?.updateUser) {
        Swal.fire("Success", "Profile updated successfully", "success").then(
          () => {
            setTimeout(() => {
              navigate("/booking", { replace: true });
            }, 2000); // Delay of 2000ms (2 seconds) before redirect
          },
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="bg-white gap-20 items-center w-screen h-screen top-0 left-0 z-[20] fixed   flex-col flex">
      <DashboardNavbar />
      <div className="flex justify-center py-8 items-center w-full flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md justify-center gap-2 items-start p-4 w-full md:w-1/2 xl:w-1/3 bg-white border rounded-md flex-col"
          encType="multipart/form-data"
        >
          <h1 className="text-2xl uppercase font-semibold">User Info</h1>

          <label htmlFor="firstName" className="capitalize">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            className={`p-2 border rounded-md focus:ring-2 text-gray-700 focus:ring-blue-500 w-full focus:border-blue-500 ${errors.firstName.isNotValid ? "border-red-500" : ""}`}
            onChange={handleChangeVal}
          />
          {errors.firstName.isNotValid && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}

          <label htmlFor="lastName" className="capitalize">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            className={`p-2 border rounded-md focus:ring-2 text-gray-700 focus:ring-blue-500 w-full focus:border-blue-500 ${errors.lastName.isNotValid ? "border-red-500" : ""}`}
            onChange={handleChangeVal}
          />
          {errors.lastName.isNotValid && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-primaryred p-2 w-full rounded-md border-2 text-white disabled:opacity-50 mt-4"
            disabled={errors.firstName.isNotValid || errors.lastName.isNotValid}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default FillUserInfo;
