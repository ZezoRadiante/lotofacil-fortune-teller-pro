
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

// Interface para representar os dados de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface para representar os dados de cadastro
export interface SignupCredentials extends LoginCredentials {
  confirmPassword?: string;
}

// Função para fazer login
export const login = async ({ email, password }: LoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Função para fazer cadastro
export const signup = async ({ email, password }: SignupCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Função para fazer logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Função para obter a sessão atual
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

// Função para verificar se o usuário tem uma determinada role
export const hasRole = async (role: 'admin' | 'premium' | 'user') => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  const { data, error } = await supabase.rpc('has_role', {
    _user_id: user.id,
    _role: role
  });
  
  if (error) {
    console.error('Erro ao verificar role do usuário:', error);
    return false;
  }
  
  return data;
};

// Hook para gerenciar o estado de autenticação
export const setupAuthListener = (
  setUser: (user: User | null) => void,
  setSession: (session: Session | null) => void
) => {
  console.log("Setting up auth state listener");
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log("Auth state changed:", event);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('Usuário logado com sucesso:', session.user.email);
      } else if (event === 'SIGNED_OUT') {
        console.log('Usuário deslogado');
      }
    }
  );

  // Verificar se já existe uma sessão ativa
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log("Initial session check:", session ? "Session exists" : "No session");
    setSession(session);
    setUser(session?.user ?? null);
  });

  // Retornar função para cancelar a inscrição quando o componente for desmontado
  return () => {
    console.log("Cleaning up auth listener");
    subscription.unsubscribe();
  };
};
