
import { Strategy } from "@/components/lotofacil/strategy-card";

export const strategies: Strategy[] = [
  {
    id: "avoid-previous",
    name: "Evitar Combinações Já Sorteadas",
    description: "Elimina jogos que já foram premiados anteriormente",
    premium: true,
  },
  {
    id: "balance-odd-even",
    name: "Balancear Pares/Ímpares",
    description: "Mantém uma proporção ideal de 7-8 ou 8-7 números pares e ímpares",
    premium: false,
  },
  {
    id: "double-prize",
    name: "Dobrar Premiação",
    description: "Gera jogos com 16-17 números para aumentar chances de múltiplos acertos",
    premium: true,
  },
  {
    id: "extremes",
    name: "Atenção às Bolas 1 e 15",
    description: "Foca nos números extremos dos sorteios",
    premium: false,
  },
  {
    id: "primes",
    name: "Números Primos",
    description: "Prioriza números primos (2,3,5,7,11,13,17,19,23)",
    premium: false,
  },
  {
    id: "cycle",
    name: "Ciclo de Dezenas Não Sorteadas",
    description: "Identifica números que não apareceram nos últimos concursos",
    premium: false,
  },
];
