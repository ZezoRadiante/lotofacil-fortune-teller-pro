
import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { pricingPlans } from "@/data/pricing";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Subscribe = () => {
  const { toast } = useToast();
  const { session, isAuthenticated, isLoading } = useAuth();
  const [selectedPlan, setSelectedPlan] = React.useState("pro");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated and redirect if not
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      toast({
        title: "Login necessário",
        description: "Faça login para assinar um plano",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isLoading, isAuthenticated, navigate, toast, location.pathname]);

  const handleSubscribe = async () => {
    if (!isAuthenticated || !session) {
      console.log("User not authenticated for subscription, redirecting to login");
      toast({
        title: "Login necessário",
        description: "Faça login para assinar um plano",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setLoading(true);
    
    try {
      console.log("Creating checkout session for plan:", selectedPlan);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: selectedPlan }
      });
      
      if (error) {
        console.error("Error invoking create-checkout function:", error);
        throw new Error(error.message);
      }
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        console.log("Redirecting to Stripe checkout:", data.url);
        window.location.href = data.url;
      } else {
        console.error("No URL returned from checkout function");
        throw new Error("Não foi possível criar a sessão de pagamento");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Erro ao processar a assinatura",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Show loading while authentication state is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lotofacil-purple"></div>
        </div>
      </div>
    );
  }

  // Only render the subscription page content if authenticated
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">Escolha seu plano</h1>
              <p className="text-muted-foreground">Selecione o plano que melhor se adapta às suas necessidades</p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Selecione seu plano</CardTitle>
                <CardDescription>Todos os planos incluem acesso ao gerador inteligente de jogos</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue={selectedPlan} 
                  className="grid gap-4"
                  onValueChange={setSelectedPlan}
                >
                  {pricingPlans.filter(plan => plan.id !== "free").map(plan => (
                    <div key={plan.id} className={`relative rounded-lg border p-4 flex items-start space-x-4 ${selectedPlan === plan.id ? 'border-lotofacil-purple bg-gray-50' : ''}`}>
                      <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={plan.id} className="text-base font-medium">
                          {plan.name}
                        </Label>
                        <p className="text-muted-foreground">{plan.description}</p>
                        <div className="mt-2 text-2xl font-bold">{formatCurrency(plan.price)}<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                        <div className="mt-2 grid gap-2">
                          {plan.features.filter(f => f.included).map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <Check size={16} className="text-lotofacil-green mr-2" />
                              <span className="text-sm">{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {plan.popular && (
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                          <div className="bg-lotofacil-gradient text-white text-xs py-1 px-3 rounded-full">
                            Popular
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-lotofacil-gradient hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "Processando..." : "Assinar Agora"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="text-center text-muted-foreground text-sm">
              <p>Ao assinar, você concorda com nossos <a href="#" className="text-lotofacil-purple hover:underline">Termos de Uso</a> e <a href="#" className="text-lotofacil-purple hover:underline">Política de Privacidade</a>.</p>
              <p className="mt-2">Você pode cancelar sua assinatura a qualquer momento.</p>
            </div>
          </div>
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

export default Subscribe;
