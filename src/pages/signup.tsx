
import React from "react";
import AuthCard from "@/components/auth/auth-card";
import Navbar from "@/components/navbar";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <AuthCard isLogin={false} />
      </div>
    </div>
  );
};

export default Signup;
