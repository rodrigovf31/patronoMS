import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  ArrowRight,
  Wallet,
  Scale,
  Gauge,
} from "lucide-react";

// ─── Dados de navegação ───────────────────────────────────────────────
// Centralizados aqui porque pertencem ao layout, não a uma página específica.
const NAV_CALCULATORS = [
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

export default function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Barlow_Condensed'] selection:bg-[#73242A] selection:text-white">
      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-3 glass-panel shadow-2xl" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo — usa <Link> em vez de <a> para navegação SPA */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#73242A] rounded-sm flex items-center justify-center rotate-45 overflow-hidden">
              <Zap size={18} className="-rotate-45 text-white" />
            </div>
            <span className="logo-text text-xl font-black uppercase tracking-tighter">
              Performance<span className="text-white">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Dropdown: Carros */}
            <div className="relative group">
              <button
                onMouseEnter={() => setActiveDropdown("cars")}
                className="flex items-center gap-1 text-sm font-semibold tracking-widest uppercase nav-link-glow transition-colors hover:text-[#73242A]"
              >
                Carros{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    activeDropdown === "cars" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "cars" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] glass-panel rounded-xl p-8 animate-slide-down border-t-2 border-t-[#73242A]"
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Categorias
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Supercars",
                          "GT",
                          "Hot Hatch",
                          "Sports",
                          "Track Day",
                          "Classic",
                        ].map((cat) => (
                          <Link
                            key={cat}
                            to={`/cars?category=${cat.toLowerCase().replace(" ", "-")}`}
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
                          >
                            <div className="w-1 h-1 bg-[#73242A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="border-l border-zinc-800 pl-8">
                      <h4 className="text-[#73242A] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Destaque
                      </h4>
                      <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                        <div className="w-full h-24 bg-gradient-to-br from-[#73242A] to-black rounded mb-3" />
                        <p className="text-xs font-bold uppercase">
                          Em breve
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          Novas fichas técnicas a caminho.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-between items-center">
                    <Link
                      to="/cars"
                      className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#73242A] transition-colors"
                    >
                      Ver Todos os Carros <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/compare"
              className="text-sm font-semibold tracking-widest uppercase nav-link-glow hover:text-[#73242A] transition-colors"
            >
              Comparador
            </Link>

            {/* Dropdown: Calculadoras */}
            <div className="relative group">
              <button
                onMouseEnter={() => setActiveDropdown("calculators")}
                className="flex items-center gap-1 text-sm font-semibold tracking-widest uppercase nav-link-glow transition-colors hover:text-[#73242A]"
              >
                Calculadoras{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    activeDropdown === "calculators" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "calculators" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-4 w-72 glass-panel rounded-xl p-4 animate-slide-down border-t-2 border-t-[#73242A]"
                >
                  <div className="flex flex-col gap-2">
                    {NAV_CALCULATORS.map((calc) => (
                      <Link
                        key={calc.id}
                        to={calc.path}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <calc.icon
                          size={18}
                          className="text-[#73242A] mt-0.5"
                        />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wider group-hover:text-[#73242A] transition-colors">
                            {calc.title}
                          </p>
                          <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">
                            {calc.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/guides"
              className="text-sm font-semibold tracking-widest uppercase nav-link-glow hover:text-[#73242A] transition-colors"
            >
              Guias
            </Link>
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              to="/cars"
              className="px-6 py-2 bg-transparent border border-[#73242A] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#73242A] transition-all duration-300 shadow-[0_0_15px_rgba(115,36,42,0.3)]"
            >
              Explorar Performance
            </Link>
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
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-bold uppercase tracking-tighter border-b border-white/10 pb-4"
              >
                Home
              </Link>
              <div className="flex flex-col gap-4">
                <p className="text-[#73242A] text-xs font-bold uppercase tracking-widest">
                  Plataforma
                </p>
                <Link
                  to="/cars"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold uppercase"
                >
                  Carros
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold uppercase"
                >
                  Comparador
                </Link>
                <Link
                  to="/calculators"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold uppercase"
                >
                  Calculadoras
                </Link>
                <Link
                  to="/guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold uppercase"
                >
                  Guias
                </Link>
              </div>
            </div>
            <div className="mt-auto">
              <Link
                to="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-4 bg-[#73242A] text-white font-bold uppercase tracking-widest rounded-sm text-center"
              >
                Comparar Carros
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── CONTEÚDO DA ROTA ATIVA ─────────────────────────────── */}
      {/* O <Outlet /> é o "slot" onde o React Router injeta o componente
          correspondente à rota atual. Quando a URL muda, apenas este bloco
          re-renderiza — a Navbar e o Footer permanecem montados. */}
      <Outlet />

      {/* ── FOOTER ─────────────────────────────────────────────── */}
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
                A referência em Portugal para entusiastas de performance
                automóvel. Dados precisos, ferramentas técnicas e guias
                especializados.
              </p>
              <div className="flex gap-4">
                {["Twitter", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:bg-[#73242A] transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
                Plataforma
              </h4>
              <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                <li>
                  <Link
                    to="/cars"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Listagem de Carros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compare"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Comparador
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calculators"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Calculadoras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Guias de Compra
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">
                Legal
              </h4>
              <ul className="flex flex-col gap-4 text-zinc-500 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#73242A] transition-colors"
                  >
                    Contactos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              © 2026 PerformanceHub. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                Designed for Speed
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#73242A] rounded-full animate-pulse" />
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                  Server Status: Optimal
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
