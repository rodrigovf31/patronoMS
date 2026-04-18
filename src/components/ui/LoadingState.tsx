// ─── LoadingState — primitiva genérica de loading ────────────────────
// Padrão polimórfico: uma prop `variant` cobre três visuais de loading
// usados em páginas diferentes (centered para detalhe, skeleton-grid para
// listagem, skeleton-list para futuros ecrãs verticais). Evita três
// componentes quase-iguais com 80% de código repetido.
//
// Exemplo:
//   <LoadingState variant="skeleton-grid" count={6} />
//   <LoadingState variant="centered" message="A carregar ficha técnica..." />

import { Loader2 } from "lucide-react";

export type LoadingVariant = "centered" | "skeleton-grid" | "skeleton-list";

export interface LoadingStateProps {
  variant?: LoadingVariant;
  message?: string;
  count?: number;
  className?: string;
}

export default function LoadingState({
  variant = "centered",
  message = "A carregar...",
  count = 3,
  className = "",
}: LoadingStateProps) {
  if (variant === "skeleton-grid") {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl p-6 animate-pulse"
          >
            <div className="h-3 w-16 bg-white/10 rounded mb-4" />
            <div className="h-6 w-40 bg-white/10 rounded mb-4" />
            <div className="flex gap-6">
              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-20 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "skeleton-list") {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-xl p-4 animate-pulse h-20"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center py-24 ${className}`}
    >
      <div className="text-center space-y-4">
        <Loader2
          className="w-12 h-12 text-[#73242A] mx-auto animate-spin"
          strokeWidth={1.5}
        />
        <p className="text-zinc-500 uppercase tracking-widest text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
