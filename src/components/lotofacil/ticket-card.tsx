
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Ball from "./ball";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { countOddEven } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface TicketCardProps {
  numbers: number[];
  index: number;
}

const TicketCard = ({ numbers, index }: TicketCardProps) => {
  const { toast } = useToast();
  const { odd, even } = countOddEven(numbers);

  const handleCopy = () => {
    const text = numbers.join(", ");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado para a área de transferência",
      description: `Jogo ${index + 1}: ${text}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Jogo {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {numbers.map((number) => (
            <Ball key={number} number={number} selected />
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          <span className="mr-4">Ímpares: {odd}</span>
          <span>Pares: {even}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy size={16} className="mr-1" /> Copiar
        </Button>
        <Button variant="outline" size="sm">
          <Download size={16} className="mr-1" /> Salvar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
