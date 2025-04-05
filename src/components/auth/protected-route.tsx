
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
  const { isAuthenticated, isLoading } = useAuth();

  // Se estiver carregando, não fazer nada ainda
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lotofacil-purple"></div>
    </div>;
  }

  // Se a rota requer autenticação e o usuário não está autenticado, redirecionar para o login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Para implementar verificação de roles, seria necessário fazer consulta ao banco 
  // usando a função hasRole criada no arquivo auth.ts

  // Se o usuário está autenticado, renderizar o conteúdo normalmente
  return <>{children}</>;
};

export default ProtectedRoute;
