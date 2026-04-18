import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/src/layouts/MainLayout";
import HomePage from "@/src/pages/HomePage";
import CarDetails from "@/src/pages/CarDetails";
import CarsPage from "@/src/pages/CarsPage";

// ─── Placeholder para páginas futuras ─────────────────────────────────
// Componente temporário que indica que a página ainda não foi implementada.
// Será substituído por componentes reais nas fases seguintes.
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-black uppercase font-['Orbitron'] mb-4">
          {title}
        </h1>
        <p className="text-zinc-500">Página em desenvolvimento — Fase 2+</p>
      </div>
    </div>
  );
}

// ─── Definição de Rotas ───────────────────────────────────────────────
// Estrutura hierárquica:
//   MainLayout (path="/")     → navbar + footer + <Outlet />
//     ├─ index               → HomePage (rota raiz "/")
//     ├─ cars                → listagem
//     ├─ cars/:slug          → ficha individual (parâmetro dinâmico)
//     ├─ compare             → comparador
//     ├─ calculators/*       → sub-rotas das calculadoras
//     ├─ guides              → listagem de guias
//     ├─ guides/:slug        → guia individual
//     └─ *                   → 404 (qualquer rota não definida)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* index = rota que corresponde ao path exato do pai ("/") */}
        <Route index element={<HomePage />} />

        {/* Carros */}
        <Route path="cars" element={<CarsPage />} />
        <Route path="cars/:slug" element={<CarDetails />} />

        {/* Comparador */}
        <Route
          path="compare"
          element={<PlaceholderPage title="Comparador" />}
        />

        {/* Calculadoras — agrupadas sob /calculators */}
        <Route
          path="calculators"
          element={<PlaceholderPage title="Calculadoras" />}
        />
        <Route
          path="calculators/cost-of-ownership"
          element={<PlaceholderPage title="Custo de Posse" />}
        />
        <Route
          path="calculators/power-to-weight"
          element={<PlaceholderPage title="Potência / Peso" />}
        />
        <Route
          path="calculators/0-100-estimator"
          element={<PlaceholderPage title="Estimador 0-100" />}
        />

        {/* Guias */}
        <Route
          path="guides"
          element={<PlaceholderPage title="Guias & Insights" />}
        />
        <Route path="guides/:slug" element={<PlaceholderPage title="Artigo" />} />

        {/* 404 — qualquer URL não mapeada */}
        <Route
          path="*"
          element={<PlaceholderPage title="404 — Página Não Encontrada" />}
        />
      </Route>
    </Routes>
  );
}
