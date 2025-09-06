"use client";

import { useContext, useState, useEffect } from "react";

import { authContext } from "@/lib/store/auth-context"; // Importa o contexto de autenticação

import { ImStatsBars } from "react-icons/im"; // Importa o ícone de estatísticas
import Image from "next/image"; // Importa o componente de imagem do Next.js

function Nav() {
  const { user, loading, logout } = useContext(authContext); // Obtém informações do usuário e funções de autenticação do contexto de autenticação
  const [isClient, setIsClient] = useState(false);

  // Garante que o componente só renderize no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Se não estiver no cliente ou o usuário não estiver logado e não estiver carregando, não renderize o componente
  if (!isClient || (!user && !loading)) {
    return null;
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 py-4 w-full shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {user && !loading && (
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                width={120}
                height={36}
                alt="TripFi Logo"
                className="h-9 w-auto"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
                }}
              />
            </div>
          )}
          
          {/* Navegação */}
          {user && !loading && (
            <nav className="flex items-center gap-6">
              <div className="desktop">
                <a 
                  href="#stats"
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <ImStatsBars className="text-lg" />
                  <span className="text-sm font-medium">Estatísticas</span>
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="desktop">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                      src={user.photoURL}
                      alt={user.displayName}
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.displayName}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={logout}
                  className="btn btn-danger text-sm px-4 py-2"
                >
                  Sair
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
