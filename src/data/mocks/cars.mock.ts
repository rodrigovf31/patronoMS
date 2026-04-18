// ─── Mock Data — Phase A ──────────────────────────────────────────────
// Camada 4: fonte de dados. Substituída por Supabase na Phase B.
// Extraído dos componentes originais (CarsPage.tsx e CarDetails.tsx).

import type { Car, CarDetail } from "@/src/types/car";

/** Listagem — dados mínimos para cards */
export const MOCK_CARS: Car[] = [
  {
    id: "uuid-placeholder",
    slug: "bmw-m3-f80-competition",
    brand: "BMW",
    model: "M3",
    generation: "F80",
    category_slug: "sports",
    category_name: "Sports",
    power_hp: 450,
    accel_0_100: 4.0,
  },
];

/** Detalhe — ficha técnica completa, indexada por slug */
export const MOCK_CAR_DETAILS: Record<string, CarDetail> = {
  "bmw-m3-f80-competition": {
    // Campos herdados de Car (listagem)
    id: "uuid-placeholder",
    slug: "bmw-m3-f80-competition",
    brand: "BMW",
    model: "M3",
    generation: "F80",
    category_slug: "sports",
    category_name: "Sports",
    power_hp: 450,
    accel_0_100: 4.0,

    // Campos de detalhe
    brand_id: "uuid-placeholder",
    category_id: "uuid-placeholder",
    variant: "Competition",
    generation_code: "F80",
    year_start: 2016,
    year_end: 2018,
    tagline: "O \u00FAltimo M3 de seis cilindros em linha. Puro, visceral, inesquec\u00EDvel.",
    description:
      "O BMW M3 Competition (F80) representa o auge da engenharia da divis\u00E3o M antes da era h\u00EDbrida. Com uma afina\u00E7\u00E3o de chassis mais agressiva que o M3 standard, o pacote Competition eleva a pot\u00EAncia para 450 cv e introduz um diferencial ativo recalibrado. A resposta do motor S55 \u00E9 brutal, entregando um bin\u00E1rio massivo logo \u00E0s 1.850 rpm, enquanto a suspens\u00E3o adaptativa M garante uma precis\u00E3o cir\u00FArgica em curva. \u00C9 uma m\u00E1quina que exige respeito e recompensa os condutores mais experientes com uma din\u00E2mica de condu\u00E7\u00E3o inigual\u00E1vel.",

    // Motor
    engine_name: "S55B30T0",
    engine_type: "Twin-Turbo Inline-6",
    engine_layout: "Dianteiro, longitudinal",
    displacement_cc: 2979,
    cylinders: 6,
    valves_per_cyl: 4,
    forced_induction: "Twin-Turbo",

    // Performance
    power_kw: 331,
    power_rpm: "7000",
    torque_nm: 550,
    torque_rpm: "1850-5500",
    top_speed_kph: 280,
    top_speed_limited: true,
    accel_0_200: 12.8,
    accel_quarter_mile: 12.2,

    // Transmissão
    transmission_type: "DCT",
    transmission_name: "7-speed M-DCT (Getrag GS7D36SG)",
    gears: 7,
    drive_type: "RWD",
    differential: "Active M Differential",

    // Dimensões
    weight_kg: 1520,
    length_mm: 4671,
    width_mm: 1877,
    height_mm: 1424,
    wheelbase_mm: 2812,
    fuel_tank_liters: 60,
    trunk_liters: 480,

    // Consumo
    fuel_type: "Gasolina",
    consumption_combined: 8.8,
    co2_emissions: 204,

    // Chassis
    front_suspension: "MacPherson strut, adaptive dampers",
    rear_suspension: "Multi-link, adaptive dampers",
    front_brakes: "Discos ventilados 380mm, pin\u00E7as 4 pist\u00F5es",
    rear_brakes: "Discos ventilados 370mm, pin\u00E7as 2 pist\u00F5es",
    front_tires: "255/35 ZR19",
    rear_tires: "275/35 ZR19",

    // Preço
    price_new_eur: 95000,
    price_used_min_eur: 45000,
    price_used_max_eur: 72000,

    // Avaliação editorial
    score_performance: 9.2,
    score_handling: 9.5,
    score_comfort: 6.8,
    score_value: 7.5,
    score_overall: 8.8,

    // SEO
    meta_title: "BMW M3 F80 Competition - Ficha T\u00E9cnica e Performance",
    meta_description:
      "Descobre tudo sobre o BMW M3 F80 Competition. Especifica\u00E7\u00F5es t\u00E9cnicas, performance, pre\u00E7os e avalia\u00E7\u00E3o editorial.",

    // Relações
    brands: { name: "BMW", slug: "bmw", country: "Alemanha", logo_url: null },
    categories: {
      name: "Sports",
      slug: "sports",
      description: "Carros desportivos de alta performance",
    },
    car_highlights: [
      { type: "pro", text_content: "Motor S55 com resposta brutal e bin\u00E1rio massivo", display_order: 1 },
      { type: "pro", text_content: "Chassis Competition incrivelmente preciso", display_order: 2 },
      { type: "pro", text_content: "Caixa DCT super r\u00E1pida e agressiva", display_order: 3 },
      { type: "con", text_content: "Som do motor artificial via colunas", display_order: 1 },
      { type: "con", text_content: "Suspens\u00E3o demasiado firme para uso di\u00E1rio", display_order: 2 },
      { type: "con", text_content: "Tra\u00E7\u00E3o traseira pode ser trai\u00E7oeira \u00E0 chuva", display_order: 3 },
    ],
    car_images: [
      { url: "/placeholder-hero.jpg", alt_text: "BMW M3 F80 Competition", is_hero: true, display_order: 0 },
    ],
  },
};
