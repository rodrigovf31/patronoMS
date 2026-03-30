/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Zap, 
  Scale, 
  Calculator, 
  BookOpen, 
  ArrowRight, 
  Gauge, 
  Shield, 
  Cpu,
  TrendingUp,
  Wallet
} from "lucide-react";

// --- MOCK DATA ---
const FEATURED_CARS = [
  {
    id: 1,
    name: "Apex Predator GT",
    brand: "Veloce",
    hp: 820,
    acceleration: "2.6s",
    price: "285.000€",
    color: "from-[#73242A] to-[#260205]"
  },
  {
    id: 2,
    name: "Lumina RS",
    brand: "Aether",
    hp: 650,
    acceleration: "3.1s",
    price: "195.000€",
    color: "from-zinc-800 to-black"
  },
  {
    id: 3,
    name: "Titan V12",
    brand: "Ironworks",
    hp: 950,
    acceleration: "2.4s",
    price: "420.000€",
    color: "from-[#260205] to-black"
  }
];

const CALCULATORS = [
  {
    id: "cost",
    title: "Custo de Posse",
    desc: "Cálculo detalhado de manutenção, seguros e combustível.",
    icon: Wallet,
    path: "/calculators/cost-of-ownership"
  },
  {
    id: "pwr",
    title: "Potência/Peso",
    desc: "Analise a eficiência mecânica real do seu veículo.",
    icon: Scale,
    path: "/calculators/power-to-weight"
  },
  {
    id: "accel",
    title: "Estimador 0-100",
    desc: "Simulação baseada em tração, torque e aerodinâmica.",
    icon: Gauge,
    path: "/calculators/0-100-estimator"
  }
];

