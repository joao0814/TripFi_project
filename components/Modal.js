// Componente de modal reutilizável para exibir conteúdo
function Modal({ show, onClose, children }) {
  return (
    // Div que representa o modal, com estilos de transição baseados na propriedade show
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)", // Define a posição do modal com base na propriedade show
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500" // Estilos CSS para posicionamento e transição suave
    >
      {/* Conteúdo do modal */}
      <div className="container mx-auto max-w-2xl min-h-[80vh] rounded-3xl bg-slate-800 py-6 px-4 flex flex-col overflow-y-auto"> {/* Container do modal com estilos personalizados */}
        {/* Botão para fechar o modal */}
        <button
          onClick={() => {
            onClose(false); // Chama a função onClose quando o botão é clicado para fechar o modal
          }}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600" // Estilos para o botão de fechar
        >
          X {/* Ícone ou texto de fechamento do modal */}
        </button>
        {children} {/* Renderiza o conteúdo do modal passado como children */}
      </div>
    </div>
  );
}

export default Modal; // Exporta o componente Modal para uso em outras partes do aplicativo
