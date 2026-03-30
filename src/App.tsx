import React from "react";
import AppRoutes from "@/src/routes/index";

// ─── Estilos Globais ──────────────────────────────────────────────────
// Estes estilos são globais à aplicação inteira (fontes, CSS variables,
// animações, classes utilitárias). Ficam aqui porque se aplicam
// independentemente da rota ativa.
//
// NOTA: Numa fase posterior, estes estilos podem migrar para index.css
// ou para um ficheiro de tema dedicado. Por agora, manter inline evita
// complexidade adicional na configuração do Tailwind v4.

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Barlow+Condensed:wght@300;400;600;700&display=swap');
    
    :root {
      --color-deep-bordeaux: #260205;
      --color-dark-red: #73242A;
      --color-black: #0D0D0D;
      --color-white: #FFFFFF;
    }

    .glass-panel {
      background: rgba(13, 13, 13, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.02);
    }

    .nav-link-glow:hover {
      text-shadow: 0 0 8px rgba(115, 36, 42, 0.8);
    }

    .tech-grid {
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
    .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }

    .stagger-1 { animation-delay: 0.1s; }
    .stagger-2 { animation-delay: 0.2s; }
    .stagger-3 { animation-delay: 0.3s; }

    .liquid-glass-hover {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .liquid-glass-hover:hover {
      background: rgba(115, 36, 42, 0.1);
      border-color: rgba(115, 36, 42, 0.4);
      transform: translateY(-2px);
    }

    .logo-text {
      font-family: 'Orbitron', sans-serif;
      letter-spacing: 2px;
      background: linear-gradient(to right, #FFFFFF, #73242A);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #0D0D0D; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #73242A; border-radius: 10px; }
  `}</style>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <AppRoutes />
    </>
  );
}
