import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Gauge, Zap, Weight, Timer, Ruler, Shield, 
  TrendingUp, Check, X, Car, Fuel, Settings, ArrowRight, Activity
} from "lucide-react";

const CAR_DATA = {
  id: "uuid-placeholder",
  brand_id: "uuid-placeholder",
  category_id: "uuid-placeholder",
  model: "M3",
  variant: "Competition",
  generation_code: "F80",
  slug: "bmw-m3-f80-competition",
  year_start: 2016,
  year_end: 2018,
  tagline: "O último M3 de seis cilindros em linha. Puro, visceral, inesquecível.",
  description: "O BMW M3 Competition (F80) representa o auge da engenharia da divisão M antes da era híbrida. Com uma afinação de chassis mais agressiva que o M3 standard, o pacote Competition eleva a potência para 450 cv e introduz um diferencial ativo recalibrado. A resposta do motor S55 é brutal, entregando um binário massivo logo às 1.850 rpm, enquanto a suspensão adaptativa M garante uma precisão cirúrgica em curva. É uma máquina que exige respeito e recompensa os condutores mais experientes com uma dinâmica de condução inigualável.",
  
  engine_name: "S55B30T0",
  engine_type: "Twin-Turbo Inline-6",
  engine_layout: "Dianteiro, longitudinal",
  displacement_cc: 2979,
  cylinders: 6,
  valves_per_cyl: 4,
  forced_induction: "Twin-Turbo",
  
  power_hp: 450,
  power_kw: 331,
  power_rpm: "7000",
  torque_nm: 550,
  torque_rpm: "1850-5500",
  top_speed_kph: 280,
  top_speed_limited: true,
  accel_0_100: 4.0,
  accel_0_200: 12.8,
  accel_quarter_mile: 12.2,
  
  transmission_type: "DCT",
  transmission_name: "7-speed M-DCT (Getrag GS7D36SG)",
  gears: 7,
  drive_type: "RWD",
  differential: "Active M Differential",
  
  weight_kg: 1520,
  length_mm: 4671,
  width_mm: 1877,
  height_mm: 1424,
  wheelbase_mm: 2812,
  
  fuel_tank_liters: 60,
  trunk_liters: 480,
  
  fuel_type: "Gasolina",
  consumption_combined: 8.8,
  co2_emissions: 204,
  
  front_suspension: "MacPherson strut, adaptive dampers",
  rear_suspension: "Multi-link, adaptive dampers",
  front_brakes: "Discos ventilados 380mm, pinças 4 pistões",
  rear_brakes: "Discos ventilados 370mm, pinças 2 pistões",
  front_tires: "255/35 ZR19",
  rear_tires: "275/35 ZR19",
  
  price_new_eur: 95000,
  price_used_min_eur: 45000,
  price_used_max_eur: 72000,
  
  score_performance: 9.2,
  score_handling: 9.5,
  score_comfort: 6.8,
  score_value: 7.5,
  score_overall: 8.8,
  
  meta_title: "BMW M3 F80 Competition - Ficha Técnica e Performance",
  meta_description: "Descobre tudo sobre o BMW M3 F80 Competition. Especificações técnicas, performance, preços e avaliação editorial.",
  
  brands: { name: "BMW", slug: "bmw", country: "Alemanha", logo_url: null },
  categories: { name: "Sports", slug: "sports", description: "Carros desportivos de alta performance" },
  car_highlights: [
    { type: "pro", text_content: "Motor S55 com resposta brutal e binário massivo", display_order: 1 },
    { type: "pro", text_content: "Chassis Competition incrivelmente preciso", display_order: 2 },
    { type: "pro", text_content: "Caixa DCT super rápida e agressiva", display_order: 3 },
    { type: "con", text_content: "Som do motor artificial via colunas", display_order: 1 },
    { type: "con", text_content: "Suspensão demasiado firme para uso diário", display_order: 2 },
    { type: "con", text_content: "Tração traseira pode ser traiçoeira à chuva", display_order: 3 },
  ],
  car_images: [
    { url: "/placeholder-hero.jpg", alt_text: "BMW M3 F80 Competition", is_hero: true, display_order: 0 },
  ],
};

const formatNumber = (num) => new Intl.NumberFormat('pt-PT').format(num);

