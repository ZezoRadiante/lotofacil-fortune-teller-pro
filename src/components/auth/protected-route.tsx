
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'premium' | 'user';
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireRole
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, userRole, checkUserRole } = useAuth();
  const [isCheckingRole, setIsCheckingRole] = useState(!!requireRole);

  // Verificar o papel do usuário se for necessário
  useEffect(() => {
    if (requireRole && isAuthenticated) {
      setIsCheckingRole(true);
      checkUserRole().finally(() => {
        setIsCheckingRole(false);
      });
    } else {
      setIsCheckingRole(false);
    }
  }, [requireRole, isAuthenticated, checkUserRole]);

  // Se estiver carregando ou verificando o papel, exibir o loading
  if (isLoading || isCheckingRole) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lotofacil-purple"></div>
    </div>;
  }

  // Se a rota requer autenticação e o usuário não está autenticado, redirecionar para o login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota requer um papel específico e o usuário não tem esse papel, redirecionar
  if (requireRole && userRole && userRole !== requireRole) {
    // Para usuários premium tentando acessar rotas de admin, redirecionar para o dashboard
    if (userRole === 'premium' && requireRole === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Para usuários comuns tentando acessar rotas premium ou admin, redirecionar para a página de preços
    if (userRole === 'user' && (requireRole === 'premium' || requireRole === 'admin')) {
      return <Navigate to="/pricing" replace />;
    }

    // Para outros casos não previstos, voltar para a home
    return <Navigate to="/" replace />;
  }

  // Se o usuário está autenticado e tem o papel necessário (ou não requer papel), renderizar o conteúdo
  return <>{children}</>;
};

export default ProtectedRoute;
