// ─── Tipos do recurso Car ─────────────────────────────────────────────
// Camada transversal: usados por hooks, serviços e páginas.
// Nenhuma lógica aqui — apenas contratos de dados.

/** Modelo de listagem — campos mínimos para cards e grids */
export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  generation: string;
  category_slug: string;
  category_name: string;
  power_hp: number;
  accel_0_100: number;
}

/** Objetos aninhados presentes no detalhe */
export interface CarBrand {
  name: string;
  slug: string;
  country: string;
  logo_url: string | null;
}

export interface CarCategory {
  name: string;
  slug: string;
  description: string;
}

export interface CarHighlight {
  type: "pro" | "con";
  text_content: string;
  display_order: number;
}

export interface CarImage {
  url: string;
  alt_text: string;
  is_hero: boolean;
  display_order: number;
}

/** Modelo de detalhe — ficha técnica completa */
export interface CarDetail extends Car {
  brand_id: string;
  category_id: string;
  variant: string;
  generation_code: string;
  year_start: number;
  year_end: number | null;
  tagline: string;
  description: string;

  // Motor
  engine_name: string;
  engine_type: string;
  engine_layout: string;
  displacement_cc: number;
  cylinders: number;
  valves_per_cyl: number;
  forced_induction: string;

  // Performance
  power_kw: number;
  power_rpm: string;
  torque_nm: number;
  torque_rpm: string;
  top_speed_kph: number;
  top_speed_limited: boolean;
  accel_0_200: number;
  accel_quarter_mile: number;

  // Transmissão
  transmission_type: string;
  transmission_name: string;
  gears: number;
  drive_type: string;
  differential: string;

  // Dimensões
  weight_kg: number;
  length_mm: number;
  width_mm: number;
  height_mm: number;
  wheelbase_mm: number;
  fuel_tank_liters: number;
  trunk_liters: number;

  // Consumo
  fuel_type: string;
  consumption_combined: number;
  co2_emissions: number;

  // Chassis
  front_suspension: string;
  rear_suspension: string;
  front_brakes: string;
  rear_brakes: string;
  front_tires: string;
  rear_tires: string;

  // Preço
  price_new_eur: number;
  price_used_min_eur: number;
  price_used_max_eur: number;

  // Avaliação editorial
  score_performance: number;
  score_handling: number;
  score_comfort: number;
  score_value: number;
  score_overall: number;

  // SEO
  meta_title: string;
  meta_description: string;

  // Relações
  brands: CarBrand;
  categories: CarCategory;
  car_highlights: CarHighlight[];
  car_images: CarImage[];
}

/** Filtros de pesquisa para a listagem */
export interface CarFilters {
  category?: string;
  search?: string;
}

/** Estado assíncrono genérico — reutilizável em qualquer hook de data fetching */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