export default function CarDetails() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pros = CAR_DATA.car_highlights.filter(h => h.type === "pro").sort((a, b) => a.display_order - b.display_order);
  const cons = CAR_DATA.car_highlights.filter(h => h.type === "con").sort((a, b) => a.display_order - b.display_order);

  const powerToWeight = (CAR_DATA.power_hp / CAR_DATA.weight_kg).toFixed(2);

  const renderProgressBar = (label, score, isOverall = false) => {
    const percentage = (score / 10) * 100;
    return (
      <div className={`mb-6 ${isOverall ? 'mt-8' : ''}`} key={label}>
        <div className="flex justify-between items-end mb-2">
          <span className={`font-['Barlow_Condensed'] uppercase tracking-wider ${isOverall ? 'text-xl text-white font-bold' : 'text-sm text-zinc-400'}`}>
            {label}
          </span>
          <span className={`font-['Orbitron'] ${isOverall ? 'text-3xl text-[#73242A] font-black' : 'text-lg text-white font-bold'}`}>
            {score.toFixed(1)}<span className="text-zinc-600 text-sm">/10</span>
          </span>
        </div>
        <div className={`w-full bg-black/50 rounded-full overflow-hidden border border-white/5 ${isOverall ? 'h-4' : 'h-2'}`}>
          <div 
            className="h-full bg-gradient-to-r from-[#260205] to-[#73242A] rounded-full transition-all duration-1000 ease-out"
            style={{ width: mounted ? `${percentage}%` : '0%' }}
          />
        </div>
      </div>
    );
  };

  const SpecRow = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-zinc-500 font-['Barlow_Condensed'] uppercase tracking-wider text-sm">{label}</span>
      <span className="text-white font-['Barlow_Condensed'] font-semibold text-right">{value}</span>
    </div>
  );

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
          <Link to={`/cars?category=${CAR_DATA.categories.slug}`} className="hover:text-white transition-colors">{CAR_DATA.categories.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{CAR_DATA.brands.name} {CAR_DATA.model} {CAR_DATA.generation_code}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-block border border-[#73242A] text-[#73242A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
              {CAR_DATA.categories.name}
            </div>
            
            <div>
              <p className="text-zinc-400 text-xl tracking-widest uppercase mb-2">{CAR_DATA.brands.name}</p>
              <h1 className="font-['Orbitron'] text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
                {CAR_DATA.model} <span className="text-[#73242A]">{CAR_DATA.variant}</span>
              </h1>
              <div className="flex items-center space-x-4">
                <span className="font-mono bg-white/10 px-3 py-1 rounded text-sm text-zinc-300 border border-white/10">
                  {CAR_DATA.generation_code}
                </span>
                <span className="text-zinc-500 font-bold tracking-widest">
                  {CAR_DATA.year_start}–{CAR_DATA.year_end || 'Presente'}
                </span>
              </div>
            </div>

            <p className="text-xl text-zinc-300 italic border-l-2 border-[#73242A] pl-4 py-1">
              "{CAR_DATA.tagline}"
            </p>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Zap className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{CAR_DATA.power_hp}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">CV</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Timer className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{CAR_DATA.accel_0_100}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">0-100 (s)</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Gauge className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{CAR_DATA.top_speed_kph}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">KM/H</span>
              </div>
              <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center liquid-glass-hover">
                <Weight className="w-6 h-6 text-[#73242A] mb-2" />
                <span className="font-['Orbitron'] text-2xl font-bold">{formatNumber(CAR_DATA.weight_kg)}</span>
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
                {CAR_DATA.generation_code} // {CAR_DATA.engine_name}
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
              {CAR_DATA.description.charAt(0)}
            </span>
            {CAR_DATA.description.substring(1)}
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
                <SpecRow label="Código do Motor" value={CAR_DATA.engine_name} />
                <SpecRow label="Tipo" value={CAR_DATA.engine_type} />
                <SpecRow label="Layout" value={CAR_DATA.engine_layout} />
                <SpecRow label="Cilindrada" value={`${formatNumber(CAR_DATA.displacement_cc)} cc`} />
                <SpecRow label="Cilindros × Válvulas" value={`${CAR_DATA.cylinders} cil. × ${CAR_DATA.valves_per_cyl} válv.`} />
                <SpecRow label="Indução Forçada" value={CAR_DATA.forced_induction} />
              </div>
              <div>
                <SpecRow label="Potência" value={`${CAR_DATA.power_hp} cv (${CAR_DATA.power_kw} kW) @ ${CAR_DATA.power_rpm} rpm`} />
                <SpecRow label="Binário" value={`${CAR_DATA.torque_nm} Nm @ ${CAR_DATA.torque_rpm} rpm`} />
                <SpecRow label="0-100 km/h" value={`${CAR_DATA.accel_0_100} s`} />
                <SpecRow label="0-200 km/h" value={`${CAR_DATA.accel_0_200} s`} />
                <SpecRow label="¼ Milha" value={`${CAR_DATA.accel_quarter_mile} s`} />
                <SpecRow label="Velocidade Máxima" value={`${CAR_DATA.top_speed_kph} km/h ${CAR_DATA.top_speed_limited ? '(limitado eletronicamente)' : ''}`} />
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
            <SpecRow label="Tipo" value={CAR_DATA.transmission_type} />
            <SpecRow label="Nome" value={CAR_DATA.transmission_name} />
            <SpecRow label="Velocidades" value={CAR_DATA.gears} />
            <SpecRow label="Tração" value={CAR_DATA.drive_type} />
            <SpecRow label="Diferencial" value={CAR_DATA.differential} />
          </div>

          {/* 3.3 Dimensões & Peso */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-1">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Ruler className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Dimensões & Peso</h3>
            </div>
            <SpecRow label="C × L × A" value={`${formatNumber(CAR_DATA.length_mm)} × ${formatNumber(CAR_DATA.width_mm)} × ${formatNumber(CAR_DATA.height_mm)} mm`} />
            <SpecRow label="Entre-eixos" value={`${formatNumber(CAR_DATA.wheelbase_mm)} mm`} />
            <SpecRow label="Peso" value={`${formatNumber(CAR_DATA.weight_kg)} kg`} />
            <SpecRow label="Depósito" value={`${CAR_DATA.fuel_tank_liters} L`} />
            <SpecRow label="Bagageira" value={`${CAR_DATA.trunk_liters} L`} />
          </div>

          {/* 3.4 Chassis & Pneus */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-2">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Shield className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Chassis & Pneus</h3>
            </div>
            <SpecRow label="Susp. Dianteira" value={CAR_DATA.front_suspension} />
            <SpecRow label="Susp. Traseira" value={CAR_DATA.rear_suspension} />
            <SpecRow label="Travões Diant." value={CAR_DATA.front_brakes} />
            <SpecRow label="Travões Tras." value={CAR_DATA.rear_brakes} />
            <SpecRow label="Pneus Diant." value={CAR_DATA.front_tires} />
            <SpecRow label="Pneus Tras." value={CAR_DATA.rear_tires} />
          </div>

          {/* 3.5 Consumo */}
          <div className="glass-panel rounded-2xl p-6 liquid-glass-hover animate-slide-up stagger-3">
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
              <Fuel className="text-[#73242A] w-6 h-6" />
              <h3 className="font-['Orbitron'] text-xl font-bold uppercase tracking-wider">Consumo</h3>
            </div>
            <SpecRow label="Combustível" value={CAR_DATA.fuel_type} />
            <SpecRow label="Combinado" value={`${CAR_DATA.consumption_combined} L/100km`} />
            <SpecRow label="Emissões CO₂" value={`${CAR_DATA.co2_emissions} g/km`} />
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
              {renderProgressBar("Performance", CAR_DATA.score_performance)}
              {renderProgressBar("Handling", CAR_DATA.score_handling)}
              {renderProgressBar("Conforto", CAR_DATA.score_comfort)}
              {renderProgressBar("Valor", CAR_DATA.score_value)}
              
              <div className="pt-4 border-t border-white/10">
                {renderProgressBar("Overall Score", CAR_DATA.score_overall, true)}
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
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(CAR_DATA.price_new_eur)} €</p>
          </div>
          <div className="glass-panel rounded-2xl p-8 text-center liquid-glass-hover border-[#73242A]/30">
            <h3 className="text-zinc-400 uppercase tracking-widest text-sm mb-4">Usado (Mínimo)</h3>
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(CAR_DATA.price_used_min_eur)} €</p>
          </div>
          <div className="glass-panel rounded-2xl p-8 text-center liquid-glass-hover">
            <h3 className="text-zinc-400 uppercase tracking-widest text-sm mb-4">Usado (Máximo)</h3>
            <p className="font-['Orbitron'] text-4xl font-black text-white">{formatNumber(CAR_DATA.price_used_max_eur)} €</p>
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
