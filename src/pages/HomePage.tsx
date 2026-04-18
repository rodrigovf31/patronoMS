import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gauge,
  Wallet,
  Scale,
} from "lucide-react";
import EmptyState from "@/src/components/ui/EmptyState";
import CarCard from "@/src/components/domain/CarCard";
import type { Car } from "@/src/types/car";

// ─── Mock Data ────────────────────────────────────────────────────────
// Fase 1: FEATURED_CARS fica como Car[] vazio para mostrar a ligação ao
// type real (Phase B populará via Supabase). Os guias não têm ainda type
// próprio — a secção renderiza apenas EmptyState até existir um hook.
const FEATURED_CARS: Car[] = [];

const CALCULATORS = [
  {
    id: "cost",
    title: "Custo de Posse",
    desc: "Cálculo detalhado de manutenção, seguros e combustível.",
    icon: Wallet,
    path: "/calculators/cost-of-ownership",
  },
  {
    id: "pwr",
    title: "Potência/Peso",
    desc: "Analise a eficiência mecânica real do seu veículo.",
    icon: Scale,
    path: "/calculators/power-to-weight",
  },
  {
    id: "accel",
    title: "Estimador 0-100",
    desc: "Simulação baseada em tração, torque e aerodinâmica.",
    icon: Gauge,
    path: "/calculators/0-100-estimator",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#260205]/10 to-[#0D0D0D]" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#73242A]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#260205]/20 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#73242A]" />
              <span className="text-[#73242A] text-xs font-bold uppercase tracking-[0.4em]">
                Precision Engineering
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6 font-['Orbitron'] tracking-tighter">
              Performance. <br />
              <span className="text-[#73242A]">Quantificada.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mb-10 font-light leading-relaxed">
              A plataforma definitiva para entusiastas de alta performance.
              Fichas técnicas, comparadores e calculadoras de precisão mecânica.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/cars"
                className="px-10 py-4 bg-[#73242A] text-white font-bold uppercase tracking-widest rounded-sm hover:bg-[#260205] transition-all duration-300 shadow-xl"
              >
                Ver Listagem
              </Link>
              <Link
                to="/calculators"
                className="px-10 py-4 glass-panel text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all duration-300"
              >
                Calculadoras
              </Link>
            </div>
          </div>

          {/* Hero Visual Element */}
          <div className="hidden md:flex justify-end animate-fade-in stagger-2">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#73242A]/20 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-4 glass-panel rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-10" />
                <div className="relative z-10 text-center">
                  <Gauge size={120} className="text-[#73242A] mb-4 mx-auto opacity-80" />
                  <div className="font-['Orbitron'] text-4xl font-black">
                    342 <span className="text-sm text-zinc-500">KM/H</span>
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-widest mt-2">
                    Velocidade Máxima Registada
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#73242A] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#73242A] to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-lg animate-slide-up stagger-3">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Aceleração</p>
                <p className="text-xl font-bold">
                  2.4s <span className="text-[10px] text-zinc-400">0-100</span>
                </p>
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-lg animate-slide-up stagger-3">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Downforce</p>
                <p className="text-xl font-bold">
                  850kg <span className="text-[10px] text-zinc-400">@ 250km/h</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CARS ──────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase font-['Orbitron'] mb-4">
                Carros em Destaque
              </h2>
              <p className="text-zinc-500 max-w-md">
                As máquinas mais desejadas do momento, analisadas ao detalhe.
              </p>
            </div>
            <Link
              to="/cars"
              className="text-[#73242A] font-bold uppercase tracking-widest flex items-center gap-2 group"
            >
              Explorar Todos{" "}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {FEATURED_CARS.length === 0 ? (
            <EmptyState
              title="Em breve"
              description="Novos carros em destaque a caminho."
            />
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {FEATURED_CARS.map((car) => (
                <CarCard key={car.slug} car={car} variant="featured" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CALCULATORS HUB ────────────────────────────────────── */}
      <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase font-['Orbitron'] mb-4">
              Calculadoras de Precisão
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Ferramentas técnicas desenvolvidas para entusiastas que procuram dados reais de
              performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.id}
                to={calc.path}
                className="glass-panel p-8 rounded-2xl liquid-glass-hover flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-[#73242A]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#73242A]/20 group-hover:bg-[#73242A] transition-colors duration-500">
                  <calc.icon
                    size={32}
                    className="text-[#73242A] group-hover:text-white transition-colors duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">{calc.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{calc.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-[#73242A] font-bold uppercase text-xs tracking-widest">
                  Aceder Ferramenta <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDES SECTION ─────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black uppercase font-['Orbitron']">Guias & Insights</h2>
            <Link
              to="/guides"
              className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
            >
              Ver Todos os Guias <ArrowRight size={14} />
            </Link>
          </div>

          <EmptyState
            title="Em breve"
            description="Os nossos guias estão em preparação."
          />
        </div>
      </section>
    </>
  );
}
