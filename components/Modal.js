import React from "react";

// Componente de modal reutilizável para exibir conteúdo
function Modal({ show, onClose, children }) {
  // Adicionar/remover classe do body quando modal abrir/fechar
  React.useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup: remover classe quando componente desmontar
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      onClick={() => {
        onClose(false); // Chama a função onClose quando o botão é clicado para fechar o modal
      }}
      className="modal-overlay flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
    >
      {/* Conteúdo do modal */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl animate-slide-up overflow-hidden"
      >
        {/* Conteúdo do modal */}
        <div className="p-8 overflow-y-auto max-h-[90vh] modal-content relative">
          {children}
        </div>
        
        {/* Botão para fechar o modal - posicionado sobre o conteúdo */}
        <button
          onClick={() => {
            onClose(false); // Chama a função onClose quando o botão é clicado para fechar o modal
          }}
          className="absolute top-4 right-4 z-[100] w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group shadow-lg"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Modal; // Exporta o componente Modal para uso em outras partes do aplicativo
