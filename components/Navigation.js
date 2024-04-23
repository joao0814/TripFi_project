"use client";

import { useContext } from "react";

import { authContext } from "@/lib/store/auth-context"; // Importa o contexto de autenticação

import { ImStatsBars } from "react-icons/im"; // Importa o ícone de estatísticas
import Image from "next/image"; // Importa o componente de imagem do Next.js

function Nav() {
  const { user, loading, logout } = useContext(authContext); // Obtém informações do usuário e funções de autenticação do contexto de autenticação

  // Se o usuário não estiver logado ou o estado de carregamento for verdadeiro, não renderize o componente
  if (!user && !loading) {
    return null;
  }

  return (
    <div className="bg-gray-700 py-3 w-full"> {/* Barra de navegação */}
      <div className="flex items-center justify-between px-10"> {/* Container flexível para o conteúdo da barra de navegação */}
        {/* Informações do usuário */}
        {user && !loading && ( // Renderiza apenas se o usuário estiver autenticado e o estado de carregamento for falso
          <div className="flex flex-col items-center gap-2"> {/* Container flexível para as informações do usuário */}
            <Image // Componente de imagem do Next.js para renderizar o logo
              src="/logo.svg" // Caminho para o arquivo de imagem do logo
              width={80} // Largura da imagem
              height={40} // Altura da imagem
              alt={user.displayName} // Texto alternativo para a imagem
            />
          </div>
        )}

        {/* Lado direito da barra de navegação */}
        {user && !loading && ( // Renderiza apenas se o usuário estiver autenticado e o estado de carregamento for falso
          <nav className="flex items-center gap-4"> {/* Navegação com espaçamento entre os itens */}
            <div className="desktop"> {/* Renderiza apenas em telas maiores (desktop) */}
              <a href="#stats"> {/* Link para a seção de estatísticas */}
                <ImStatsBars className="text-2xl" /> {/* Ícone de estatísticas */}
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger"> {/* Botão para fazer logout */}
                Sair
              </button>
            </div>
            <div className="desktop"> {/* Renderiza apenas em telas maiores (desktop) */}
              <img
                className="object-cover w-[40px] h-[40px] rounded-full" // Estilo para a imagem do perfil do usuário
                src={user.photoURL} // URL da imagem do perfil do usuário
                alt={user.displayName} // Texto alternativo para a imagem do perfil do usuário
                referrerPolicy="no-referrer" // Política de referência para a imagem do perfil do usuário
              />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav;
