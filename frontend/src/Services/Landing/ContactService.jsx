import axios from "axios";

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

export const ContactService = {
  // Register user
  ContactUs: async (userData) => {
    try {
      // Append the endpoint to the base URL
      const response = await axios.post(`${API_URL}/contact-us`, userData);
      return response.data; // Success response
    } catch (error) {
      // Handle errors and display specific error messages
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message ||
            "An error occurred during registration",
        );
      } else {
        throw new Error("An error occurred during registration");
      }
    }
  },

  // Register user
  RequestRide: async (userData) => {
    try {
      // Append the endpoint to the base URL
      const response = await axios.post(
        `${API_URL}/api/admin/auth/register`,
        userData,
      );
      return response.data; // Success response
    } catch (error) {
      // Handle errors and display specific error messages
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message ||
            "An error occurred during registration",
        );
      } else {
        throw new Error("An error occurred during registration");
      }
    }
  },
};
