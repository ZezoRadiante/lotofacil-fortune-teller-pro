
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
  maxGamesPerDay?: number; // New property for max games per day
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Plano Básico",
    price: 0,
    period: "month",
    description: "Para jogadores casuais",
    maxGamesPerDay: 1,
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
    maxGamesPerDay: 5,
    features: [
      { name: "Geração de 5 jogos por dia", included: true }, // Updated to 5 games
      { name: "Acesso aos últimos resultados", included: true },
      { name: "Estratégias básicas", included: true },
      { name: "Geração ilimitada de jogos", included: false }, // Changed to false
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
    maxGamesPerDay: 10,
    features: [
      { name: "Geração de 10 jogos por dia", included: true }, // Updated to 10 games
      { name: "Acesso aos últimos resultados", included: true },
      { name: "Estratégias básicas", included: true },
      { name: "Geração ilimitada de jogos", included: false }, // Changed to false
      { name: "Estratégias avançadas", included: true },
      { name: "Estatísticas detalhadas", included: true },
    ],
  },
];
