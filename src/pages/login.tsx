
import React from "react";
import AuthCard from "@/components/auth/auth-card";
import Navbar from "@/components/navbar";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

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
