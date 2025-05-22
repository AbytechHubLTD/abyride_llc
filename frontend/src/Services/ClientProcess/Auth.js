import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthService = {
  sendOtp: async (identifier) => {
    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) throw new Error("Failed to send OTP.");
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  verifyOtp: async (identifier) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) throw new Error("Failed to send OTP.");
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProfile: async (formData) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      throw error.response.data || { message: "Something went wrong!" };
    }
  },

  getUser: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
};

export default AuthService;
