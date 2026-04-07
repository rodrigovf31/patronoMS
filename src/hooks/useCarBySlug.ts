// ─── useCarBySlug — Hook de detalhe de carro ─────────────────────────
// Camada 2: gere estado assíncrono para a ficha individual.
// Se slug for undefined, devolve estado idle sem fazer fetch.

import { useState, useEffect } from "react";
import type { CarDetail, AsyncState } from "@/src/types/car";
import { fetchCarBySlug } from "@/src/services/cars.service";

export function useCarBySlug(
  slug: string | undefined
): AsyncState<CarDetail> {
  const [data, setData] = useState<CarDetail | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Sem slug, manter estado idle (loading: false, data: null)
    if (!slug) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchCarBySlug(slug)
      .then((result) => {
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
  }, [slug]);

  return { data, loading, error };
}