const RECENT_GUIDES = [
  {
    id: 1,
    title: "Guia de Compra: Supercarros Usados",
    excerpt: "O que verificar antes de investir num ícone da década passada.",
    date: "28 Mar 2026"
  },
  {
    id: 2,
    title: "Aerodinâmica Ativa: O Futuro",
    excerpt: "Como as asas móveis estão a redefinir os limites da física.",
    date: "25 Mar 2026"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else setActiveDropdown(name);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Barlow_Condensed'] selection:bg-[#73242A] selection:text-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Barlow+Condensed:wght@300;400;600;700&display=swap');
          
          :root {
            --color-deep-bordeaux: #260205;
            --color-dark-red: #73242A;
            --color-black: #0D0D0D;
            --color-white: #FFFFFF;
          }

          .glass-panel {
            background: rgba(13, 13, 13, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.02);
          }

          .nav-link-glow:hover {
            text-shadow: 0 0 8px rgba(115, 36, 42, 0.8);
          }

          .tech-grid {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
          .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }

          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }

          .liquid-glass-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .liquid-glass-hover:hover {
            background: rgba(115, 36, 42, 0.1);
            border-color: rgba(115, 36, 42, 0.4);
            transform: translateY(-2px);
          }

          .logo-text {
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 2px;
            background: linear-gradient(to right, #FFFFFF, #73242A);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0D0D0D;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #73242A;
            border-radius: 10px;
          }
        `}
      </style>

      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 glass-panel shadow-2xl" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#73242A] rounded-sm flex items-center justify-center rotate-45 overflow-hidden">
              <Zap size={18} className="-rotate-45 text-white" />
            </div>
            <span className="logo-text text-xl font-black uppercase tracking-tighter">
              Performance<span className="text-white">Hub</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button 
                onMouseEnter={() => setActiveDropdown('cars')}
                className="flex items-center gap-1 text-sm font-semibold tracking-widest uppercase nav-link-glow transition-colors hover:text-[#73242A]"
              >
                Carros <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'cars' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Carros */}
              {activeDropdown === 'cars' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] glass-panel rounded-xl p-8 animate-slide-down border-t-2 border-t-[#73242A]"
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-4">Categorias</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {['Supercars', 'GT', 'Hot Hatch', 'Sports', 'Track Day', 'Classic'].map((cat) => (
                          <a key={cat} href="#" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group">
                            <div className="w-1 h-1 bg-[#73242A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            {cat}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="border-l border-zinc-800 pl-8">
                      <h4 className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-4">Destaque</h4>
                      <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                        <div className="w-full h-24 bg-gradient-to-br from-[#73242A] to-black rounded mb-3" />
                        <p className="text-xs font-bold uppercase">Novo Veloce RS</p>
                        <p className="text-[10px] text-zinc-500 mt-1">O auge da engenharia aerodinâmica.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-between items-center">
                    <a href="/cars" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#73242A] transition-colors">
                      Ver Todos os Carros <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/compare" className="text-sm font-semibold tracking-widest uppercase nav-link-glow hover:text-[#73242A] transition-colors">
              Comparador
            </a>

            <div className="relative group">
              <button 
                onMouseEnter={() => setActiveDropdown('calculators')}
                className="flex items-center gap-1 text-sm font-semibold tracking-widest uppercase nav-link-glow transition-colors hover:text-[#73242A]"
              >
                Calculadoras <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'calculators' ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Calculadoras */}
              {activeDropdown === 'calculators' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-4 w-72 glass-panel rounded-xl p-4 animate-slide-down border-t-2 border-t-[#73242A]"
                >
                  <div className="flex flex-col gap-2">
                    {CALCULATORS.map((calc) => (
                      <a 
                        key={calc.id} 
                        href={calc.path} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <calc.icon size={18} className="text-[#73242A] mt-0.5" />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wider group-hover:text-[#73242A] transition-colors">{calc.title}</p>
                          <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">{calc.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="/guides" className="text-sm font-semibold tracking-widest uppercase nav-link-glow hover:text-[#73242A] transition-colors">
              Guias
            </a>
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-transparent border border-[#73242A] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#73242A] transition-all duration-300 shadow-[0_0_15px_rgba(115,36,42,0.3)]">
              Explorar Performance
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 top-0 left-0 w-full h-screen glass-panel z-40 transition-transform duration-500 md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-12">
            <div className="flex flex-col gap-8">
              <a href="/" className="text-3xl font-bold uppercase tracking-tighter border-b border-white/10 pb-4">Home</a>
              <div className="flex flex-col gap-4">
                <p className="text-[#73242A] text-xs font-bold uppercase tracking-widest">Plataforma</p>
                <a href="/cars" className="text-2xl font-semibold uppercase">Carros</a>
                <a href="/compare" className="text-2xl font-semibold uppercase">Comparador</a>
                <a href="/calculators" className="text-2xl font-semibold uppercase">Calculadoras</a>
                <a href="/guides" className="text-2xl font-semibold uppercase">Guias</a>
              </div>
            </div>
            <div className="mt-auto">
              <button className="w-full py-4 bg-[#73242A] text-white font-bold uppercase tracking-widest rounded-sm">
                Comparar Carros
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#260205]/10 to-[#0D0D0D]" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#73242A]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#260205]/20 blur-[120px] rounded-full" />
        
        <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#73242A]" />
              <span className="text-[#73242A] text-xs font-bold uppercase tracking-[0.4em]">Precision Engineering</span>
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
              <button className="px-10 py-4 bg-[#73242A] text-white font-bold uppercase tracking-widest rounded-sm hover:bg-[#260205] transition-all duration-300 shadow-xl">
                Ver Listagem
              </button>
              <button className="px-10 py-4 glass-panel text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all duration-300">
                Calculadoras
              </button>
            </div>
          </div>

          {/* Hero Visual Element */}
          <div className="hidden md:flex justify-end animate-fade-in stagger-2">
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract Car Silhouette / Shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#73242A]/20 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-4 glass-panel rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-10" />
                <div className="relative z-10 text-center">
                  <Gauge size={120} className="text-[#73242A] mb-4 mx-auto opacity-80" />
                  <div className="font-['Orbitron'] text-4xl font-black">342 <span className="text-sm text-zinc-500">KM/H</span></div>
                  <div className="text-xs text-zinc-400 uppercase tracking-widest mt-2">Velocidade Máxima Registada</div>
                </div>
                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#73242A] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#73242A] to-transparent" />
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-lg animate-slide-up stagger-3">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Aceleração</p>
                <p className="text-xl font-bold">2.4s <span className="text-[10px] text-zinc-400">0-100</span></p>
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-lg animate-slide-up stagger-3">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Downforce</p>
                <p className="text-xl font-bold">850kg <span className="text-[10px] text-zinc-400">@ 250km/h</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED CARS --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase font-['Orbitron'] mb-4">Carros em Destaque</h2>
              <p className="text-zinc-500 max-w-md">As máquinas mais desejadas do momento, analisadas ao detalhe.</p>
            </div>
            <a href="/cars" className="text-[#73242A] font-bold uppercase tracking-widest flex items-center gap-2 group">
              Explorar Todos <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_CARS.map((car, idx) => (
              <div 
                key={car.id}
                className={`glass-panel rounded-2xl overflow-hidden liquid-glass-hover animate-slide-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`h-48 bg-gradient-to-br ${car.color} relative flex items-center justify-center group`}>
                  <div className="absolute inset-0 tech-grid opacity-10" />
                  <Gauge size={64} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {car.brand}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase mb-4">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Potência</p>
                      <p className="text-lg font-bold">{car.hp} <span className="text-[10px] text-zinc-400">CV</span></p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">0-100 km/h</p>
                      <p className="text-lg font-bold">{car.acceleration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-[#73242A]">{car.price}</span>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-[#73242A] transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALCULATORS HUB --- */}
      <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase font-['Orbitron'] mb-4">Calculadoras de Precisão</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Ferramentas técnicas desenvolvidas para entusiastas que procuram dados reais de performance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CALCULATORS.map((calc) => (
              <a 
                key={calc.id}
                href={calc.path}
                className="glass-panel p-8 rounded-2xl liquid-glass-hover flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-[#73242A]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#73242A]/20 group-hover:bg-[#73242A] transition-colors duration-500">
                  <calc.icon size={32} className="text-[#73242A] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">{calc.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{calc.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-[#73242A] font-bold uppercase text-xs tracking-widest">
                  Aceder Ferramenta <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- GUIDES SECTION --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black uppercase font-['Orbitron']">Guias & Insights</h2>
            <a href="/guides" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              Ver Todos os Guias <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {RECENT_GUIDES.map((guide) => (
              <div key={guide.id} className="glass-panel p-8 rounded-2xl liquid-glass-hover group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-3 py-1 bg-[#73242A]/20 border border-[#73242A]/30 rounded text-[10px] font-bold text-[#73242A] uppercase tracking-widest">
                    Editorial
                  </div>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{guide.date}</span>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-[#73242A] transition-colors">{guide.title}</h3>
                <p className="text-zinc-500 mb-8 leading-relaxed">{guide.excerpt}</p>
                <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                  Ler Artigo Completo <ArrowRight size={14} className="text-[#73242A]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0D0D0D] pt-24 pb-12 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#73242A] rounded-sm flex items-center justify-center rotate-45">
                  <Zap size={18} className="-rotate-45 text-white" />
                </div>
                <span className="logo-text text-2xl font-black uppercase tracking-tighter">
                  Performance<span className="text-white">Hub</span>
                </span>
              </div>
              <p className="text-zinc-500 max-w-sm leading-relaxed mb-8">
                A referência em Portugal para entusiastas de performance automóvel. 
                Dados precisos, ferramentas técnicas e guias especializados.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:bg-[#73242A] transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Plataforma</h4>
              <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                <li><a href="/cars" className="hover:text-[#73242A] transition-colors">Listagem de Carros</a></li>
                <li><a href="/compare" className="hover:text-[#73242A] transition-colors">Comparador</a></li>
                <li><a href="/calculators" className="hover:text-[#73242A] transition-colors">Calculadoras</a></li>
                <li><a href="/guides" className="hover:text-[#73242A] transition-colors">Guias de Compra</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Legal</h4>
              <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-[#73242A] transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-[#73242A] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#73242A] transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-[#73242A] transition-colors">Contactos</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              © 2026 PerformanceHub. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Designed for Speed</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#73242A] rounded-full animate-pulse" />
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Server Status: Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
