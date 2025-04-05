
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Ball from "./ball";
import { formatDate } from "@/lib/utils";

interface LastResultProps {
  concurso: number;
  data: string;
  dezenas: number[];
}

const LastResult = ({ concurso, data, dezenas }: LastResultProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Concurso {concurso} - {formatDate(data)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 justify-center">
          {dezenas.map((number) => (
            <Ball key={number} number={number} selected />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LastResult;
