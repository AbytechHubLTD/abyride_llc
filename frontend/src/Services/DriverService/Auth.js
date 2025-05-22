import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authService = {
  loginWithGoogle: () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    return window.open(
      `${API_URL}/driver/google`,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=no,resizable=no`,
    );
  },

  getUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
};

export default authService;
