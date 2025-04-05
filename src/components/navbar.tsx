
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock auth status - this would come from your auth context
  const isAuthenticated = window.location.pathname.includes("dashboard");

  return (
    <nav className="bg-white border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-lotofacil-purple transition-colors">
            Início
          </a>
          <a href="/about" className="text-gray-600 hover:text-lotofacil-purple transition-colors">
            Como Funciona
          </a>
          <a href="/pricing" className="text-gray-600 hover:text-lotofacil-purple transition-colors">
            Planos
          </a>
          
          {isAuthenticated ? (
            <>
              <a href="/dashboard" className="text-gray-600 hover:text-lotofacil-purple transition-colors">
                Meu Painel
              </a>
              <Button variant="outline" className="border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white">
                Sair
              </Button>
            </>
          ) : (
            <>
              <a href="/login">
                <Button variant="outline" className="border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white">
                  Entrar
                </Button>
              </a>
              <a href="/signup">
                <Button className="bg-lotofacil-gradient text-white hover:opacity-90">
                  Criar Conta
                </Button>
              </a>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto px-4 py-4 bg-white border-t flex flex-col space-y-4">
          <a href="/" className="text-gray-600 hover:text-lotofacil-purple transition-colors py-2">
            Início
          </a>
          <a href="/about" className="text-gray-600 hover:text-lotofacil-purple transition-colors py-2">
            Como Funciona
          </a>
          <a href="/pricing" className="text-gray-600 hover:text-lotofacil-purple transition-colors py-2">
            Planos
          </a>
          
          {isAuthenticated ? (
            <>
              <a href="/dashboard" className="text-gray-600 hover:text-lotofacil-purple transition-colors py-2">
                Meu Painel
              </a>
              <Button variant="outline" className="border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white w-full">
                Sair
              </Button>
            </>
          ) : (
            <>
              <a href="/login" className="w-full">
                <Button variant="outline" className="border-lotofacil-purple text-lotofacil-purple hover:bg-lotofacil-purple hover:text-white w-full">
                  Entrar
                </Button>
              </a>
              <a href="/signup" className="w-full">
                <Button className="bg-lotofacil-gradient text-white hover:opacity-90 w-full">
                  Criar Conta
                </Button>
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
