
import React from "react";
import AuthCard from "@/components/auth/auth-card";
import Navbar from "@/components/navbar";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const from = location.state?.from || "/dashboard";

  // If user is already authenticated, redirect to the intended page
  if (isAuthenticated && !isLoading) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <AuthCard isLogin={true} redirectTo={from} />
      </div>
    </div>
  );
};

export default Login;
