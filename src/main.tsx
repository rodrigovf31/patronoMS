import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// ─── Entry Point ──────────────────────────────────────────────────────
//
// Hierarquia de providers (de fora para dentro):
//   StrictMode     → Deteção de problemas em desenvolvimento
//   BrowserRouter  → Contexto de routing (usa a History API do browser)
//   App            → Lógica da aplicação
//
// BrowserRouter usa a History API (pushState/popState) para gerir a URL
// sem recarregar a página. Alternativas:
//   - HashRouter: usa "#" na URL (útil para hosting estático sem config)
//   - MemoryRouter: para testes (routing em memória, sem URL real)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
