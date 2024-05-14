// Componente de modal reutilizável para exibir conteúdo
function Modal({ show, onClose, children }) {
  return (
    // Div que representa o modal, com estilos de transição baseados na propriedade show
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)", // Define a posição do modal com base na propriedade show
        overflow: show ? "auto" : "hidden", // Controla a rolagem da página enquanto o modal está aberto
      }}
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-screen z-50 transition-opacity duration-1000 backdrop-blur-sm bg-slate/50" // Estilos CSS para posicionamento e transição suave
    >
      {/* Conteúdo do modal */}
      <div
        data-theme="light"
        className="container mx-auto max-w-2xl min-h-[80vh] rounded-2xl bg-slate-100 py-6 px-4 flex flex-col overflow-y-auto shadow-2xl"
      >
        {/* Container do modal com estilos personalizados */}
        {/* Botão para fechar o modal */}

        <button
          onClick={() => {
            onClose(false); // Chama a função onClose quando o botão é clicado para fechar o modal
          }}
          className="w-10 h-10 mb-4 btn btn-sm btn-circle btn-ghost" // Estilos para o botão de fechar
        >
          ✕ {/* Ícone ou texto de fechamento do modal */}
        </button>
        {/* Adicionando a propriedade overflow-hidden para impedir a rolagem do conteúdo abaixo do modal */}
        <div className={show ? "overflow-hidden" : ""}>{children}</div>
      </div>
    </div>
  );
}

export default Modal; // Exporta o componente Modal para uso em outras partes do aplicativo
