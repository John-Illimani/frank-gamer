import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Users,
  Shield,
  Swords,
  Trophy,
  Copy,
  Check,
  MessageCircle,
  ChevronRight,
  Star,
  Zap,
  Target,
  Flame,
  Crosshair,
  Radio,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaTwitch,
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";



/* ============================================================
   TEAM SCORPIO — Página de gamer para Franklin
   Temática: campo de batalla de Mobile Legends: Bang Bang
   Stack: React + Tailwind (paleta estándar) + CSS custom para
   animaciones (glow, escaneo, niebla, partículas, marquesina).
   ============================================================ */

/* -------------------- DATA -------------------- */


const HERO_MAINS = [
  {
    id: "aamon",
    name: "Aamon",
    role: "Asesino Fantasma",
    accent: "violet",
    tagline: "Golpea desde las sombras antes de que sepan que llegó.",
    imagen:"/amon.png",
    skills: [
      { icon: Zap, label: "Golpe de sombra", desc: "Tres embestidas veloces que rompen formaciones." },
      { icon: Target, label: "Marca fantasma", desc: "Detecta y persigue al objetivo más débil del mapa." },
      { icon: Flame, label: "Furia oscura (Definitiva)", desc: "Ejecuta combos aéreos imposibles de esquivar." },
    ],
  },
  {
    id: "lukas",
    name: "Lukas",
    role: "Luchador Cazador",
    accent: "amber",
    tagline: "El peso pesado de Team Scorpio: entra primero, sale último.",
     imagen:"/lukas.png",
    skills: [
      { icon: Shield, label: "Guardia de acero", desc: "Reduce el daño recibido y aturde al contraatacar." },
      { icon: Swords, label: "Embate del cazador", desc: "Arrastra enemigos hacia el centro de la pelea." },
      { icon: Flame, label: "Tormenta terrestre (Definitiva)", desc: "Golpe de área que decide peleas de equipo." },
    ],
  },
  {
    id: "miya",
    name: "Miya",
    role: "Tiradora",
    accent: "cyan",
    tagline: "Cuando la luna sale, la última flecha ya decidió la partida.",
     imagen:"/miya.png",
    skills: [
      { icon: Target, label: "Sigilo veloz", desc: "Gana velocidad de movimiento y ataque al activarse." },
      { icon: Star, label: "Luz oculta", desc: "Se vuelve invisible por un instante para reposicionarse." },
      { icon: Flame, label: "Lluvia de flechas (Definitiva)", desc: "Dispara ráfagas que arrasan líneas completas." },
    ],
  },
];

const ACCENTS = {
  violet: {
    text: "text-violet-400",
    border: "border-violet-500/40",
    borderStrong: "border-violet-400",
    bg: "bg-violet-500",
    bgSoft: "bg-violet-500/10",
    ring: "ring-violet-400/60",
    glow: "#a78bfa",
    from: "from-violet-500/20",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-500/40",
    borderStrong: "border-amber-400",
    bg: "bg-amber-500",
    bgSoft: "bg-amber-500/10",
    ring: "ring-amber-400/60",
    glow: "#fbbf24",
    from: "from-amber-500/20",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/40",
    borderStrong: "border-cyan-400",
    bg: "bg-cyan-500",
    bgSoft: "bg-cyan-500/10",
    ring: "ring-cyan-400/60",
    glow: "#22d3ee",
    from: "from-cyan-500/20",
  },
  red: {
    text: "text-red-400",
    border: "border-red-500/40",
    borderStrong: "border-red-400",
    bg: "bg-red-500",
    bgSoft: "bg-red-500/10",
    ring: "ring-red-400/60",
    glow: "#f87171",
    from: "from-red-500/20",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/40",
    borderStrong: "border-emerald-400",
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-500/10",
    ring: "ring-emerald-400/60",
    glow: "#34d399",
    from: "from-emerald-500/20",
  },
};

const TOURNAMENTS = {
  duo: [
    {
      name: "Copa Duelo de Sombras",
      mode: "Dúo (2 vs 2)",
      date: "Marzo 2026",
      prize: "$150",
      placement: "🥇 1er lugar",
      status: "completed",
    },
    {
      name: "Duo Rift Clash",
      mode: "Dúo (2 vs 2)",
      date: "Agosto 2026",
      prize: "$200",
      placement: "Clasificados a semifinal",
      status: "upcoming",
    },
  ],
  squad: [
    {
      name: "Liga Scorpio Regional",
      mode: "5 vs 5",
      date: "Junio 2026",
      prize: "$500",
      placement: "Semifinalistas",
      status: "completed",
    },
    {
      name: "MPL Community Clash",
      mode: "5 vs 5",
      date: "Septiembre 2026",
      prize: "$1000",
      placement: "Fase de grupos",
      status: "upcoming",
    },
  ],
  others: [
    {
      name: "Reto 1 vs 1 Solo Queue",
      mode: "1 vs 1",
      date: "Enero 2026",
      prize: "$50",
      placement: "🥈 2do lugar",
      status: "completed",
    },
    {
      name: "Torneo Relámpago Custom",
      mode: "Battle Royale personalizado",
      date: "Octubre 2026",
      prize: "Merch oficial",
      placement: "Por definir",
      status: "upcoming",
    },
  ],
};

