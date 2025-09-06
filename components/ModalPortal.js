"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

// Componente wrapper para renderizar modais via Portal
function ModalPortal({ children, show }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !show || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="z-[9999] relative">
      {children}
    </div>,
    document.body
  );
}

export default ModalPortal;
