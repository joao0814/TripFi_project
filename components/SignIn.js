"use client";

import React, { useContext } from "react";

import { authContext } from "@/lib/store/auth-context"; // Importa o contexto de autenticação

import { FcGoogle } from "react-icons/fc"; // Importa o ícone do Google
import { CgProfile } from "react-icons/cg"; // Importa o ícone de perfil do usuário
import Image from "next/image"; // Importa o componente de imagem do Next.js

function SignIn() {
  const { googleLoginHandler } = useContext(authContext); // Obtém a função de login com o Google do contexto de autenticação

  return (
    <div className="flex w-full h-full max-h-[85vh] overflow-y-hidden items-center justify-center p-10 md:p-22 lg:p-64"> {/* Container flexível para centralizar o conteúdo */}
      <div className="bg-white px-10 rounded-2xl "> {/* Div com fundo branco e bordas arredondadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10"> {/* Grid com uma coluna em dispositivos pequenos e duas colunas em dispositivos maiores */}
          <div className="flex items-center"> {/* Div para a imagem do banner */}
            <div>
              <Image // Componente de imagem do Next.js para renderizar o banner
                src="/banner.jpg" // Caminho para o arquivo de imagem do banner
                width={600} // Largura da imagem
                height={600} // Altura da imagem
                alt="Banner image" // Texto alternativo para a imagem do banner
              />
            </div>
          </div>

          <div className="flex flex-col justify-center mx-auto my-auto"> {/* Div para o conteúdo do formulário de login */}
            <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center pb-4 md:pb-10 text-slate-800"> {/* Título "Bem vindo" */}
              Bem vindo
            </h1>
            <div className="flex justify-center"> {/* Div para o ícone de perfil do usuário */}
              <CgProfile className="text-7xl md:text-8xl lg:text-[9rem] text-slate-800 pb-4 md:pb-10" />
            </div>
            <h3 className="text-lg md:text-2xl text-center text-slate-800"> {/* Mensagem de instrução */}
              Entre com o Google para continuar
            </h3>

            <button
              onClick={googleLoginHandler} // Chama a função de login com o Google ao clicar no botão
              className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg mb-10" // Estilo para o botão de login com o Google
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

export default SignIn;
