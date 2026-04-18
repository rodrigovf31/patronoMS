// ─── CarCard — card de carro para listagens ──────────────────────────
// Duas variantes:
//   - compact: linha de grid em listagens (usado em CarsPage)
//   - featured: visual rico para destaques (usado em futuros hero slots)
// Recebe o objecto `Car` completo — o componente extrai internamente os
// campos que precisa. Evita props deslocadas por lista.
//
// Os dois visuais partilham o mesmo contrato Car, apenas renderizam de
// forma diferente. Não tem conhecimento de Supabase, mocks, ou hooks.

import { Link } from "react-router-dom";
import { ArrowRight, Gauge } from "lucide-react";
import type { Car } from "@/src/types/car";

export type CarCardVariant = "compact" | "featured";

export interface CarCardProps {
  car: Car;
  variant?: CarCardVariant;
  className?: string;
}

export default function CarCard({
  car,
  variant = "compact",
  className = "",
}: CarCardProps) {
  if (variant === "featured") {
    return (
      <div
        className={`glass-panel rounded-2xl overflow-hidden liquid-glass-hover ${className}`}
      >
        <div className="h-48 bg-gradient-to-br from-[#73242A] to-[#260205] relative flex items-center justify-center group">
          <div className="absolute inset-0 tech-grid opacity-10" />
          <Gauge
            size={64}
            className="text-white/20 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
            {car.brand}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold uppercase mb-4">
            {car.model}{" "}
            <span className="text-zinc-500">{car.generation}</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
                Potência
              </p>
              <p className="text-lg font-bold">
                {car.power_hp}{" "}
                <span className="text-[10px] text-zinc-400">CV</span>
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
                0-100 km/h
              </p>
              <p className="text-lg font-bold">{car.accel_0_100}s</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link
              to={`/cars/${car.slug}`}
              className="p-2 bg-white/5 rounded-full hover:bg-[#73242A] transition-colors"
              aria-label={`Ver ficha de ${car.brand} ${car.model}`}
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/cars/${car.slug}`}
      className={`glass-panel rounded-2xl p-6 liquid-glass-hover block ${className}`}
    >
      <p className="text-[#73242A] text-xs font-bold uppercase tracking-widest">
        {car.brand}
      </p>
      <h2 className="text-2xl font-bold uppercase mt-2">
        {car.model} {car.generation}
      </h2>
      <div className="flex gap-6 mt-4 text-sm text-zinc-400">
        <span>{car.power_hp} cv</span>
        <span>{car.accel_0_100}s 0–100</span>
      </div>
    </Link>
  );
}
