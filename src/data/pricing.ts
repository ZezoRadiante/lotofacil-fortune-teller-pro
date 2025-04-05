
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  description: string;
  features: {
    name: string;
    included: boolean;
  }[];
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Plano Básico",
    price: 0,
    period: "month",
    description: "Para jogadores casuais",
    features: [
      { name: "Geração de 1 jogo por dia", included: true },
      { name: "Acesso aos últimos resultados", included: true },
      { name: "Estratégias básicas", included: true },
      { name: "Geração ilimitada de jogos", included: false },
      { name: "Estratégias avançadas", included: false },
      { name: "Estatísticas detalhadas", included: false },
    ],
  },
  {
    id: "pro",
    name: "Plano Fortune",
    price: 19.9,
    period: "month",
    description: "Para jogadores dedicados",
    features: [
      { name: "Geração de 1 jogo por dia", included: true },
      { name: "Acesso aos últimos resultados", included: true },
      { name: "Estratégias básicas", included: true },
      { name: "Geração ilimitada de jogos", included: true },
      { name: "Estratégias avançadas", included: true },
      { name: "Estatísticas detalhadas", included: false },
    ],
    popular: true,
  },
  {
    id: "ultimate",
    name: "Plano Pro Fortune",
    price: 39.9,
    period: "month",
    description: "Para jogadores profissionais",
    features: [
      { name: "Geração de 1 jogo por dia", included: true },
      { name: "Acesso aos últimos resultados", included: true },
      { name: "Estratégias básicas", included: true },
      { name: "Geração ilimitada de jogos", included: true },
      { name: "Estratégias avançadas", included: true },
      { name: "Estatísticas detalhadas", included: true },
    ],
  },
];
