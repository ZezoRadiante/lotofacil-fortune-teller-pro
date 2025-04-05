
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface Strategy {
  id: string;
  name: string;
  description: string;
  premium: boolean;
}

interface StrategyCardProps {
  strategy: Strategy;
  selected: boolean;
  onToggle: () => void;
  isPremium: boolean;
}

const StrategyCard = ({ strategy, selected, onToggle, isPremium }: StrategyCardProps) => {
  return (
    <Card className={`w-full ${strategy.premium && !isPremium ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{strategy.name}</CardTitle>
          {strategy.premium && (
            <span className="bg-lotofacil-gradient text-white text-xs px-2 py-1 rounded">
              Premium
            </span>
          )}
        </div>
        <CardDescription>{strategy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`strategy-${strategy.id}`} 
            checked={selected}
            onCheckedChange={onToggle}
            disabled={strategy.premium && !isPremium}
          />
          <Label htmlFor={`strategy-${strategy.id}`}>
            Ativar esta estratégia
          </Label>
        </div>
      </CardContent>
      {strategy.premium && !isPremium && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white"
            onClick={() => window.location.href = '/subscribe'}
          >
            Assinar para desbloquear
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StrategyCard;
