// ─── Cars Service — Camada de Acesso a Dados ─────────────────────────
// Camada 3: funções puras assíncronas. ÚNICO ponto de troca entre fases.
// Phase A: lê de mocks locais.
// Phase B: substituir o corpo de cada função pela query Supabase indicada.

import type { Car, CarDetail, CarFilters } from "@/src/types/car";
import { MOCK_CARS, MOCK_CAR_DETAILS } from "@/src/data/mocks/cars.mock";

/** Latência simulada para realismo de UX (loading states visíveis) */
const SIMULATED_LATENCY_MS = 150;

/**
 * Obtém a lista de carros, opcionalmente filtrada.
 *
 * Phase B: substituir o corpo inteiro por:
 * ```ts
 * import { supabase } from "@/src/lib/supabase";
 *
 * let query = supabase
 *   .from("cars")
 *   .select("id, slug, brand:brands(name), model, generation:generation_code, category_slug:categories(slug), category_name:categories(name), power_hp, accel_0_100");
 *
 * if (filters?.category) {
 *   query = query.eq("categories.slug", filters.category);
 * }
 * if (filters?.search) {
 *   query = query.ilike("model", `%${filters.search}%`);
 * }
 *
 * const { data, error } = await query;
 * if (error) throw new Error(`Erro ao carregar carros: ${error.message}`);
 * return data as Car[];
 * ```
 */
export async function fetchCars(filters?: CarFilters): Promise<Car[]> {
  await new Promise((r) => setTimeout(r, SIMULATED_LATENCY_MS));

  try {
    let results = [...MOCK_CARS];

    if (filters?.category) {
      results = results.filter((c) => c.category_slug === filters.category);
    }

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.brand.toLowerCase().includes(term) ||
          c.model.toLowerCase().includes(term) ||
          c.generation.toLowerCase().includes(term)
      );
    }

    return results;
  } catch (err) {
    throw new Error(
      `Erro ao carregar carros: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * Obtém o detalhe completo de um carro pelo slug.
 *
 * Phase B: substituir o corpo inteiro por:
 * ```ts
 * import { supabase } from "@/src/lib/supabase";
 *
 * const { data, error } = await supabase
 *   .from("cars")
 *   .select(`
 *     *,
 *     brands (*),
 *     categories (*),
 *     car_highlights (*),
 *     car_images (*)
 *   `)
 *   .eq("slug", slug)
 *   .single();
 *
 * if (error) throw new Error(`Erro ao carregar carro: ${error.message}`);
 * return data as CarDetail | null;
 * ```
 */
export async function fetchCarBySlug(
  slug: string
): Promise<CarDetail | null> {
  await new Promise((r) => setTimeout(r, SIMULATED_LATENCY_MS));

  try {
    return MOCK_CAR_DETAILS[slug] ?? null;
  } catch (err) {
    throw new Error(
      `Erro ao carregar carro "${slug}": ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
