
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Ball from "./ball";
import { Skeleton } from "@/components/ui/skeleton";

interface EstatisticasCardProps {
  title: string;
  numeros: number[];
  isLoading?: boolean;
}

const EstatisticasCard = ({ title, numeros, isLoading = false }: EstatisticasCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {numeros.map((number) => (
              <Ball key={number} number={number} selected={true} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EstatisticasCard;
