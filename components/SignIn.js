// Importações de módulos e componentes React necessários
import React, { useContext } from "react";

// Importação do contexto de autenticação
import { authContext } from "@/lib/store/auth-context";

// Importações de ícones
import { FcGoogle } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

// Importação do componente de imagem do Next.js
import Image from "next/image";

// Componente de página de login
function SignIn() {
  // Utiliza o contexto de autenticação para acessar a função de login com o Google
  const { googleLoginHandler } = useContext(authContext);

  return (
    <div className="flex w-full h-screen overflow-y-hidden items-center justify-center p-10 md:p-22 lg:p-64"> {/* Container principal da página */}
      <div className="bg-white px-10 rounded-2xl "> {/* Container do formulário de login */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10"> {/* Grid para disposição dos elementos */}
          <div className="flex items-center"> {/* Seção de imagem do banner */}
            <div>
              <Image
                src="/banner.jpg" // Caminho da imagem
                width={600} // Largura da imagem
                height={600} // Altura da imagem
                alt="Banner image" // Texto alternativo da imagem
              />
            </div>
          </div>

          <div className="flex flex-col justify-center mx-auto my-auto"> {/* Seção de formulário de login */}
            <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center pb-4 md:pb-10 text-slate-800"> {/* Título principal */}
              Bem vindo
            </h1>
            <div className="flex justify-center"> {/* Ícone de perfil */}
              <CgProfile className="text-7xl md:text-8xl lg:text-[9rem] text-slate-800 pb-4 md:pb-10" />
            </div>
            <h3 className="text-lg md:text-2xl text-center text-slate-800"> {/* Descrição */}
              Entre com o Google para continuar
            </h3>

            {/* Botão de login com o Google */}
            <button
              onClick={googleLoginHandler} // Chama a função de login com o Google ao clicar no botão
              className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg mb-10" // Estilos do botão
            >
              <FcGoogle className="text-xs sm:text-xl md:text-2xl" /> Sign in {/* Ícone e texto do botão */}
              with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn; // Exporta o componente de página de login para uso em outras partes do aplicativo
