// ─── useCars — Hook de listagem de carros ─────────────────────────────
// Camada 2: gere estado assíncrono. Invoca a camada de serviço.
// Não sabe de onde vêm os dados (mock, Supabase, REST...).

import { useState, useEffect } from "react";
import type { Car, CarFilters, AsyncState } from "@/src/types/car";
import { fetchCars } from "@/src/services/cars.service";

export function useCars(filters?: CarFilters): AsyncState<Car[]> {
  const [data, setData] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // JSON.stringify estabiliza a dependência do useEffect.
  // Sem isto, um novo objecto `filters` (mesmo com valores iguais) criado
  // em cada render dispararia um refetch infinito, porque {} !== {} por referência.
  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchCars(filters)
      .then((result) => {
        // Se os filtros mudaram antes desta resposta chegar,
        // ignorar o resultado obsoleto (race condition).
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps — filterKey é a versão serializada de filters
  }, [filterKey]);

  return { data, loading, error };
}
