"use client";

import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";
import ModalPortal from "./ModalPortal";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense }) {
  // Estado para controlar a exibição do modal de visualização de despesa
  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      {/* Botão para abrir o modal de visualização de despesa */}
      <button
        onClick={() => {
          setViewExpenseModal(true); // Define o estado para exibir o modal ao ser clicado
        }}
        className="w-full group"
      >
        {/* Componente que representa a categoria de despesa */}
        <div className="card p-4 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Círculo colorido representando a categoria */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md leading-none dynamic-bg"
                  style={{ backgroundColor: expense.color }}
                >
                  {expense.title.charAt(0).toUpperCase()}
                </div>
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dynamic-bg"
                  style={{ backgroundColor: expense.color }}
                ></div>
              </div>
              
              {/* Título da categoria */}
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-800 capitalize group-hover:text-blue-600 transition-colors duration-300">
                  {expense.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {expense.items?.length || 0} {expense.items?.length === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>
            
            {/* Valor total da categoria de despesa */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {currencyFormatter(expense.total)}
              </p>
              <div className="w-12 h-1 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full rounded-full transition-all duration-500 w-full dynamic-bg"
                  style={{ backgroundColor: expense.color }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      
      {/* Componente do modal de visualização de despesa - renderizado via Portal no body */}
      <ModalPortal show={showViewExpenseModal}>
        <ViewExpenseModal
          show={showViewExpenseModal} // Propriedade para controlar a exibição do modal
          onClose={setViewExpenseModal} // Função para fechar o modal
          expense={expense} // Propriedade contendo os detalhes da despesa
        />
      </ModalPortal>
    </>
  );
}

export default ExpenseCategoryItem;
