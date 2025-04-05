
import React from "react";
import Navbar from "@/components/navbar";
import { pricingPlans } from "@/data/pricing";
import PricingCard from "@/components/pricing/pricing-card";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Nossos Planos</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Escolha o plano ideal para suas necessidades e aumente suas chances de ganhar na Lotofácil
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
              <div className="max-w-3xl mx-auto grid gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Como funciona o gerador inteligente?</h3>
                  <p className="text-gray-600">
                    Nosso gerador inteligente analisa resultados anteriores e aplica estratégias 
                    matemáticas e estatísticas para criar jogos com maior probabilidade de acerto.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Posso cancelar minha assinatura a qualquer momento?</h3>
                  <p className="text-gray-600">
                    Sim, você pode cancelar sua assinatura a qualquer momento e manterá o acesso 
                    até o final do período já pago.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">As estratégias realmente funcionam?</h3>
                  <p className="text-gray-600">
                    Nossas estratégias são baseadas em análises estatísticas e padrões matemáticos, 
                    o que aumenta suas chances comparado a jogos aleatórios. No entanto, não podemos 
                    garantir vitórias, pois a loteria envolve fatores aleatórios.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Posso usar o gerador em dispositivos móveis?</h3>
                  <p className="text-gray-600">
                    Sim, nossa plataforma é totalmente responsiva e funciona em qualquer dispositivo: 
                    desktop, tablet ou smartphone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default Pricing;
