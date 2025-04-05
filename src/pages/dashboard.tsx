
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import NumberGrid from "@/components/lotofacil/number-grid";
import StrategyCard, { Strategy } from "@/components/lotofacil/strategy-card";
import { strategies } from "@/data/strategies";
import TicketCard from "@/components/lotofacil/ticket-card";
import { generateGames } from "@/services/generator";
import { fetchResults, LotofacilResult } from "@/data/results";
import ResultsCard from "@/components/lotofacil/results-card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("generator");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [activeStrategies, setActiveStrategies] = useState<string[]>([]);
  const [gameQuantity, setGameQuantity] = useState<number>(5);
  const [generatedGames, setGeneratedGames] = useState<number[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [results, setResults] = useState<LotofacilResult[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  
  // Mock premium status
  const isPremium = true;

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      if (selectedNumbers.length < 10) {
        setSelectedNumbers([...selectedNumbers, number]);
      } else {
        toast({
          title: "Limite de números",
          description: "Você pode selecionar no máximo 10 números fixos",
          variant: "destructive",
        });
      }
    }
  };

  const toggleStrategy = (strategyId: string) => {
    if (activeStrategies.includes(strategyId)) {
      setActiveStrategies(activeStrategies.filter((id) => id !== strategyId));
    } else {
      setActiveStrategies([...activeStrategies, strategyId]);
    }
  };

  const handleGenerateGames = () => {
    setIsGenerating(true);
    
    // Simulate server processing
    setTimeout(() => {
      try {
        const options = {
          quantity: gameQuantity,
          strategies: {
            avoidPrevious: activeStrategies.includes("avoid-previous"),
            balanceOddEven: activeStrategies.includes("balance-odd-even"),
            doublePrize: activeStrategies.includes("double-prize"),
            extremes: activeStrategies.includes("extremes"),
            primes: activeStrategies.includes("primes"),
            cycle: activeStrategies.includes("cycle"),
          },
        };
        
        const games = generateGames(options);
        
        // Include fixed numbers if selected
        if (selectedNumbers.length > 0) {
          for (let i = 0; i < games.length; i++) {
            games[i] = [...selectedNumbers, ...games[i].filter(n => !selectedNumbers.includes(n))].slice(0, games[i].length);
            games[i].sort((a, b) => a - b);
          }
        }
        
        setGeneratedGames(games);
        setSelectedTab("results");
        
        toast({
          title: "Jogos gerados com sucesso!",
          description: `${games.length} jogos foram gerados com base nas estratégias selecionadas.`,
        });
      } catch (error) {
        toast({
          title: "Erro ao gerar jogos",
          description: "Ocorreu um erro ao gerar os jogos. Tente novamente.",
          variant: "destructive",
        });
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const loadResults = async () => {
    setIsLoadingResults(true);
    try {
      const data = await fetchResults();
      setResults(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar resultados",
        description: "Não foi possível carregar os últimos resultados da Lotofácil",
        variant: "destructive",
      });
    }
    setIsLoadingResults(false);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Seu Painel</h1>
              <p className="text-muted-foreground">
                Gere jogos inteligentes com estratégias avançadas
              </p>
            </div>
            <Badge className="bg-lotofacil-gradient">
              {isPremium ? "Plano Fortune" : "Plano Básico"}
            </Badge>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="generator">Gerar Jogos</TabsTrigger>
              <TabsTrigger value="results">Jogos Gerados</TabsTrigger>
              <TabsTrigger value="lottery">Últimos Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Selecione Números Fixos (opcional)</CardTitle>
                      <CardDescription>
                        Escolha até 10 números que devem aparecer em todos os jogos gerados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NumberGrid 
                        selectedNumbers={selectedNumbers} 
                        onToggleNumber={toggleNumber} 
                      />
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {selectedNumbers.length} de 10 números selecionados
                        </div>
                        {selectedNumbers.length > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedNumbers([])}
                          >
                            Limpar Seleção
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quantidade de Jogos</CardTitle>
                      <CardDescription>
                        Escolha quantos jogos deseja gerar (máximo: 15)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[5]}
                          max={15}
                          min={1}
                          step={1}
                          onValueChange={(values) => setGameQuantity(values[0])}
                        />
                        <div className="text-center font-semibold text-2xl">
                          {gameQuantity} {gameQuantity === 1 ? "jogo" : "jogos"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    className="w-full bg-lotofacil-gradient hover:opacity-90 py-6 text-lg"
                    onClick={handleGenerateGames}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Gerando jogos..." : "Gerar Jogos Inteligentes"}
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estratégias Inteligentes</CardTitle>
                      <CardDescription>
                        Selecione as estratégias que deseja aplicar aos seus jogos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {strategies.map((strategy) => (
                          <StrategyCard
                            key={strategy.id}
                            strategy={strategy}
                            selected={activeStrategies.includes(strategy.id)}
                            onToggle={() => toggleStrategy(strategy.id)}
                            isPremium={isPremium}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              {generatedGames.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Seus Jogos Gerados</h2>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTab("generator")}
                    >
                      Gerar Mais Jogos
                    </Button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedGames.map((game, index) => (
                      <TicketCard key={index} numbers={game} index={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Nenhum jogo gerado ainda</h2>
                  <p className="text-muted-foreground mb-6">
                    Vá para a aba "Gerar Jogos" para criar seus jogos inteligentes
                  </p>
                  <Button 
                    onClick={() => setSelectedTab("generator")}
                    className="bg-lotofacil-gradient hover:opacity-90"
                  >
                    Gerar Jogos Agora
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="lottery">
              <div>
                <h2 className="text-2xl font-bold mb-6">Últimos Resultados da Lotofácil</h2>
                
                {isLoadingResults ? (
                  <div className="text-center py-12">
                    <p>Carregando resultados...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((result) => (
                      <ResultsCard
                        key={result.concurso}
                        concurso={result.concurso}
                        data={result.data}
                        dezenas={result.dezenas}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Não foi possível carregar os resultados
                    </p>
                    <Button 
                      onClick={loadResults}
                      className="mt-4"
                      variant="outline"
                    >
                      Tentar novamente
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Lotofácil Fortune. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Este site não tem vínculo com a Caixa Econômica Federal ou qualquer loteria oficial.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
