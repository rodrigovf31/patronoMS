// ─── PlaceholderPage — ecrã "em desenvolvimento" ─────────────────────
// Usado como element de <Route> para páginas planeadas mas ainda não
// implementadas (compare, calculators, guides, 404). Substituído pelos
// componentes reais à medida que vão sendo construídos.

export interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
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
