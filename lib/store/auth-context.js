"use client";

import { createContext } from "react"; // Importa createContext da biblioteca React

import { auth } from "@/lib/firebase"; // Importa o objeto de autenticação do Firebase
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"; // Importa métodos de autenticação do Firebase
import { useAuthState } from "react-firebase-hooks/auth"; // Importa hook para gerenciar o estado de autenticação

export const authContext = createContext({ // Cria o contexto de autenticação
  user: null, // Define o usuário como nulo inicialmente
  loading: false, // Define o estado de carregamento como falso inicialmente
  googleLoginHandler: async () => { }, // Define a função de login com o Google como assíncrona e vazia inicialmente
  logout: async () => { }, // Define a função de logout como assíncrona e vazia inicialmente
});

export default function AuthContextProvider({ children }) { // Define o componente AuthContextProvider que envolve outros componentes
  const [user, loading] = useAuthState(auth); // Obtém o estado de autenticação e carregamento usando o hook useAuthState

  const googleProvider = new GoogleAuthProvider(auth); // Cria uma instância do provedor de autenticação do Google

  const googleLoginHandler = async () => { // Define a função para lidar com o login com o Google
    try {
      await signInWithPopup(auth, googleProvider); // Realiza o login com o Google usando o método signInWithPopup
    } catch (error) {
      throw error; // Lança um erro se houver algum problema durante o login
    }
  };

  const logout = () => { // Define a função para logout
    signOut(auth); // Realiza o logout usando o método signOut do Firebase Auth
  };

  const values = { // Define os valores que serão fornecidos pelo contexto de autenticação
    user, // Estado atual do usuário
    loading, // Estado de carregamento
    googleLoginHandler, // Função para login com o Google
    logout, // Função para logout
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>; // Retorna o provedor de contexto de autenticação com os valores fornecidos para os componentes filhos
}
