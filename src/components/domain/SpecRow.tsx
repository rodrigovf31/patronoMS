// ─── SpecRow — linha par/valor de especificação técnica ──────────────
// Extraído de CarDetails (onde era componente interno). Exposto aqui
// para reutilização em ComparePage e outras páginas com tabelas de
// especificações. 100% apresentação — não formata valores, aceita
// string ou number e renderiza tal-e-qual.
//
// Exemplo:
//   <SpecRow label="Potência" value={`${car.power_hp} cv`} />
//   <SpecRow label="Velocidades" value={car.gears} />

export interface SpecRowProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function SpecRow({ label, value, className = "" }: SpecRowProps) {
  return (
    <div
      className={`flex justify-between py-3 border-b border-white/5 last:border-0 ${className}`}
    >
      <span className="text-zinc-500 font-['Barlow_Condensed'] uppercase tracking-wider text-sm">
        {label}
      </span>
      <span className="text-white font-['Barlow_Condensed'] font-semibold text-right">
        {value}
      </span>
    </div>
  );
}
