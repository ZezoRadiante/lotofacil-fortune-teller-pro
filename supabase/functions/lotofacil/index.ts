
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "getResultados") {
      const { data, error } = await supabaseClient
        .from("lotofacil_resultados")
        .select("*")
        .order("concurso", { ascending: false })
        .limit(10);

      if (error) throw error;

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (action === "getEstatisticas") {
      const { data, error } = await supabaseClient
        .from("lotofacil_estatisticas")
        .select("*")
        .order("frequencia", { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Função para inicializar o banco de dados com dados de exemplo
    if (action === "initializeData") {
      const { data: existingData, error: checkError } = await supabaseClient
        .from("lotofacil_resultados")
        .select("id")
        .limit(1);

      if (checkError) throw checkError;

      // Se já existirem dados, não inicialize novamente
      if (existingData && existingData.length > 0) {
        return new Response(
          JSON.stringify({ message: "Dados já inicializados" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }

      // Usando os dados do mock para inicializar
      const mockData = [
        {
          concurso: 2989,
          data_sorteio: "2023-04-01",
          dezenas: [1, 2, 3, 4, 6, 9, 10, 11, 13, 14, 17, 18, 21, 23, 25],
        },
        {
          concurso: 2988,
          data_sorteio: "2023-03-29",
          dezenas: [2, 3, 5, 6, 7, 9, 10, 13, 15, 17, 19, 20, 21, 22, 23],
        },
        {
          concurso: 2987,
          data_sorteio: "2023-03-27",
          dezenas: [1, 2, 5, 6, 9, 10, 11, 12, 13, 15, 16, 20, 22, 24, 25],
        },
        {
          concurso: 2986,
          data_sorteio: "2023-03-25",
          dezenas: [1, 3, 4, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 21, 25],
        },
        {
          concurso: 2985,
          data_sorteio: "2023-03-23",
          dezenas: [2, 3, 6, 7, 8, 10, 11, 13, 14, 17, 18, 21, 22, 23, 24],
        },
      ];

      // Inserir resultados
      const { error: insertError } = await supabaseClient
        .from("lotofacil_resultados")
        .insert(mockData);

      if (insertError) throw insertError;

      // Calcular e inserir estatísticas
      const numeroFrequencia = {};
      const ultimoSorteio = {};

      // Contar frequência de cada número e último sorteio
      mockData.forEach((resultado) => {
        resultado.dezenas.forEach((numero) => {
          numeroFrequencia[numero] = (numeroFrequencia[numero] || 0) + 1;
          ultimoSorteio[numero] = resultado.concurso;
        });
      });

      // Preparar dados para inserção
      const estatisticasData = Object.keys(numeroFrequencia).map((numero) => ({
        numero: parseInt(numero),
        frequencia: numeroFrequencia[numero],
        ultimo_sorteio: ultimoSorteio[numero],
      }));

      // Inserir estatísticas
      const { error: statsError } = await supabaseClient
        .from("lotofacil_estatisticas")
        .insert(estatisticasData);

      if (statsError) throw statsError;

      return new Response(
        JSON.stringify({ message: "Dados inicializados com sucesso" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Retornar erro se a ação não for reconhecida
    return new Response(
      JSON.stringify({ error: "Ação não reconhecida" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  } catch (error) {
    console.error("Erro na função lotofacil:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
