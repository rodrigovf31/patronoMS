// ─── PageHeader — cabeçalho canónico de página ───────────────────────
// Padrão visual: eyebrow opcional (linha + label em caps) + h1 em
// Orbitron + subtítulo opcional. Usado em páginas internas (listagens,
// fichas). Não adequado para landing heroes com layout 2-col — nesses
// casos fica inline na página.
//
// Renderiza sempre um <h1> real (não div) — importante para SEO e a11y.

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: PageHeaderProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`${alignClasses} ${className}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-6 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <div className="h-[1px] w-12 bg-[#73242A]" />
          <span className="text-[#73242A] text-xs font-bold uppercase tracking-[0.4em]">
            {eyebrow}
          </span>
        </div>
      )}
      <h1 className="text-4xl md:text-6xl font-black uppercase font-['Orbitron'] tracking-tighter leading-none">
        {title}
      </h1>
      {subtitle && (
        <p className="text-zinc-400 mt-4 max-w-2xl font-['Barlow_Condensed'] text-lg">
          {subtitle}
        </p>
      )}
    </header>
  );
}
