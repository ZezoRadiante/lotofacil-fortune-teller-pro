
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Logo from "@/components/ui/logo";
import { strategies } from "@/data/strategies";
import { pricingPlans } from "@/data/pricing";
import PricingCard from "@/components/pricing/pricing-card";
import { Award, Bot, Calculator, Check, LineChart, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Aumente suas chances na{" "}
              <span className="text-transparent bg-clip-text bg-lotofacil-gradient">Lotofácil</span>{" "}
              com inteligência
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gerador inteligente de jogos com estratégias avançadas para
              maximizar suas chances de ganhar
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-lotofacil-gradient text-white hover:opacity-90 text-lg px-8 py-6"
                onClick={() => window.location.href = '/signup'}
              >
                Começar Agora
              </Button>
              <Button 
                variant="outline" 
                className="border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white text-lg px-8 py-6"
                onClick={() => window.location.href = '/pricing'}
              >
                Ver Planos
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-lotofacil-gradient rounded-2xl blur opacity-30 animate-pulse-soft"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="ball lotofacil-ball">{i + 1}</div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold mb-2">Gerador Inteligente</div>
                  <div className="text-gray-600">Estratégias baseadas em análises avançadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Estratégias Avançadas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso gerador utiliza estratégias baseadas em análise de dados e padrões 
              para criar jogos com maior potencial de premiação
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calculator className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Balanceamento Pares/Ímpares</h3>
              <p className="text-gray-600">
                Mantém uma proporção ideal de 7-8 ou 8-7 números pares e ímpares para 
                maximizar as chances de acerto.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Evita Combinações Anteriores</h3>
              <p className="text-gray-600">
                Analisa resultados anteriores para evitar combinações exatas que já foram 
                sorteadas, focando em padrões inéditos.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bot className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foco em Números Primos</h3>
              <p className="text-gray-600">
                Prioriza a inclusão de números primos (2,3,5,7,11,13,17,19,23) com base 
                em padrões estatísticos.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dobra Suas Chances</h3>
              <p className="text-gray-600">
                Gera jogos com 16-17 números para aumentar suas chances de acertar 
                múltiplas combinações de 15 números.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <LineChart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise de Ciclos</h3>
              <p className="text-gray-600">
                Identifica números que não apareceram nos últimos concursos e estão 
                propensos a serem sorteados.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-lotofacil-gradient w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foco nos Extremos</h3>
              <p className="text-gray-600">
                Dá atenção especial aos números extremos (1 e 25) que possuem padrões 
                específicos de recorrência nos sorteios.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Escolha Seu Plano</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos diferentes opções para atender às suas necessidades e aumentar suas 
              chances na Lotofácil
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Usuários Dizem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milhares de jogadores já aumentaram suas chances de ganhar com nossas estratégias
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lotofacil-gradient rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Carlos Silva</h4>
                  <p className="text-sm text-gray-600">São Paulo, SP</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Com o Lotofácil Fortune consegui acertar 14 números duas vezes em um mês. 
                As estratégias realmente funcionam!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lotofacil-gradient rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Ana Costa</h4>
                  <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
                </div>
              </div>
              <p className="text-gray-600">
                "A estratégia de balanceamento de pares e ímpares me ajudou a ganhar mais 
                vezes nos últimos concursos. Recomendo!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lotofacil-gradient rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Marcos Oliveira</h4>
                  <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Assinei o plano Pro Fortune e já recuperei o investimento com prêmios. 
                O gerador com 17 números é imbatível!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-lotofacil-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Aumentar Suas Chances?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de jogadores que estão ganhando mais na Lotofácil com 
            nossas estratégias inteligentes
          </p>
          <Button 
            className="bg-white text-lotofacil-purple hover:bg-gray-100 text-lg px-8 py-6"
            onClick={() => window.location.href = '/signup'}
          >
            Criar Minha Conta Agora
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <Logo className="mb-6 md:mb-0" />
            <div className="flex space-x-6">
              <a href="#" className="hover:text-lotofacil-green">Termos de Uso</a>
              <a href="#" className="hover:text-lotofacil-green">Política de Privacidade</a>
              <a href="#" className="hover:text-lotofacil-green">Suporte</a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lotofácil Fortune. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Este site não tem vínculo com a Caixa Econômica Federal ou qualquer loteria oficial.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
