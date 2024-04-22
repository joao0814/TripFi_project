"use client";

import { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";

import { ImStatsBars } from "react-icons/im";
import Image from "next/image";

function Nav() {
  const { user, loading, logout } = useContext(authContext);

  // Se o usuário não estiver logado, não renderize o componente
  if (!user && !loading) {
    return null;
  }

  return (
    <div className="bg-gray-700 py-3 w-full">
      <div className="flex items-center justify-between px-10">
        {/* User information */}
        {user && !loading && (
          <div className="flex flex-col items-center gap-2 ">
            <Image
              src="/logo.svg"
              width={80}
              height={40}
              alt={user.displayName}
            />
          </div>
        )}

        {/* Right side of our navigation */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div className="desktop">
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Sair
              </button>
            </div>
            <div className="desktop">
              <img
                className="object-cover w-[40px] h-[40px] rounded-full"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav;
