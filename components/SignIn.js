"use client";

import React, { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";

import { FcGoogle } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <div className="flex w-full h-full max-h-[85vh] overflow-y-hidden items-center justify-center p-10 md:p-22 lg:p-64">
      <div className="bg-white px-10 rounded-2xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10">
          <div className="flex items-center">
            <div>
              <Image
                src="/banner.jpg"
                width={600}
                height={600}
                alt="Banner image"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center mx-auto my-auto">
            <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center pb-4 md:pb-10 text-slate-800">
              Bem vindo
            </h1>
            <div className="flex justify-center">
              <CgProfile className="text-7xl md:text-8xl lg:text-[9rem] text-slate-800 pb-4 md:pb-10" />
            </div>
            <h3 className="text-lg md:text-2xl text-center text-slate-800">
              Entre com o Google para continuar
            </h3>

            <button
              onClick={googleLoginHandler}
              className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg mb-10"
            >
              <FcGoogle className="text-xs sm:text-xl md:text-2xl" /> Sign in
              with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
