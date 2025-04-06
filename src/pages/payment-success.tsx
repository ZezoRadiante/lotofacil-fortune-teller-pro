
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/navbar";

const PaymentSuccess = () => {
  const { checkUserRole } = useAuth();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast
    toast({
      title: "Assinatura confirmada!",
      description: "Sua assinatura foi processada com sucesso.",
    });

    // Update user role in context
    checkUserRole();
  }, [toast, checkUserRole]);

  const getPlanName = () => {
    switch (planId) {
      case "pro":
        return "Fortune";
      case "ultimate":
        return "Pro Fortune";
      default:
        return "Premium";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Sua assinatura está ativa!</CardTitle>
                <CardDescription>
                  Obrigado por assinar o plano {getPlanName()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  Agora você tem acesso completo às estratégias avançadas e pode gerar jogos ilimitados para aumentar suas chances de ganhar.
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Recursos desbloqueados:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Geração ilimitada de jogos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Todas as estratégias avançadas</span>
                    </li>
                    {planId === "ultimate" && (
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>Estatísticas detalhadas</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/dashboard")} 
                  className="w-full bg-lotofacil-gradient hover:opacity-90"
                >
                  Ir para o Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
