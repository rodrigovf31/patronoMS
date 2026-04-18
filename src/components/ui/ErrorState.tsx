// ─── ErrorState — bloco unificado de erro ────────────────────────────
// Substitui o padrão `glass-panel rounded-2xl p-8 text-center` com
// "Erro ao carregar" + botão "Tentar Novamente" que estava duplicado
// em CarsPage e CarDetails.
//
// Exemplo:
//   <ErrorState error={error} />
//   <ErrorState error={error} onRetry={refetch} retryLabel="Recarregar" />

export interface ErrorStateProps {
  error: Error | null;
  title?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export default function ErrorState({
  error,
  title = "Erro ao carregar",
  onRetry = () => window.location.reload(),
  retryLabel = "Tentar Novamente",
  className = "",
}: ErrorStateProps) {
  const message = error?.message ?? "Erro desconhecido";

  return (
    <div className={`flex items-center justify-center py-24 ${className}`}>
      <div className="glass-panel rounded-2xl p-8 text-center max-w-md">
        <p className="text-[#73242A] font-['Orbitron'] font-bold uppercase mb-4">
          {title}
        </p>
        <p className="text-zinc-400 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="bg-[#73242A] hover:bg-[#260205] text-white font-bold uppercase tracking-widest py-3 px-6 rounded-sm transition-colors duration-300"
        >
          {retryLabel}
        </button>
      </div>
    </div>
  );
}
