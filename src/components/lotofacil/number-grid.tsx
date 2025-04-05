
import React from "react";
import Ball from "./ball";
import { cn } from "@/lib/utils";

interface NumberGridProps {
  maxNumber?: number;
  selectedNumbers: number[];
  onToggleNumber: (number: number) => void;
  className?: string;
  disabled?: boolean;
}

const NumberGrid = ({
  maxNumber = 25,
  selectedNumbers,
  onToggleNumber,
  className,
  disabled = false
}: NumberGridProps) => {
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className={cn("number-grid", className)}>
      {numbers.map((number) => (
        <Ball
          key={number}
          number={number}
          selected={selectedNumbers.includes(number)}
          onClick={disabled ? undefined : () => onToggleNumber(number)}
        />
      ))}
    </div>
  );
};

export default NumberGrid;
