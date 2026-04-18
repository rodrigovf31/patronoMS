// ─── CarDetails — Ficha Individual do Carro ──────────────────────────
// Camada 1 (apresentação): consome useCarBySlug, trata 4 estados
// (loading / error / not-found / success). Zero conhecimento da fonte de dados.

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight, Gauge, Zap, Weight, Timer, Ruler, Shield,
  TrendingUp, Check, X, Car, Fuel, Settings, ArrowRight, Activity,
} from "lucide-react";
import { useCarBySlug } from "@/src/hooks/useCarBySlug";
import LoadingState from "@/src/components/ui/LoadingState";
import ErrorState from "@/src/components/ui/ErrorState";
import EmptyState from "@/src/components/ui/EmptyState";
import SpecRow from "@/src/components/domain/SpecRow";

const formatNumber = (num: number): string =>
  new Intl.NumberFormat("pt-PT").format(num);

export default function CarDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useCarBySlug(slug);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (data) setMounted(true);
  }, [data]);

  // ─── Estado: loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <LoadingState
        variant="centered"
        message="A carregar ficha técnica..."
        className="min-h-screen pt-28 pb-24"
      />
    );
  }

  // ─── Estado: error ──────────────────────────────────────────────────
  if (error) {
    return <ErrorState error={error} className="min-h-screen pt-28 pb-24" />;
  }

  // ─── Estado: not-found ──────────────────────────────────────────────
  if (!data) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <EmptyState
          title="Carro não encontrado"
          description="O carro que procuras não existe ou foi removido."
          icon={<Car className="w-16 h-16 text-zinc-600" strokeWidth={1} />}
          action={
            <Link
              to="/cars"
              className="inline-block bg-[#73242A] hover:bg-[#260205] text-white font-bold uppercase tracking-widest py-3 px-6 rounded-sm transition-colors duration-300"
            >
              Ver Todos os Carros
            </Link>
          }
          className="max-w-md"
        />
      </div>
    );
  }

  // ─── Estado: success ────────────────────────────────────────────────
  const pros = data.car_highlights
    .filter((h) => h.type === "pro")
    .sort((a, b) => a.display_order - b.display_order);
  const cons = data.car_highlights
    .filter((h) => h.type === "con")
    .sort((a, b) => a.display_order - b.display_order);

  const powerToWeight = (data.power_hp / data.weight_kg).toFixed(2);

  const renderProgressBar = (label: string, score: number, isOverall = false) => {
    const percentage = (score / 10) * 100;
    return (
      <div className={`mb-6 ${isOverall ? "mt-8" : ""}`} key={label}>
        <div className="flex justify-between items-end mb-2">
          <span
            className={`font-['Barlow_Condensed'] uppercase tracking-wider ${
              isOverall
                ? "text-xl text-white font-bold"
                : "text-sm text-zinc-400"
            }`}
          >
            {label}
          </span>
          <span
            className={`font-['Orbitron'] ${
              isOverall
                ? "text-3xl text-[#73242A] font-black"
                : "text-lg text-white font-bold"
            }`}
          >
            {score.toFixed(1)}
            <span className="text-zinc-600 text-sm">/10</span>
          </span>
        </div>
        <div
          className={`w-full bg-black/50 rounded-full overflow-hidden border border-white/5 ${
            isOverall ? "h-4" : "h-2"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#260205] to-[#73242A] rounded-full transition-all duration-1000 ease-out"
            style={{ width: mounted ? `${percentage}%` : "0%" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Barlow_Condensed'] pt-28 pb-24 overflow-x-hidden">

      {/* Section 1: Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-20 relative">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none -z-10" />

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-500 uppercase tracking-widest mb-8 animate-fade-in">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/cars" className="hover:text-white transition-colors">Carros</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/cars?category=${data.categories.slug}`} className="hover:text-white transition-colors">{data.categories.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{data.brands.name} {data.model} {data.generation_code}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-block border border-[#73242A] text-[#73242A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
              {data.categories.name}
            </div>

            <div>
              <p className="text-zinc-400 text-xl tracking-widest uppercase mb-2">{data.brands.name}</p>
              <h1 className="font-['Orbitron'] text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
                {data.model} <span className="text-[#73242A]">{data.variant}</span>
              </h1>
              <div className="flex items-center space-x-4">
                <span className="font-mono bg-white/10 px-3 py-1 rounded text-sm text-zinc-300 border border-white/10">
                  {data.generation_code}
                </span>
                <span className="text-zinc-500 font-bold tracking-widest">
                  {data.year_start}–{data.year_end || "Presente"}
                </span>
              </div>
            </div>

            <p className="text-xl text-zinc-300 italic border-l-2 border-[#73242A] pl-4 py-1">
              &ldquo;{data.tagline}&rdquo;
            </p>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Zap className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{data.power_hp}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">CV</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Timer className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{data.accel_0_100}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">0-100 (s)</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Gauge className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{data.top_speed_kph}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">KM/H</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Weight className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{formatNumber(data.weight_kg)}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">KG</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Placeholder */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center animate-slide-up stagger-1 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#73242A]/40 to-[#260205]/80 mix-blend-multiply" />
            <div className="absolute inset-0 tech-grid opacity-30" />
            <Car className="w-48 h-48 text-white/20 group-hover:scale-110 transition-transform duration-700 ease-out" strokeWidth={1} />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="font-['Orbitron'] text-white/40 text-sm tracking-[0.3em] uppercase">
                {data.generation_code} // {data.engine_name}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Editorial Description */}
      <section className="max-w-4xl mx-auto px-6 mb-24 animate-slide-up stagger-2">
        <h2 className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center">Visão Editorial</h2>
        <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#73242A]" />
          <p className="text-lg md:text-xl leading-relaxed text-zinc-300 font-light">
            <span className="float-left text-6xl font-['Orbitron'] font-black text-[#73242A] leading-none pr-3 pt-2">
              {data.description.charAt(0)}
            </span>
            {data.description.substring(1)}
          </p>
        </div>
      </section>

      {/* Section 3: Technical Specs */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-['Orbitron'] text-3xl font-black uppercase mb-2">Especificações Técnicas</h2>
        <p className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-10">Dados de Engenharia</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3.1 Motor & Performance */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Activity className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Motor & Performance</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                <SpecRow label="Código do Motor" value={data.engine_name} />
                <SpecRow label="Tipo" value={data.engine_type} />
                <SpecRow label="Layout" value={data.engine_layout} />
                <SpecRow label="Cilindrada" value={`${formatNumber(data.displacement_cc)} cc`} />
                <SpecRow label="Cilindros × Válvulas" value={`${data.cylinders} cil. × ${data.valves_per_cyl} válv.`} />
                <SpecRow label="Indução Forçada" value={data.forced_induction} />
              </div>
              <div>
                <SpecRow label="Potência" value={`${data.power_hp} cv (${data.power_kw} kW) @ ${data.power_rpm} rpm`} />
                <SpecRow label="Binário" value={`${data.torque_nm} Nm @ ${data.torque_rpm} rpm`} />
                <SpecRow label="0-100 km/h" value={`${data.accel_0_100} s`} />
                <SpecRow label="0-200 km/h" value={`${data.accel_0_200} s`} />
                <SpecRow label="¼ Milha" value={`${data.accel_quarter_mile} s`} />
                <SpecRow label="Velocidade Máxima" value={`${data.top_speed_kph} km/h ${data.top_speed_limited ? "(limitado eletronicamente)" : ""}`} />
                <SpecRow label="Rácio Potência/Peso" value={`${powerToWeight} cv/kg`} />
              </div>
            </div>
          </div>

          {/* 3.2 Transmissão */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-2">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Settings className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Transmissão</h3>
            </div>
            <SpecRow label="Tipo" value={data.transmission_type} />
            <SpecRow label="Nome" value={data.transmission_name} />
            <SpecRow label="Velocidades" value={data.gears} />
            <SpecRow label="Tração" value={data.drive_type} />
            <SpecRow label="Diferencial" value={data.differential} />
          </div>

          {/* 3.3 Dimensões & Peso */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-1">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Ruler className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Dimensões & Peso</h3>
            </div>
            <SpecRow label="C × L × A" value={`${formatNumber(data.length_mm)} × ${formatNumber(data.width_mm)} × ${formatNumber(data.height_mm)} mm`} />
            <SpecRow label="Entre-eixos" value={`${formatNumber(data.wheelbase_mm)} mm`} />
            <SpecRow label="Peso" value={`${formatNumber(data.weight_kg)} kg`} />
            <SpecRow label="Depósito" value={`${data.fuel_tank_liters} L`} />
            <SpecRow label="Bagageira" value={`${data.trunk_liters} L`} />
          </div>

          {/* 3.4 Chassis & Pneus */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-2">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Shield className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Chassis & Pneus</h3>
            </div>
            <SpecRow label="Susp. Dianteira" value={data.front_suspension} />
            <SpecRow label="Susp. Traseira" value={data.rear_suspension} />
            <SpecRow label="Travões Diant." value={data.front_brakes} />
            <SpecRow label="Travões Tras." value={data.rear_brakes} />
            <SpecRow label="Pneus Diant." value={data.front_tires} />
            <SpecRow label="Pneus Tras." value={data.rear_tires} />
          </div>

          {/* 3.5 Consumo */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-3">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Fuel className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Consumo</h3>
            </div>
            <SpecRow label="Combustível" value={data.fuel_type} />
            <SpecRow label="Combinado" value={`${data.consumption_combined} L/100km`} />
            <SpecRow label="Emissões CO₂" value={`${data.co2_emissions} g/km`} />
          </div>
        </div>
      </section>

      {/* Section 4: Editorial Rating & Section 5: Pros/Cons */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Rating */}
          <div className="glass-panel rounded-2xl p-8 animate-slide-up">
            <h2 className="font-['Orbitron'] text-3xl font-black uppercase mb-2">Avaliação</h2>
            <p className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-8">Score Editorial</p>

            <div className="space-y-2">
              {renderProgressBar("Performance", data.score_performance)}
              {renderProgressBar("Handling", data.score_handling)}
              {renderProgressBar("Conforto", data.score_comfort)}
              {renderProgressBar("Valor", data.score_value)}

              <div className="pt-4 border-t border-white/10">
                {renderProgressBar("Overall Score", data.score_overall, true)}
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="glass-panel rounded-2xl p-8 animate-slide-up stagger-1">
            <h2 className="font-['Orbitron'] text-3xl font-black uppercase mb-2">Prós & Contras</h2>
            <p className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-8">Destaques</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Pros */}
              <div>
                <h3 className="text-[#4ADE80] font-['Orbitron'] font-bold uppercase tracking-wider mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2" /> Prós
                </h3>
                <ul className="space-y-4">
                  {pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
                      <span className="text-zinc-300 text-lg leading-tight">{pro.text_content}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-[#73242A] font-['Orbitron'] font-bold uppercase tracking-wider mb-4 flex items-center">
                  <X className="w-5 h-5 mr-2" /> Contras
                </h3>
                <ul className="space-y-4">
                  {cons.map((con, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-[#73242A] shrink-0" />
                      <span className="text-zinc-300 text-lg leading-tight">{con.text_content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Prices */}
      <section className="max-w-7xl mx-auto px-6 mb-24 animate-slide-up">
        <h2 className="font-['Orbitron'] text-3xl font-black uppercase mb-2 text-center">Valores de Mercado</h2>
        <p className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-10 text-center">Estimativas Portugal</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-8 text-center liquid-glass-hover">
            <h3 className="text-zinc-400 uppercase tracking-widest text-sm mb-4">Novo (Histórico)</h3>
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(data.price_new_eur)} &euro;</p>
          </div>
          <div className="glass-panel rounded-2xl p-8 text-center liquid-glass-hover border-[#73242A]/30">
            <h3 className="text-zinc-400 uppercase tracking-widest text-sm mb-4">Usado (Mínimo)</h3>
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(data.price_used_min_eur)} &euro;</p>
          </div>
          <div className="glass-panel rounded-2xl p-8 text-center liquid-glass-hover">
            <h3 className="text-zinc-400 uppercase tracking-widest text-sm mb-4">Usado (Máximo)</h3>
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(data.price_used_max_eur)} &euro;</p>
          </div>
        </div>
        <p className="text-center text-zinc-600 text-xs mt-6 uppercase tracking-wider">
          * Valores estimados para o mercado português. Consulta sempre um stand oficial.
        </p>
      </section>

      {/* Section 7: Final CTAs */}
      <section className="max-w-3xl mx-auto px-6 text-center animate-slide-up stagger-1">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/compare"
            className="w-full sm:w-auto bg-[#73242A] hover:bg-[#260205] text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm transition-colors duration-300 flex items-center justify-center group"
          >
            Comparar com Outro Carro
            <TrendingUp className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/cars"
            className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white/60 text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm transition-colors duration-300 flex items-center justify-center group"
          >
            Ver Todos os Carros
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
