function Modal({ show, onClose, children }) {
  return (
    // Div para o modal, com transição baseada no estado show
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)", // Translação para exibir ou ocultar o modal
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500" // Estilo para animação de transição
    >
      {/* Conteúdo do modal */}
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4"> {/* Estilo do modal */}
        {/* Botão para fechar o modal */}
        <button
          onClick={() => {
            onClose(false); // Função para fechar o modal ao ser clicado
          }}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600" // Estilo do botão de fechar
        >
          X {/* Ícone de fechar */}
        </button>
        {children} {/* Conteúdo interno do modal */}
      </div>
    </div>
  );
}

export default Modal;
