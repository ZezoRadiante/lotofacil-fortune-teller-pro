
export interface LotofacilResult {
  concurso: number;
  data: string;
  dezenas: number[];
}

export const recentResults: LotofacilResult[] = [
  {
    concurso: 2989,
    data: "2023-04-01",
    dezenas: [1, 2, 3, 4, 6, 9, 10, 11, 13, 14, 17, 18, 21, 23, 25],
  },
  {
    concurso: 2988,
    data: "2023-03-29",
    dezenas: [2, 3, 5, 6, 7, 9, 10, 13, 15, 17, 19, 20, 21, 22, 23],
  },
  {
    concurso: 2987,
    data: "2023-03-27",
    dezenas: [1, 2, 5, 6, 9, 10, 11, 12, 13, 15, 16, 20, 22, 24, 25],
  },
  {
    concurso: 2986,
    data: "2023-03-25",
    dezenas: [1, 3, 4, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 21, 25],
  },
  {
    concurso: 2985,
    data: "2023-03-23",
    dezenas: [2, 3, 6, 7, 8, 10, 11, 13, 14, 17, 18, 21, 22, 23, 24],
  },
];

// Função para simular busca de resultados da API
export const fetchResults = async (): Promise<LotofacilResult[]> => {
  // Simula atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Em uma implementação real, isso seria uma chamada à API
  return recentResults;
};
