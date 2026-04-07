// ─── CarsPage — Listagem de Carros ────────────────────────────────────
// Camada 1 (apresentação): recebe {data, loading, error} do hook.
// Não importa nada de mocks, supabase, ou serviços.

import { Link, useSearchParams } from "react-router-dom";
import { useCars } from "@/src/hooks/useCars";
import type { CarFilters } from "@/src/types/car";

export default function CarsPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") ?? undefined;

  const filters: CarFilters = {
    category: categoryFilter,
  };

  const { data, loading, error } = useCars(filters);

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-black uppercase font-['Orbitron'] mb-2">
        Explorar Carros
      </h1>
      {categoryFilter && (
        <p className="text-zinc-500 uppercase tracking-widest text-sm mb-8">
          Categoria: {categoryFilter}
        </p>
      )}

      {/* Estado: loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
      )}

      {/* Estado: error */}
      {!loading && error && (
        <div className="glass-panel rounded-2xl p-8 text-center">
          <p className="text-[#73242A] font-['Orbitron'] font-bold uppercase mb-4">
            Erro ao carregar
          </p>
          <p className="text-zinc-400 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#73242A] hover:bg-[#260205] text-white font-bold uppercase tracking-widest py-3 px-6 rounded-sm transition-colors duration-300"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Estado: success */}
      {!loading && !error && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((car) => (
            <Link
              key={car.slug}
              to={`/cars/${car.slug}`}
              className="glass-panel rounded-2xl p-6 liquid-glass-hover block"
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
          ))}
        </div>
      )}

      {/* Estado: success mas sem resultados */}
      {!loading && !error && data && data.length === 0 && (
        <div className="glass-panel rounded-2xl p-8 text-center">
          <p className="text-zinc-400 font-['Barlow_Condensed'] text-lg">
            Nenhum carro encontrado para esta categoria.
          </p>
          <Link
            to="/cars"
            className="inline-block mt-4 text-[#73242A] hover:text-white uppercase tracking-widest text-sm font-bold transition-colors"
          >
            Ver todos os carros
          </Link>
        </div>
      )}
    </div>
  );
}
