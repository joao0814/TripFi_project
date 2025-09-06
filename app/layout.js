"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import ClientWrapper from "@/components/ClientWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body data-theme="light" suppressHydrationWarning className="min-h-screen">
        <ClientWrapper>
          <AuthContextProvider>
            {/* Verifica se está logado*/}
            <FinanceContextProvider>
              {/* Traz as informações do banco para os componentes*/}
              <div className="min-h-screen flex flex-col">
                <Nav /> {/* Navbar*/}
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <ToastContainer 
                limit={4} 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="toast-container"
              />
            </FinanceContextProvider>
          </AuthContextProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