const ROSTER = [
  { name: "Franklin", role: "Capitán / Oro", accent: "amber", lead: true, logo: "/foto.png" },
  { name: "Keyti", role: "Jungla", accent: "cyan", lead: false,logo: "/gusion.png" },
  { name: "Rouse", role: "Línea de EXP", accent: "violet", lead: false,logo: "/xborg.png" },
  { name: "Teorias Locas", role: "Mago", accent: "red", lead: false,logo: "/odete.png" },
  { name: "John", role: "Roamer", accent: "emerald", lead: false,logo: "/dirrot.png" },
];

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "heroes", label: "Héroes" },
  { id: "torneos", label: "Torneos" },
  { id: "equipo", label: "Equipo" },
  { id: "contacto", label: "Contacto" },
];

/* Fecha objetivo de la próxima misión/partida — cámbiala cuando quieras */
const NEXT_MATCH_DATE = new Date("2026-08-15T18:00:00");

/* -------------------- HELPERS -------------------- */

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(remaining, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  return { days, hours, minutes, seconds, over: remaining <= 0 };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* -------------------- SMALL UI PIECES -------------------- */

function HexFrame({ accent = "amber", size = "md", children, className = "" }) {
  const sizes = {
    sm: "w-14 h-14",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    xl: "w-56 h-56",
  };
  const a = ACCENTS[accent];
  return (
    <div
      className={`relative ${sizes[size]} ${className} flex items-center justify-center`}
      style={{
        clipPath:
          "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${a.from} to-zinc-900 border-2 ${a.borderStrong}`}
        style={{
          clipPath:
            "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const isDone = status === "completed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase border ${
        isDone
          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
          : "bg-amber-500/10 border-amber-500/40 text-amber-400 glow-pulse"
      }`}
      style={!isDone ? { "--glow-color": "#fbbf24" } : undefined}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isDone ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {isDone ? "Completado" : "Próximo"}
    </span>
  );
}

function SectionEyebrow({ children, accent = "amber" }) {
  const a = ACCENTS[accent];
  return (
    <div className={`flex items-center gap-3 mb-3 justify-center`}>
      <span className={`h-px w-8 ${a.bg}`} />
      <span
        className={`text-xs sm:text-sm font-bold tracking-[0.3em] uppercase ${a.text}`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {children}
      </span>
      <span className={`h-px w-8 ${a.bg}`} />
    </div>
  );
}

/* -------------------- MAIN COMPONENT -------------------- */

export default function TeamScorpioFranklin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("duo");
  const [openHero, setOpenHero] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  const countdown = useCountdown(NEXT_MATCH_DATE);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 1.3) % 10,
        duration: 10 + ((i * 7) % 8),
      })),
    []
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      audio
        .play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <GlobalStyle />

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("inicio")}
            className="flex items-center gap-2.5 group"
          >
            <HexFrame accent="amber" size="sm">
              <span
                className="text-amber-400 font-black text-lg"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <img src="/foto.png" alt="Logo" />
              </span>
            </HexFrame>
            <div className="text-left leading-tight">
              <p
                className="text-sm sm:text-base font-black tracking-wide text-zinc-50 group-hover:text-amber-400 transition-colors"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                TEAM SCORPIO
              </p>
              <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase">
                Franklin • Jungla
              </p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold tracking-wide text-zinc-400 hover:text-amber-400 transition-colors uppercase"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-zinc-300 hover:text-amber-400 transition-colors"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-2 py-3 text-sm font-semibold tracking-wide text-zinc-300 hover:text-amber-400 uppercase border-b border-zinc-900 last:border-none"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <BattlefieldBackground particles={particles} />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="fade-up" style={{ animationDelay: "0.05s" }}>
            <SectionEyebrow accent="amber">Team Scorpio • Jungla</SectionEyebrow>
          </div>

          <h1
            className="fade-up text-6xl sm:text-8xl font-black tracking-tight text-zinc-50 leading-none"
            style={{ fontFamily: "'Orbitron', sans-serif", animationDelay: "0.15s" }}
          >
            FRANKLIN
          </h1>

          <p
            className="fade-up mt-4 text-base sm:text-xl text-zinc-400 max-w-xl mx-auto"
            style={{ animationDelay: "0.28s" }}
          >
            El aguijón que decide la partida. Rango Mítico, mente fría,
            iniciativas que rompen líneas enemigas.
          </p>

          <div
            className="fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollTo("torneos")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-7 py-3 tracking-wide transition-colors"
              style={{
                clipPath:
                  "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
              }}
            >
              <Trophy size={18} /> Ver torneos
            </button>

            <button
              onClick={() => setFollowing((v) => !v)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-7 py-3 tracking-wide border-2 transition-colors ${
                following
                  ? "bg-zinc-100 text-zinc-950 border-zinc-100"
                  : "bg-transparent text-zinc-100 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
              style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
            >
              {following ? <Check size={18} /> : <Star size={18} />}
              {following ? "Siguiendo" : "Seguir"}
            </button>
          </div>

          {/* Stat chips */}
          <div
            className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.55s" }}
          >
            {[
              { label: "Rango", value: "Mítico", accent: "amber" },
              { label: "Win rate", value: "68%", accent: "cyan" },
              { label: "KDA", value: "7.2", accent: "violet" },
              { label: "Racha", value: "12V", accent: "red" },
            ].map((s) => (
              <div
                key={s.label}
                className={`px-4 py-2 border ${ACCENTS[s.accent].border} bg-zinc-900/70 backdrop-blur-sm`}
                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
              >
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                  {s.label}
                </p>
                <p
                  className={`text-lg font-bold ${ACCENTS[s.accent].text}`}
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Radar decorativo */}
        <div className="hidden lg:block absolute right-8 bottom-10 z-20 opacity-90">
          <MiniRadar />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <TickerBar />
        </div>
      </section>

      {/* ================= HÉROES ================= */}
      <section id="heroes" className="relative py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionEyebrow accent="cyan">Pool de héroes</SectionEyebrow>
          <h2
            className="text-3xl sm:text-5xl font-black text-center text-zinc-50"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Héroes de guerra
          </h2>
          <p className="text-center text-zinc-500 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Toca una carta para ver las habilidades que Franklin domina con
            cada campeón.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HERO_MAINS.map((hero) => {
              const a = ACCENTS[hero.accent];
              const isOpen = openHero === hero.id;
              return (
                <div
                  key={hero.id}
                  className={`relative border ${a.border} bg-zinc-900/60 p-6 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:border-opacity-80`}
                >
                  <HexFrame accent={hero.accent} size="lg" className="mb-4">
                    {/* Reemplaza este bloque por <img src="tu-foto.jpg" className="w-full h-full object-cover" /> */}
                    <span className="text-xs text-zinc-500 px-4 leading-tight">
                      <img src={hero.imagen}alt="foto del heroe" />
                    </span>
                  </HexFrame>

                  <h3
                    className={`text-2xl font-black ${a.text}`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {hero.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                    {hero.role}
                  </p>
                  <p className="text-sm text-zinc-400 mt-3">{hero.tagline}</p>

                  <button
                    onClick={() => setOpenHero(isOpen ? null : hero.id)}
                    className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 border ${a.border} ${a.text} hover:${a.bgSoft} transition-colors`}
                  >
                    {isOpen ? "Ocultar habilidades" : "Ver habilidades"}
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid w-full transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                    style={{ display: "grid" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-3 text-left">
                        {hero.skills.map((skill) => (
                          <div key={skill.label} className="flex items-start gap-3">
                            <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${a.bgSoft} ${a.text}`}>
                              <skill.icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-zinc-200">
                                {skill.label}
                              </p>
                              <p className="text-xs text-zinc-500">{skill.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TORNEOS ================= */}
      <section id="torneos" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none hex-pattern" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <SectionEyebrow accent="red">Historial de combate</SectionEyebrow>
          <h2
            className="text-3xl sm:text-5xl font-black text-center text-zinc-50"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Torneos
          </h2>

          {/* Próxima misión */}
          <div className="mt-10 max-w-2xl mx-auto border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-zinc-900 px-6 py-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-bold flex items-center justify-center gap-2">
              <Radio size={14} className="animate-pulse" /> Próxima misión
            </p>
            {countdown.over ? (
              <p className="mt-3 text-zinc-300 font-bold">
                ¡La partida está en curso ahora mismo!
              </p>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
                {[
                  { v: countdown.days, l: "Días" },
                  { v: countdown.hours, l: "Hrs" },
                  { v: countdown.minutes, l: "Min" },
                  { v: countdown.seconds, l: "Seg" },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="bg-zinc-950 border border-amber-500/30 px-3 sm:px-4 py-2 min-w-[64px]"
                  >
                    <p
                      className="text-2xl sm:text-3xl font-black text-amber-400"
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    >
                      {pad(t.v)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {t.l}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {[
              { key: "duo", label: "Dúo", icon: Users },
              { key: "squad", label: "5 vs 5", icon: Shield },
              { key: "others", label: "Otros", icon: Trophy },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider border transition-colors ${
                    isActive
                      ? "bg-red-500 border-red-500 text-zinc-950"
                      : "border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:text-red-400"
                  }`}
                  style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TOURNAMENTS[activeTab].map((t) => (
              <div
                key={t.name}
                className="border border-zinc-800 bg-zinc-900/60 p-6 hover:border-red-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      {t.mode}
                    </p>
                    <h3 className="text-lg font-black text-zinc-100 mt-1">
                      {t.name}
                    </h3>
                  </div>
                  <StatusPill status={t.status} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Fecha</p>
                    <p className="text-sm font-bold text-zinc-200 mt-0.5">{t.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Premio</p>
                    <p className="text-sm font-bold text-amber-400 mt-0.5">{t.prize}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Resultado</p>
                    <p className="text-sm font-bold text-zinc-200 mt-0.5">{t.placement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EQUIPO ================= */}
      <section id="equipo" className="relative py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionEyebrow accent="violet">La colmena</SectionEyebrow>
          <h2
            className="text-3xl sm:text-5xl font-black text-center text-zinc-50"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Escuadrón Scorpio
          </h2>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-5">
            {ROSTER.map((m) => {
              const a = ACCENTS[m.accent];
              return (
                <div
                  key={m.name + m.role}
                  className={`flex flex-col items-center text-center ${
                    m.lead ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <HexFrame accent={m.accent} size={m.lead ? "xl" : "md"} className="mb-3">
                    {/* Reemplaza por <img src="foto.jpg" className="w-full h-full object-cover" /> */}
                  <img src={m.logo} alt="" />
                  </HexFrame>
                  <p className={`font-black ${m.lead ? "text-xl" : "text-sm"} text-zinc-100`}>
                    {m.name}
                  </p>
                  <p className={`text-[11px] uppercase tracking-widest ${a.text}`}>
                    {m.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section id="contacto" className="relative py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionEyebrow accent="amber">Únete al enjambre</SectionEyebrow>
          <h2
            className="text-3xl sm:text-5xl font-black text-zinc-50"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Contacto
          </h2>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            Sigue a Franklin y a Team Scorpio, o copia el enlace de contacto
            para invitarlo a tu próximo torneo.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: "ig", label: "Instagram", icon: FaInstagram, value: "instagram.com/teamscorpio" },
              { key: "yt", label: "YouTube", icon: FaYoutube, value: "youtube.com/@teamscorpio" },
              { key: "tw", label: "Tiktok", icon: SiTiktok, value: "https://www.tiktok.com/@juanfranklin444" },
              { key: "dc", label: "Discord", icon: MessageCircle, value: "discord.gg/teamscorpio" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => copyToClipboard(s.value, s.key)}
                className="flex flex-col items-center gap-2 border border-zinc-800 hover:border-amber-500/40 bg-zinc-900/60 px-3 py-5 transition-colors"
              >
                <s.icon size={20} className="text-zinc-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {s.label}
                </span>
                <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                 
                <button
  onClick={() => window.open(s.value, "_blank")}
  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  Ver
</button>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-zinc-900 pt-8 text-center">
          <p className="text-xs text-zinc-600 tracking-widest uppercase">
            Team Scorpio © 2026 — Franklin, Jungla Mítica
          </p>
        </div>
      </section>

      {/* ================= REPRODUCTOR DE MÚSICA ================= */}
      {/*
        Coloca aquí la URL real de tu pista de fondo, por ejemplo:
        <audio ref={audioRef} loop src="https://tu-servidor.com/tema-scorpio.mp3" />
        Mientras no exista una fuente real, los controles funcionan
        pero no habrá audio audible.
      */}
      <audio ref={audioRef} loop src="" />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 px-4 py-3 shadow-lg shadow-black/50">
        <button
          onClick={toggleAudio}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors shrink-0"
          aria-label={audioPlaying ? "Pausar música" : "Reproducir música"}
        >
          {audioPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <div className="hidden sm:block">
          <audio ref={audioRef} src="/music.mp3" />

    <div
      onClick={() => audioRef.current.play()}
      className="hidden sm:block cursor-pointer"
    >
      <p className="text-[11px] font-bold text-zinc-200 leading-none">
        Tema de batalla
      </p>
      <p className="text-[10px] text-zinc-500 leading-none mt-1">
        Team Scorpio · Haz clic para reproducir
      </p>
    </div>
        </div>

        <button
          onClick={() => setMuted((v) => !v)}
          className="text-zinc-400 hover:text-amber-400 transition-colors"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            if (muted) setMuted(false);
          }}
          className="w-16 accent-amber-500"
          aria-label="Volumen"
        />
      </div>
    </div>
  );
}

/* -------------------- DECORATIVE PIECES -------------------- */

function BattlefieldBackground({ particles }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* base gradient: jungla / campo de batalla nocturno */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-emerald-950/60 to-zinc-950" />

      {/* grid HUD */}
      <div className="absolute inset-0 opacity-[0.07] hud-grid" />

      {/* niebla */}
      <div className="absolute -left-1/4 bottom-0 w-[150%] h-64 bg-emerald-900/30 blur-3xl fog-drift" />
      <div className="absolute -right-1/4 bottom-10 w-[150%] h-56 bg-zinc-800/40 blur-3xl fog-drift" style={{ animationDelay: "3s" }} />

      {/* siluetas de jungla */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 sm:h-56 text-zinc-900"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,200 L0,120 L60,90 L100,130 L160,60 L210,120 L260,80 L320,140 L380,70 L440,130 L500,90 L560,150 L620,60 L680,130 L740,90 L800,150 L860,70 L920,130 L980,90 L1040,140 L1100,80 L1160,120 L1200,100 L1200,200 Z" />
      </svg>

      {/* escaneo tipo HUD */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent scan-sweep" />
      </div>

      {/* partículas flotantes */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 w-1 h-1 rounded-full bg-amber-400/70 float-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}

function MiniRadar() {
  return (
    <div className="relative w-40 h-40 rounded-full border border-emerald-500/30 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center">
      <div className="absolute inset-3 rounded-full border border-emerald-500/20" />
      <div className="absolute inset-8 rounded-full border border-emerald-500/20" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(52,211,153,0.35), transparent 40%)",
          animation: "radar-spin 4s linear infinite",
        }}
      />
      <span className="absolute w-2 h-2 rounded-full bg-amber-400 glow-pulse" style={{ "--glow-color": "#fbbf24" }} />
      <Crosshair size={16} className="text-emerald-400/60 absolute" />
    </div>
  );
}

function TickerBar() {
  const items = [
    "🏆 CAMPEONES — COPA DUELO DE SOMBRAS",
    "🐍 TEAM SCORPIO",
    "⚔ RANGO MÍTICO",
    "🎯 KDA 7.2",
    "🔥 RACHA DE 12 VICTORIAS",
    "🎮 FRANKLIN — JUNGLA",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="bg-black/70 border-t border-amber-500/20 overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="mx-6 text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- GLOBAL STYLE (fuentes + animaciones custom) -------------------- */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

      @keyframes fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fade-up 0.9s ease forwards; opacity: 0; }

      @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 6px var(--glow-color, #fbbf24), 0 0 2px var(--glow-color, #fbbf24) inset; }
        50% { box-shadow: 0 0 18px var(--glow-color, #fbbf24), 0 0 5px var(--glow-color, #fbbf24) inset; }
      }
      .glow-pulse { animation: glow-pulse 2.2s ease-in-out infinite; }

      @keyframes fog-drift {
        0% { transform: translateX(-8%); }
        50% { transform: translateX(8%); }
        100% { transform: translateX(-8%); }
      }
      .fog-drift { animation: fog-drift 14s ease-in-out infinite; }

      @keyframes scan-sweep {
        0% { transform: translateY(-120%); }
        100% { transform: translateY(220%); }
      }
      .scan-sweep { animation: scan-sweep 6s linear infinite; }

      @keyframes float-particle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.9; }
        90% { opacity: 0.9; }
        100% { transform: translateY(-90vh) translateX(16px); opacity: 0; }
      }
      .float-particle { animation-name: float-particle; animation-timing-function: linear; animation-iteration-count: infinite; }

      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee { animation: marquee 24s linear infinite; }

      @keyframes radar-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .hud-grid {
        background-image:
          linear-gradient(to right, rgba(148,163,184,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148,163,184,0.5) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .hex-pattern {
        background-image: radial-gradient(circle at 2px 2px, rgba(248,113,113,0.6) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}