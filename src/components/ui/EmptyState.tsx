// ─── EmptyState — bloco genérico "sem resultados" / "em breve" ───────
// Usado quando um fetch devolve lista vazia, ou quando uma secção ainda
// não tem dados disponíveis. Slots `icon` e `action` permitem variações
// sem inchar a interface.
//
// Exemplo:
//   <EmptyState title="Em breve" description="Os guias estão em preparação." />
//   <EmptyState title="Nenhum carro encontrado" action={<Link to="/cars">...</Link>} />

import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`glass-panel rounded-2xl p-8 text-center ${className}`}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h2 className="font-['Orbitron'] text-2xl font-bold uppercase text-zinc-300">
        {title}
      </h2>
      {description && (
        <p className="text-zinc-400 font-['Barlow_Condensed'] text-lg mt-4">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
