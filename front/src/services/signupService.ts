import axios from "axios";

// Define the API base URL
const API_BASE_URL = "http://localhost:3000/auth";

// Define the signup function
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
  plan: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // Return the response data
  } catch (error: any) {
    // Ensure error is properly handled and forwarded to the frontend
    if (error.response) {
      // Backend responded with a status code outside the range of 2xx
      throw new Error(error.response.data?.error || "Signup failed");
    } else if (error.request) {
      // No response received (e.g., network error)
      throw new Error("No response from the server. Please check your connection.");
    } else {
      // Something else happened while setting up the request
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};
