
import React from "react";
import { cn } from "@/lib/utils";

interface BallProps {
  number: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Ball = ({ number, selected = false, onClick, className }: BallProps) => {
  return (
    <div
      className={cn(
        "ball",
        selected ? "bg-lotofacil-purple" : "bg-gray-200 text-gray-700",
        onClick ? "cursor-pointer hover:opacity-80" : "",
        className
      )}
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default Ball;
