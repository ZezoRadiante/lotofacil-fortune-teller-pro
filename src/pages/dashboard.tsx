
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import NumberGrid from "@/components/lotofacil/number-grid";
import StrategyCard from "@/components/lotofacil/strategy-card";
import { strategies } from "@/data/strategies";
import TicketCard from "@/components/lotofacil/ticket-card";
import { generateGames } from "@/services/generator";
import { LotofacilResult } from "@/data/results";
import ResultsCard from "@/components/lotofacil/results-card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import EstatisticasCard from "@/components/lotofacil/estatisticas-card";
import { 
  fetchResultsFromSupabase, 
  fetchEstatisticas, 
  initializeDatabase,
  getNumerosMaisFrequentes,
  getNumerosAusentes
} from "@/services/lotofacil";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { pricingPlans } from "@/data/pricing";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("generator");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [activeStrategies, setActiveStrategies] = useState<string[]>([]);
  const [gameQuantity, setGameQuantity] = useState<number>(1); // Começa com o valor mínimo
  const [generatedGames, setGeneratedGames] = useState<number[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const { userRole } = useAuth();
  
  const isSubscribed = userRole === 'premium' || userRole === 'admin';
  
  // Função que determina o número máximo de jogos por dia com base no plano do usuário
  const getMaxGamesPerDay = (): number => {
    if (userRole === 'admin') {
      return 15; // Usuários admin têm um limite maior para testes
    } else if (userRole === 'premium') {
      // Verifica se o usuário tem plano premium
      const ultimatePlan = pricingPlans.find(plan => plan.id === 'ultimate');
      return ultimatePlan?.maxGamesPerDay || 10;
    } else if (isSubscribed) {
      // Outros usuários assinantes (plano pro)
      const proPlan = pricingPlans.find(plan => plan.id === 'pro');
      return proPlan?.maxGamesPerDay || 5;
    } else {
      // Usuários gratuitos
      const freePlan = pricingPlans.find(plan => plan.id === 'free');
      return freePlan?.maxGamesPerDay || 1;
    }
  };
  
  const maxGames = getMaxGamesPerDay();
  const maxSelectedNumbers = isSubscribed ? 10 : 3;

  // Atualiza o gameQuantity quando o maxGames muda ou é inicializado
  useEffect(() => {
    if (gameQuantity > maxGames) {
      setGameQuantity(maxGames);
    }
  }, [isSubscribed, gameQuantity, maxGames]);

  useEffect(() => {
    initializeDatabase()
      .then(success => {
        if (success) {
          console.log("Banco de dados inicializado com sucesso");
        }
      })
      .catch(error => {
        console.error("Erro ao inicializar banco de dados:", error);
      });
  }, []);

  const { 
    data: results = [], 
    isLoading: isLoadingResults 
  } = useQuery({
    queryKey: ['lotofacil-resultados'],
    queryFn: fetchResultsFromSupabase
  });

  const { 
    data: numerosMaisFrequentes = [], 
    isLoading: isLoadingFrequentes 
  } = useQuery({
    queryKey: ['lotofacil-frequentes'],
    queryFn: () => getNumerosMaisFrequentes(10)
  });

  const { 
    data: numerosAusentes = [], 
    isLoading: isLoadingAusentes 
  } = useQuery({
    queryKey: ['lotofacil-ausentes'],
    queryFn: () => getNumerosAusentes(5)
  });

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      if (selectedNumbers.length < maxSelectedNumbers) {
        setSelectedNumbers([...selectedNumbers, number]);
      } else {
        toast({
          title: "Limite de números",
          description: `Você pode selecionar no máximo ${maxSelectedNumbers} números fixos${!isSubscribed ? ' no plano gratuito' : ''}`,
          variant: "destructive",
        });
      }
    }
  };

  const toggleStrategy = (strategyId: string) => {
    if (activeStrategies.includes(strategyId)) {
      setActiveStrategies(activeStrategies.filter((id) => id !== strategyId));
    } else {
      const strategy = strategies.find(s => s.id === strategyId);
      if (strategy?.premium && !isSubscribed) {
        toast({
          title: "Estratégia Premium",
          description: "Faça upgrade para o plano pago para desbloquear esta estratégia",
          variant: "destructive",
        });
        return;
      }
      setActiveStrategies([...activeStrategies, strategyId]);
    }
  };

  const handleGenerateGames = () => {
    if (gameQuantity > maxGames) {
      toast({
        title: "Limite do plano",
        description: `Você pode gerar apenas ${maxGames} ${maxGames === 1 ? 'jogo' : 'jogos'} por dia no seu plano atual. Faça upgrade para gerar mais jogos.`,
        variant: "destructive",
      });
      setGameQuantity(maxGames);
      return;
    }
    
    setIsGenerating(true);
    
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
              {userRole === 'premium' ? "Plano Fortune" : 
               userRole === 'admin' ? "Plano Admin" : 
               isSubscribed ? "Plano Pro Fortune" : "Plano Básico"}
            </Badge>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="generator">Gerar Jogos</TabsTrigger>
              <TabsTrigger value="results">Jogos Gerados</TabsTrigger>
              <TabsTrigger value="lottery">Últimos Resultados</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Selecione Números Fixos (opcional)</CardTitle>
                      <CardDescription>
                        Escolha até {maxSelectedNumbers} números que devem aparecer em todos os jogos gerados
                        {!isSubscribed && ' (limite do plano gratuito)'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NumberGrid 
                        selectedNumbers={selectedNumbers} 
                        onToggleNumber={toggleNumber} 
                      />
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {selectedNumbers.length} de {maxSelectedNumbers} números selecionados
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
                        Escolha quantos jogos deseja gerar (máximo: {maxGames} {maxGames === 1 ? 'jogo' : 'jogos'} por dia no seu plano)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Slider
                          value={[gameQuantity]}
                          max={maxGames}
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

                  {!isSubscribed && (
                    <Card className="border-lotofacil-purple">
                      <CardHeader className="bg-lotofacil-gradient text-white">
                        <CardTitle>Desbloqueie Recursos Premium</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="mb-4">Assine agora e desbloqueie:</p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center gap-2">
                            <span className="text-lotofacil-purple font-bold">•</span>
                            <span>Até 5 jogos por dia no Plano Fortune</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-lotofacil-purple font-bold">•</span>
                            <span>Até 10 jogos por dia no Plano Pro Fortune</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-lotofacil-purple font-bold">•</span>
                            <span>Todas as estratégias avançadas</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-lotofacil-purple font-bold">•</span>
                            <span>Até 10 números fixos por jogo</span>
                          </li>
                        </ul>
                        <Button 
                          className="w-full bg-lotofacil-gradient hover:opacity-90"
                          onClick={() => window.location.href = '/subscribe'}
                        >
                          Assinar Agora
                        </Button>
                      </CardContent>
                    </Card>
                  )}
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
                            isPremium={isSubscribed}
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
                      onClick={() => window.location.reload()}
                      className="mt-4"
                      variant="outline"
                    >
                      Tentar novamente
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="estatisticas">
              <div>
                <h2 className="text-2xl font-bold mb-6">Estatísticas da Lotofácil</h2>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <EstatisticasCard 
                    title="Números Mais Frequentes" 
                    numeros={numerosMaisFrequentes} 
                    isLoading={isLoadingFrequentes}
                  />
                  <EstatisticasCard 
                    title="Números Menos Frequentes" 
                    numeros={numerosAusentes} 
                    isLoading={isLoadingAusentes}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Dicas para Seus Jogos</CardTitle>
                    <CardDescription>
                      Com base na análise dos últimos sorteios, sugerimos:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-lotofacil-purple font-bold">•</span>
                        <span>Inclua pelo menos 60% dos números mais frequentes em suas apostas.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-lotofacil-purple font-bold">•</span>
                        <span>Considere incluir alguns números menos frequentes que estão "devendo" aparecer.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-lotofacil-purple font-bold">•</span>
                        <span>Mantenha um bom equilíbrio entre números pares e ímpares (aproximadamente 7-8 de cada).</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-lotofacil-purple font-bold">•</span>
                        <span>Distribua seus números em diferentes colunas e linhas do volante.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
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
