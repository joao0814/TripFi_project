"use client";

import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";

import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense }) {
  // Estado para controlar a exibição do modal de visualização de despesa
  const [showViewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      {/* Componente do modal de visualização de despesa */}
      <ViewExpenseModal
        show={showViewExpenseModal} // Propriedade para controlar a exibição do modal
        onClose={setViewExpenseModal} // Função para fechar o modal
        expense={expense} // Propriedade contendo os detalhes da despesa
      />
      {/* Botão para abrir o modal de visualização de despesa */}
      <button
        onClick={() => {
          setViewExpenseModal(true); // Define o estado para exibir o modal ao ser clicado
        }}
      >
        {/* Componente que representa a categoria de despesa */}
        <div className="flex items-center justify-between px-4 py-4 bg-slate-200 rounded-2xl">
          <div className="flex items-center gap-2">
            {/* Círculo colorido representando a categoria */}
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            {/* Título da categoria */}
            <h4 className="capitalize text-left">{expense.title}</h4>
          </div>
          {/* Valor total da categoria de despesa */}
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;
