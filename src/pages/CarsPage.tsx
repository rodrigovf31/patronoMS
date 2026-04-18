// ─── CarsPage — Listagem de Carros ────────────────────────────────────
// Camada 1 (apresentação): recebe {data, loading, error} do hook.
// Não importa nada de mocks, supabase, ou serviços.

import { Link, useSearchParams } from "react-router-dom";
import { useCars } from "@/src/hooks/useCars";
import type { CarFilters } from "@/src/types/car";
import LoadingState from "@/src/components/ui/LoadingState";
import ErrorState from "@/src/components/ui/ErrorState";
import EmptyState from "@/src/components/ui/EmptyState";
import PageHeader from "@/src/components/ui/PageHeader";
import CarCard from "@/src/components/domain/CarCard";

export default function CarsPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") ?? undefined;

  const filters: CarFilters = {
    category: categoryFilter,
  };

  const { data, loading, error } = useCars(filters);

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-6">
      <PageHeader
        title="Explorar Carros"
        subtitle="Fichas técnicas dos carros de performance mais relevantes."
        className="mb-8"
      />
      {categoryFilter && (
        <p className="text-zinc-500 uppercase tracking-widest text-sm mb-8">
          Categoria: {categoryFilter}
        </p>
      )}

      {loading && <LoadingState variant="skeleton-grid" count={6} />}

      {!loading && error && <ErrorState error={error} />}

      {!loading && !error && data && data.length === 0 && (
        <EmptyState
          title="Nenhum carro encontrado"
          description="Não encontrámos carros para esta categoria."
          action={
            <Link
              to="/cars"
              className="inline-block text-[#73242A] hover:text-white uppercase tracking-widest text-sm font-bold transition-colors"
            >
              Ver todos os carros
            </Link>
          }
        />
      )}

      {!loading && !error && data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((car) => (
            <CarCard key={car.slug} car={car} variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}
