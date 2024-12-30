import React from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/signinService";
import { Button } from "../@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const { token, clearToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      clearToken(); // Clear token from AuthContext
      queryClient.invalidateQueries(["auth"]); // Invalidate auth-related queries
      console.log("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (token) {
    return (
      <Button onClick={handleLogout} disabled={logoutMutation.isLoading}>
        {logoutMutation.isLoading ? "Logging out..." : "Logout"}
      </Button>
    );
  }

  return <Button onClick={() => navigate("/login")}>Login</Button>;
};

export default LogoutButton;
