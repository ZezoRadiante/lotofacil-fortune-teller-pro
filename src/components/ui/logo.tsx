
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <div className="rounded-lg p-1 bg-lotofacil-gradient text-white font-bold text-xl">LF</div>
        <div className="ml-2 font-extrabold text-transparent bg-clip-text bg-lotofacil-gradient">
          Lotofácil Fortune
        </div>
      </div>
    </div>
  );
};

export default Logo;
