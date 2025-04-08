
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { setupAuthListener, logout, hasRole } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";

// Tipos para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: 'admin' | 'premium' | 'user' | null;
  handleLogout: () => Promise<void>;
  checkUserRole: () => Promise<void>;
}

// Criar o contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  userRole: null,
  handleLogout: async () => {},
  checkUserRole: async () => {},
});

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'premium' | 'user' | null>(null);
  const { toast } = useToast();

  // Função para verificar o papel do usuário
  const checkUserRole = async () => {
    if (!user) {
      setUserRole(null);
      return;
    }

    try {
      // Verificando se o usuário é admin
      const isAdmin = await hasRole('admin');
      if (isAdmin) {
        setUserRole('admin');
        return;
      }

      // Verificando se o usuário é premium
      const isPremium = await hasRole('premium');
      if (isPremium) {
        setUserRole('premium');
        return;
      }

      // Se não for admin nem premium, é um usuário comum
      setUserRole('user');
    } catch (error) {
      console.error('Erro ao verificar papel do usuário:', error);
      setUserRole('user'); // Por padrão, assume que é um usuário comum
    }
  };

  useEffect(() => {
    console.log("Setting up auth listener");
    const cleanup = setupAuthListener(setUser, setSession);
    
    // Initial auth check happens in setupAuthListener
    // Wait a bit to ensure auth state is fully loaded before removing loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  // Verificar o papel do usuário sempre que o usuário mudar
  useEffect(() => {
    if (user) {
      console.log("User authenticated, checking role", user.email);
      checkUserRole();
    } else {
      console.log("No authenticated user");
      setUserRole(null);
    }
  }, [user]);

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar",
        variant: "destructive",
      });
    }
  };

  // Valor do contexto
  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    userRole,
    handleLogout,
    checkUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
