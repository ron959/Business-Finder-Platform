import axios from "axios";
import { Dispatch } from "react";

// Define the API base URL
const API_BASE_URL = "http://localhost:3000/auth";

// Login function that accepts email, password, and a dispatch function from AuthContext
export const login = async (
  email: string,
  password: string,
  setToken: Dispatch<string | null>
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Login failed");
    }

    const { token } = await response.json();

    // Save token in sessionStorage
    sessionStorage.setItem("token", token);

    // Dispatch the token to AuthContext
    setToken(token);

    console.log("Login successful!");
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    sessionStorage.removeItem("token");
    resolve(); // Marks the Promise as fulfilled
  });
};
