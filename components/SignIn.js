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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="card overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Seção da imagem */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
              <Image
                src="/banner.jpg"
                width={600}
                height={600}
                alt="Banner image"
                priority
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-4xl">💰</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">TripFi</h2>
                  <p className="text-lg opacity-90">Sua jornada financeira começa aqui</p>
                </div>
              </div>
            </div>

            {/* Seção do formulário */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <CgProfile className="text-3xl text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                  Bem-vindo!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Faça login para acessar seu painel financeiro
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={googleLoginHandler}
                  className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 group min-h-[56px]"
                >
                  <FcGoogle className="text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0 leading-none" />
                  <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    Entrar com Google
                  </span>
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Ao continuar, você concorda com nossos{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Política de Privacidade
                    </a>
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Análise Visual</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Controle Inteligente</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn; // Exporta o componente de página de login para uso em outras partes do aplicativo
