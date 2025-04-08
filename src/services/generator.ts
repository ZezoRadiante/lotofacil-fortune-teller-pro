
import { isPrime, countOddEven, arraysEqual, getRandomNumber } from "@/lib/utils";
import { recentResults } from "@/data/results";

interface GeneratorOptions {
  quantity: number;
  strategies: {
    avoidPrevious: boolean;
    balanceOddEven: boolean;
    doublePrize: boolean;
    extremes: boolean;
    primes: boolean;
    cycle: boolean;
  };
  maxGames?: number; // Adicionado maxGames como opção para limitar jogos
}

// Gera um jogo aleatório com 15 números entre 1 e 25
const generateTicket = (size: number = 15): number[] => {
  const ticket: number[] = [];
  while (ticket.length < size) {
    const number = getRandomNumber(1, 25);
    if (!ticket.includes(number)) {
      ticket.push(number);
    }
  }
  return ticket.sort((a, b) => a - b);
};

// Verifica se o jogo já foi sorteado anteriormente
const isTicketPreviouslySorted = (ticket: number[]): boolean => {
  return recentResults.some((result) => arraysEqual(ticket, result.dezenas));
};

// Verifica se o jogo tem uma boa proporção de pares e ímpares
const hasGoodOddEvenBalance = (ticket: number[]): boolean => {
  const { odd, even } = countOddEven(ticket);
  return (
    (odd === 7 && even === 8) ||
    (odd === 8 && even === 7) ||
    (odd === 8 && even === 9) ||
    (odd === 9 && even === 8)
  );
};

// Verifica se o jogo contém os números extremos (1 e 25) ou próximos
const hasExtremeNumbers = (ticket: number[]): boolean => {
  const hasLow = ticket.some((n) => n <= 3);
  const hasHigh = ticket.some((n) => n >= 23);
  return hasLow && hasHigh;
};

// Verifica se o jogo tem uma quantidade razoável de números primos
const hasPrimeNumbers = (ticket: number[]): boolean => {
  const primeCount = ticket.filter((n) => isPrime(n)).length;
  return primeCount >= 4 && primeCount <= 8;
};

// Verifica se o jogo contém números que não apareceram recentemente
const hasCycleNumbers = (ticket: number[]): boolean => {
  // Obter todos os números que apareceram nos últimos sorteios
  const recentNumbers = new Set<number>();
  recentResults.slice(0, 3).forEach((result) => {
    result.dezenas.forEach((n) => recentNumbers.add(n));
  });
  
  // Verificar se o jogo contém pelo menos alguns números que não apareceram recentemente
  const missingCount = ticket.filter((n) => !recentNumbers.has(n)).length;
  return missingCount >= 3;
};

export const generateGames = (options: GeneratorOptions): number[][] => {
  const games: number[][] = [];
  const { quantity, strategies, maxGames } = options;
  
  // Aplicar o limite máximo de jogos com base no plano do usuário
  const actualQuantity = Math.min(quantity, maxGames || 15);
  
  // Garantir que não exceda o limite definido no plano
  if (quantity > actualQuantity) {
    console.log(`Limite de jogos excedido. Solicitado: ${quantity}, Permitido: ${actualQuantity}`);
  }
  
  // Aumentar o tamanho do jogo para 16 ou 17 números se a estratégia doublePrize estiver ativa
  const gameSize = strategies.doublePrize ? (Math.random() > 0.5 ? 16 : 17) : 15;
  
  let attempts = 0;
  const maxAttempts = actualQuantity * 100; // Limite para evitar loop infinito
  
  while (games.length < actualQuantity && attempts < maxAttempts) {
    attempts++;
    
    let game = generateTicket(gameSize);
    let isValid = true;
    
    // Aplicar validações conforme as estratégias selecionadas
    if (strategies.avoidPrevious && isTicketPreviouslySorted(game)) {
      isValid = false;
    }
    
    if (strategies.balanceOddEven && !hasGoodOddEvenBalance(game)) {
      isValid = false;
    }
    
    if (strategies.extremes && !hasExtremeNumbers(game)) {
      isValid = false;
    }
    
    if (strategies.primes && !hasPrimeNumbers(game)) {
      isValid = false;
    }
    
    if (strategies.cycle && !hasCycleNumbers(game)) {
      isValid = false;
    }
    
    if (isValid) {
      // Verificar se não é duplicado
      const isDuplicate = games.some((existingGame) => 
        arraysEqual(existingGame, game)
      );
      
      if (!isDuplicate) {
        games.push(game);
      }
    }
  }
  
  return games;
};
