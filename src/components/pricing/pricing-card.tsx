
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  description: string;
  features: PricingFeature[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <Card className={`w-full ${plan.popular ? 'border-2 border-lotofacil-purple' : ''}`}>
      {plan.popular && (
        <div className="bg-lotofacil-gradient text-white text-center py-1 font-semibold text-sm">
          Mais Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
          <span className="text-muted-foreground">/{plan.period === "month" ? "mês" : "ano"}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1">
                <Check
                  size={16}
                  className={feature.included ? "text-lotofacil-green" : "text-muted-foreground"}
                />
              </div>
              <span className={!feature.included ? "text-muted-foreground" : ""}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={plan.popular ? "w-full bg-lotofacil-gradient hover:opacity-90" : "w-full"} 
          variant={plan.popular ? "default" : "outline"}
          onClick={() => window.location.href = '/subscribe'}
        >
          {plan.id === "free" ? "Criar Conta Grátis" : "Assinar Agora"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
