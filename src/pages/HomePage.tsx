import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gauge,
  Wallet,
  Scale,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────
// Fase 1: dados estáticos. Serão substituídos por queries ao Supabase.
const FEATURED_CARS = [
  {
    id: 1,
    name: "Apex Predator GT",
    brand: "Veloce",
    hp: 820,
    acceleration: "2.6s",
    price: "285.000€",
    color: "from-[#73242A] to-[#260205]",
  },
  {
    id: 2,
    name: "Lumina RS",
    brand: "Aether",
    hp: 650,
    acceleration: "3.1s",
    price: "195.000€",
    color: "from-zinc-800 to-black",
  },
  {
    id: 3,
    name: "Titan V12",
    brand: "Ironworks",
    hp: 950,
    acceleration: "2.4s",
    price: "420.000€",
    color: "from-[#260205] to-black",
  },
];

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

const RECENT_GUIDES = [
  {
    id: 1,
    title: "Guia de Compra: Supercarros Usados",
    excerpt: "O que verificar antes de investir num ícone da década passada.",
    date: "28 Mar 2026",
  },
  {
    id: 2,
    title: "Aerodinâmica Ativa: O Futuro",
    excerpt: "Como as asas móveis estão a redefinir os limites da física.",
    date: "25 Mar 2026",
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

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_CARS.map((car, idx) => (
              <div
                key={car.id}
                className="glass-panel rounded-2xl overflow-hidden liquid-glass-hover animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`h-48 bg-gradient-to-br ${car.color} relative flex items-center justify-center group`}
                >
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
                  <h3 className="text-xl font-bold uppercase mb-4">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Potência</p>
                      <p className="text-lg font-bold">
                        {car.hp} <span className="text-[10px] text-zinc-400">CV</span>
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">0-100 km/h</p>
                      <p className="text-lg font-bold">{car.acceleration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-[#73242A]">{car.price}</span>
                    <Link
                      to={`/cars/${car.id}`}
                      className="p-2 bg-white/5 rounded-full hover:bg-[#73242A] transition-colors"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

          <div className="grid md:grid-cols-2 gap-8">
            {RECENT_GUIDES.map((guide) => (
              <div key={guide.id} className="glass-panel p-8 rounded-2xl liquid-glass-hover group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-3 py-1 bg-[#73242A]/20 border border-[#73242A]/30 rounded text-[10px] font-bold text-[#73242A] uppercase tracking-widest">
                    Editorial
                  </div>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    {guide.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-[#73242A] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-zinc-500 mb-8 leading-relaxed">{guide.excerpt}</p>
                <Link
                  to={`/guides/${guide.id}`}
                  className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all"
                >
                  Ler Artigo Completo <ArrowRight size={14} className="text-[#73242A]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
