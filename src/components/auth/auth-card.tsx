
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/ui/logo";
import { login, signup } from "@/services/auth";
import { useNavigate } from "react-router-dom";

interface AuthCardProps {
  isLogin?: boolean;
}

const AuthCard = ({ isLogin = true }: AuthCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        toast({
          title: "As senhas não coincidem",
          description: "Por favor, verifique as senhas informadas",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (isLogin) {
        // Login
        await login({ email, password });
        toast({
          title: "Login realizado com sucesso!",
          description: "Você será redirecionado para o painel",
        });
        navigate("/dashboard");
      } else {
        // Signup
        await signup({ email, password });
        toast({
          title: "Conta criada com sucesso!",
          description: "Você será redirecionado para assinar um plano",
        });
        navigate("/subscribe");
      }
    } catch (error: any) {
      console.error("Erro de autenticação:", error);
      
      // Tratamento personalizado de erros
      let errorMessage = "Ocorreu um erro durante a autenticação";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Credenciais inválidas. Verifique seu email e senha.";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme seu email antes de fazer login.";
      }
      
      toast({
        title: isLogin ? "Erro ao fazer login" : "Erro ao criar conta",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl text-center">
          {isLogin ? "Acesse sua conta" : "Crie sua conta"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Entre com seu e-mail e senha para acessar"
            : "Preencha os dados abaixo para criar sua conta"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-lotofacil-gradient hover:opacity-90" disabled={loading}>
            {loading ? "Processando..." : isLogin ? "Entrar" : "Criar conta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Não tem uma conta?{" "}
              <a href="/signup" className="text-lotofacil-purple hover:underline">
                Criar conta
              </a>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <a href="/login" className="text-lotofacil-purple hover:underline">
                Entrar
              </a>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
