// CarsPage.tsx — versão mínima Phase A
// Objetivo: servir de ponte navegável entre a Navbar e CarDetails
// Substituirá o PlaceholderPage até à Fase 2B (versão Supabase real)

import { Link, useSearchParams } from "react-router-dom";

// Mock temporário: um único carro, espelha o slug usado em CarDetails.jsx
const MOCK_CARS = [
  {
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

export default function CarsPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category"); // ex: "sports"

  // Filtragem: se houver ?category=X, mostra só os dessa categoria
  const visibleCars = categoryFilter
    ? MOCK_CARS.filter((c) => c.category_slug === categoryFilter)
    : MOCK_CARS;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCars.map((car) => (
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
    </div>
  );
}
