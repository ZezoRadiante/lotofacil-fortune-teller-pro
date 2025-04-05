
import { supabase } from "@/integrations/supabase/client";
import { LotofacilResult } from "@/data/results";
import { Database } from "@/integrations/supabase/types";

// Interface para estatísticas da Lotofácil
export interface LotofacilEstatistica {
  id: number;
  numero: number;
  frequencia: number;
  ultimo_sorteio: number | null;
}

// Função para buscar os resultados da Lotofácil do Supabase
export const fetchResultsFromSupabase = async (): Promise<LotofacilResult[]> => {
  try {
    const { data, error } = await supabase
      .from("lotofacil_resultados")
      .select("*")
      .order("concurso", { ascending: false })
      .limit(10);

    if (error) throw error;

    return data.map((result) => ({
      concurso: result.concurso,
      data: result.data_sorteio,
      dezenas: result.dezenas,
    }));
  } catch (error) {
    console.error("Erro ao buscar resultados da Lotofácil:", error);
    // Fallback para os dados simulados em caso de erro
    const { fetchResults } = await import("@/data/results");
    return fetchResults();
  }
};

// Função para buscar estatísticas da Lotofácil
export const fetchEstatisticas = async (): Promise<LotofacilEstatistica[]> => {
  try {
    const { data, error } = await supabase
      .from("lotofacil_estatisticas")
      .select("*")
      .order("frequencia", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas da Lotofácil:", error);
    return [];
  }
};

// Função para inicializar o banco de dados com dados de exemplo
export const initializeDatabase = async (): Promise<boolean> => {
  try {
    const response = await fetch("https://nfxiyupspeidryqmptkh.supabase.co/functions/v1/lotofacil?action=initializeData");
    
    if (!response.ok) {
      throw new Error(`Erro ao inicializar banco de dados: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    return false;
  }
};

// Função para obter os números mais frequentes
export const getNumerosMaisFrequentes = async (limite: number = 10): Promise<number[]> => {
  const estatisticas = await fetchEstatisticas();
  return estatisticas.slice(0, limite).map(est => est.numero);
};

// Função para obter os números menos frequentes
export const getNumerosAusentes = async (limite: number = 5): Promise<number[]> => {
  const estatisticas = await fetchEstatisticas();
  return estatisticas.slice(-limite).map(est => est.numero);
};
