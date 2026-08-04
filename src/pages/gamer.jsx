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
  Plus,
  Minus,
  Send,
  UserPlus,
  Camera,
  Home,
  Gamepad2,
  Medal,
  Users as UsersIcon,
  ClipboardList,
  Phone,
  Calendar,
  MapPin,
  Crown,
  Award,
  Sparkles,
  Rocket,
  Dice1,
  Clock,
  Coins,
  Gem,
  Milestone,
  Orbit,
  Music,
  Video,
  Globe,
  Heart,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Trophy as TrophyIcon,
  Swords as SwordsIcon,
  Crown as CrownIcon,
  Skull,
  Flame as FlameIcon,
  Eye,
  Cloud,
  Wind,
  Moon,
  Sun,
  Castle,
  Orbit as OrbitIcon,
  Sword,
  Target as TargetIcon,
  ChevronDown,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaTwitch,
  FaFacebook,
  FaTwitter,
  FaDiscord,
  FaTiktok,
} from "react-icons/fa";

import { SiKick, SiRumble } from "react-icons/si";

// ============================================================
// DATA
// ============================================================

const HERO_MAINS = [
  {
    id: "aamon",
    name: "Aamon",
    role: "Asesino Fantasma",
    accent: "violet",
    tagline: "Golpea desde las sombras antes de que sepan que llegó.",
    imagen: "/amon.png",
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
    imagen: "/lukas.png",
    skills: [
      { icon: Shield, label: "Guardia de acero", desc: "Reduce el daño recibido y aturde al contraatacar." },
      { icon: Sword, label: "Embate del cazador", desc: "Arrastra enemigos hacia el centro de la pelea." },
      { icon: Flame, label: "Tormenta terrestre (Definitiva)", desc: "Golpe de área que decide peleas de equipo." },
    ],
  },
  {
    id: "miya",
    name: "Miya",
    role: "Tiradora",
    accent: "cyan",
    tagline: "Cuando la luna sale, la última flecha ya decidió la partida.",
    imagen: "/miya.png",
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
    gradient: "from-violet-600 to-purple-700",
    bgLight: "bg-violet-500/5",
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
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-500/5",
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
    gradient: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-500/5",
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
    gradient: "from-red-500 to-rose-700",
    bgLight: "bg-red-500/5",
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
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-500/5",
  },
};

const ROSTER = [
  { name: "Franklin", role: "Capitán / Oro", accent: "amber", lead: true, logo: "/foto.png" },
  { name: "Keyti", role: "Jungla", accent: "cyan", lead: false, logo: "/gusion.png" },
  { name: "Rouse", role: "Línea de EXP", accent: "violet", lead: false, logo: "/xborg.png" },
  { name: "Teorias Locas", role: "Mago", accent: "red", lead: false, logo: "/odete.png" },
  { name: "John", role: "Roamer", accent: "emerald", lead: false, logo: "/dirrot.png" },
];


const PAREJAS_CONFIRMADAS = [
  {
    id: "pareja-1",
    el: "Chimuelo",
    ella: "Luminosa",
    heroEl: "Jungla",
    heroElla: "Mago",
    desde: "Desde los inicios del canal",
    frase: "Ella lo cura, él la protege. Combo perfecto dentro y fuera del mapa.",
    accent: "red",
    fotoEl: "/chimuelo.jpg",
    fotoElla: "/chimuela.jpg",
  },
  {
    id: "pareja-2",
    el: "Angel",
    ella: "Diana",
    heroEl: "Tanque",
    heroElla: "Mago",
    desde: "Desde el 2 de agosto 2026",
    frase: "Pone el corazón por delante para resguardar el de ella.",
    accent: "violet",
    fotoEl: "/angel.jpg",
    fotoElla: "/diana.jpg",
  },
  // 👉 agrega más parejas copiando este bloque
];

const NAV_LINKS = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "torneos", label: "Torneos", icon: Trophy },
  { id: "equipo", label: "Equipo", icon: UsersIcon },
  { id: "parejas", label: "Parejas", icon: Heart },
{ id: "ganadores", label: "Ganadores", icon: Medal },
];

const TOURNAMENT = {
  name: "Aniversario Franklin Gamer",
  mode: "5 vs 5",
  date: "Agosto 2026",
  prize: "5 pases semanales",
  placement: "¡Inscríbete ahora!",
  status: "upcoming",
  description: "Torneo especial por el aniversario del canal. ¡Premios increíbles y mucha acción!",
  image: "/tournament.jpg",
  sponsors: ["Scorpio Gaming", "GamerZone", "Razer", "HyperX"],
};

const NEXT_MATCH_DATE = new Date("2026-08-28T18:00:00");

// ============================================================
// TOURNAMENT BRACKET DATA  holaaaaa 22ssswerwrwer  sdfsdfds
// ============================================================

const BRACKET_DATA = [
  {
    id: "grupo-a",
    name: "Grupo A",
    day: "Sábado",
    accent: "amber",
    winners: ["Eternal Kins", "Pro Sport", "Chain Breakers","Hero Silenth"], // 👈 pon aquí los nombres de los que ganaron, ej: ["Team Scorpio", "Dream Team"]
    matches: [
      { time: "7:30 PM", team1: "Eternal Kins", team2: "Dark Dinasty", logo1: "", logo2: "" },
      { time: "8:00 PM", team1: "Team Scorpio", team2: "Pro Sport", logo1: "/foto.png", logo2: "" },
      { time: "8:30 PM", team1: "Chain Breakers", team2: "Nelore", logo1: "", logo2: "" },
      { time: "9:00 PM", team1: "Dream Team", team2: "Hero Silenth", logo1: "", logo2: "" },
    ],
  },
  {
    id: "grupo-b",
    name: "Grupo B",
    day: "Sábado",
    accent: "cyan",
    winners: ["Proget QT","Teem Crumbs","Trikitakatelas","Level One"], // 👈 pon aquí los ganadores de este grupo
    matches: [
      { time: "9:30 PM", team1: "Nika Sport", team2: "Proget QT", logo1: "", logo2: "" },
      { time: "10:00 PM", team1: "Roshidere", team2: "Teem Crumbs", logo1: "", logo2: "" },
      { time: "10:30 PM", team1: "Trikitakatelas", team2: "Pendejo Sport", logo1: "", logo2: "" },
      { time: "11:00 PM", team1: "Level One", team2: "Imperium", logo1: "", logo2: "" },
    ],
  },
  {
    id: "grupo-c",
    name: "Grupo C",
    day: "Domingo",
    accent: "violet",
    winners: ["Land Stand","Spearhead","X Force","Shador King","Nich Gaming"], // 👈 pon aquí los ganadores de este grupo
    matches: [

      { time: "7:00 PM", team1: "Land Stand", team2: "Nelore ", logo1: "", logo2: "" },
      { time: "7:30 PM", team1: "Ego Vitaly", team2: "Spearhead", logo1: "", logo2: "" },
      { time: "8:00 PM", team1: "X Force", team2: "Abusa Frank", logo1: "", logo2: "" },
      { time: "8:30 PM", team1: "Shador King", team2: "Celestial King", logo1: "", logo2: "" },
      { time: "9:00 PM", team1: "Tormentados EFM", team2: "Nich Gaming", logo1: "", logo2: "" },
    ],
  },
  {
    id: "grupo-d",
    name: "Grupo D",
    day: "Domingo",
    accent: "red",
    winners: ["VC2","SLG","Tuns 1.0","Los Tuns 2.0"], // 👈 pon aquí los ganadores de este grupo
    matches: [
      { time: "9:30 PM", team1: "Team Zodiacal", team2: "VC2", logo1: "", logo2: "" },
      { time: "10:00 PM", team1: "Toros Negros", team2: "SLG", logo1: "", logo2: "" },
      { time: "10:30 PM", team1: "Los Cochinotes", team2: "Tuns 1.0", logo1: "", logo2: "" },
      { time: "11:00 PM", team1: "Los Tuns 2.0", team2: "Legión Kalosky", logo1: "", logo2: "" },
    ],
  },
];

const PLAYOFFS_DATA = {
  cuartos: {
    label: "Cuartos de Final",
    accent: "amber",
    definido: true,
    groups: [
      {
        id: "cuartos-a",
        name: "Grupo A",
        day: "Lunes",
        winners: ["Eternal Kins","Pro Sport","Hero Silenth","VC2"], 
        matches: [
          { id: "qf1", time: "7:30 PM", team1: "Spearhead", team2: "Eternal Kins", logo1: "", logo2: "" },
          { id: "qf2", time: "8:00 PM", team1: "Pro Sport", team2: "X Force", logo1: "", logo2: "" },
          { id: "qf3", time: "8:30 PM", team1: "Shador King", team2: "Hero Silenth", logo1: "", logo2: "" },
          { id: "qf4", time: "9:00 PM", team1: "Teem Crumbs", team2: "VC2", logo1: "", logo2: "" },
        ],
      },
      {
        id: "cuartos-b",
        name: "Grupo B",
        day: "Lunes",
        winners: ["SLG","Level One","Land Stand","Nich Gaming"], 
        matches: [
         
          { id: "qf5", time: "9:30 PM", team1: "SLG", team2: "Proget QT", logo1: "", logo2: "" },
          { id: "qf6", time: "10:00 PM", team1: "Level One", team2: "Tuns 1.0", logo1: "", logo2: "" },
          { id: "qf7", time: "10:30 PM", team1: "Land Stand", team2: "Los Tuns 2.0", logo1: "", logo2: "" },
          { id: "qf8", time: "11:00 PM", team1: "Nich Gaming", team2: "Trikitakatelas", logo1: "", logo2: "" },
          { id: "qf8", time: "Martes 7:30 PM", team1: "Chain Break", team2: "Los Tuns 2.0", logo1: "", logo2: "" },
        ],
      },
    ],
  },
  semifinal: {
    label: "Semifinal",
    accent: "cyan",
    definido: true,
    winners: [],
    matches: [
      { id: "sf1",time: "8:00 PM", team1: "VC2", team2: "Hero Silenth", logo1: "", logo2: "" },
      { id: "sf2", time: "8:30 PM", team1: "Pro Sport", team2: "LEVEL ONE", logo1: "", logo2: "" },
      { id: "sf2", time: "9:00 PM", team1: "Nich Gaming", team2: "Eternal Kins", logo1: "", logo2: "" },
      { id: "sf2", time: "9:30 PM", team1: "Land Stand", team2: "SLG", logo1: "", logo2: "" },
    ],
  },
  final: {
    label: "Gran Final",
    accent: "red",
    definido: false,
    winners: [],
    matches: [
      { id: "f1", team1: null, team2: null, logo1: "", logo2: "" },
    ],
  },
};
const TORNEOS_PASADOS = [
  {
    etapa: 1,
    nombre: "Primera Temporada",
    fecha: "Enero 2026",
    campeon: "Team Spirit",
    mvp: "Jungla",
    accent: "amber",
    logo: "/1.jpg",
    copa: "/copa1.jpg",
    finalizado: true,
  },
  {
    etapa: 2,
    nombre: "Segunda Temporada",
    fecha: "Abril 2026",
    campeon: "Rubiosos",
    mvp: "Roamer",
    accent: "cyan",
    logo: "/2.jpg",
    copa: "/copa2.jpg",
    finalizado: true,
  },
  {
    etapa: 3,
    nombre: "Tercera Temporada",
    fecha: "Junio 2026",
    campeon: "Night Gaming",
    mvp: "Adc",
    accent: "violet",
    logo: "/3.jpg",
    copa: "/copa3.jpg",
    finalizado: true,
  },
  {
    etapa: "Aniversario",
    nombre: "Torneo Aniversario",
    fecha: "Agosto 2026",
    campeon: null,
    mvp: null,
    accent: "red",
    logo: "",
    copa: "/copa_aniversario.jpg",
    finalizado: false,
  },
  {
    etapa: 4,
    nombre: "Cuarta Temporada",
    fecha: "Próximamente",
    campeon: null,
    mvp: null,
    accent: "emerald",
    logo: "",
    copa: "/copa4.jpg",
    finalizado: false,
  },
];

// ============================================================
// HELPERS
// ============================================================

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

// ============================================================
// SMALL UI PIECES
// ============================================================

function HexFrame({ accent = "amber", size = "md", children, className = "", animated = false }) {
  const sizes = {
    sm: "w-14 h-14",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    xl: "w-56 h-56",
  };
  const a = ACCENTS[accent];
  return (
    <div
      className={`relative ${sizes[size]} ${className} flex items-center justify-center ${animated ? "animate-float" : ""}`}
      style={{
        clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${a.from} to-zinc-800 border-2 ${a.borderStrong}`}
        style={{
          clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
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
          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
          : "bg-amber-500/20 border-amber-500/40 text-amber-400 glow-pulse"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isDone ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {isDone ? "upcoming" : "upcoming"}
    </span>
  );
}

function SectionEyebrow({ children, accent = "amber", icon: Icon = Trophy }) {
  const a = ACCENTS[accent];
  return (
    <div className={`flex items-center gap-3 mb-3 justify-center`}>
      <span className={`h-px w-8 ${a.bg}`} />
      <Icon className={`w-4 h-4 ${a.text}`} />
      <span
        className={`text-xs sm:text-sm font-bold tracking-[0.3em] uppercase ${a.text}`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {children}
      </span>
      <Icon className={`w-4 h-4 ${a.text}`} />
      <span className={`h-px w-8 ${a.bg}`} />
    </div>
  );
}

function GlowButton({ children, accent = "amber", onClick, className = "", disabled = false, type = "button" }) {
  const a = ACCENTS[accent];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 group hover:scale-105 active:scale-95 ${className}`}
      style={{
        clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
      }}
    >
      <span className={`absolute inset-0 bg-gradient-to-r ${a.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        boxShadow: `0 0 30px ${a.glow}, 0 0 60px ${a.glow}33`,
      }} />
      <span className="relative z-10 flex items-center gap-2 text-zinc-950">
        {children}
      </span>
    </button>
  );
}

function SectionTitle({ children, subtitle = "", accent = "amber" }) {
  const a = ACCENTS[accent];
  return (
    <div className="text-center">
      <h2
        className={`text-4xl sm:text-6xl font-black bg-gradient-to-r ${a.gradient} bg-clip-text text-transparent`}
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {children}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============================================================
// REGISTRATION FORM COMPONENT (Modal)
// ============================================================

function RegistrationModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    accion: "crear",
    cel_lider: "",
    nombre_team: "",
    logo_base64: "",
    integrantes: [{ id_jugador: "", nombre: "" }]
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCount, setSelectedCount] = useState(1);
  const fileInputRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const API_URL = "https://script.google.com/macros/s/AKfycbw225jZc-RpDV9hCjDSf1s1ujx4At5mHl3J5erq_gNnw3RJagYPs7w3xtk245pigeGwdw/exec";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const newIntegrantes = [...formData.integrantes];
    newIntegrantes[index][field] = value;
    setFormData(prev => ({ ...prev, integrantes: newIntegrantes }));
  };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      integrantes: [...prev.integrantes, { id_jugador: "", nombre: "" }]
    }));
  };

  const removeMember = (index) => {
    if (formData.integrantes.length <= 1) return;
    const newIntegrantes = formData.integrantes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, integrantes: newIntegrantes }));
  };

  const handleSetMemberCount = (count) => {
    setSelectedCount(count);
    const currentCount = formData.integrantes.length;
    if (count > currentCount) {
      const newMembers = Array(count - currentCount).fill({ id_jugador: "", nombre: "" });
      setFormData(prev => ({
        ...prev,
        integrantes: [...prev.integrantes, ...newMembers]
      }));
    } else if (count < currentCount) {
      setFormData(prev => ({
        ...prev,
        integrantes: prev.integrantes.slice(0, count)
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData(prev => ({ ...prev, logo_base64: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setSuccess(true);
      setFormData({
        accion: "crear",
        cel_lider: "",
        nombre_team: "",
        logo_base64: "",
        integrantes: [{ id_jugador: "", nombre: "" }]
      });
      setSelectedCount(1);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      setTimeout(() => {
        handleClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      setError("Error al enviar el formulario. Intenta de nuevo.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all duration-700 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-zinc-900/95 p-6 sm:p-8 overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="absolute inset-0 opacity-5 hex-pattern" />
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-30 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-zinc-200 transition-all hover:rotate-90 duration-300 p-2 hover:bg-zinc-800/50 rounded-full"
          >
            <X size={24} />
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Trophy size={24} className="text-zinc-950" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-100" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  ¡Inscríbete al Torneo!
                </h3>
                <p className="text-emerald-400 text-sm">Aniversario Franklin Gamer</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-2">Completa los datos para registrar tu equipo en el torneo</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input type="hidden" name="accion" value="crear" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    <Phone className="inline w-4 h-4 mr-1" /> Celular del Líder *
                  </label>
                  <input
                    type="text"
                    name="cel_lider"
                    value={formData.cel_lider}
                    onChange={handleInputChange}
                    placeholder="Ej: 77777777"
                    required
                    className="w-full bg-zinc-900/80 border border-zinc-700 focus:border-emerald-500 outline-none transition-colors px-4 py-3 text-zinc-100 rounded-lg"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    <Users className="inline w-4 h-4 mr-1" /> Nombre del Team *
                  </label>
                  <input
                    type="text"
                    name="nombre_team"
                    value={formData.nombre_team}
                    onChange={handleInputChange}
                    placeholder="Ej: Shohoku"
                    required
                    className="w-full bg-zinc-900/80 border border-zinc-700 focus:border-emerald-500 outline-none transition-colors px-4 py-3 text-zinc-100 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  <Camera className="inline w-4 h-4 mr-1" /> Logo del Equipo
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors rounded-lg flex items-center gap-2"
                  >
                    <Camera size={18} />
                    Subir logo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {formData.logo_base64 && (
                    <span className="text-emerald-400 text-sm flex items-center gap-1 animate-fade-in">
                      <Check size={16} /> Logo cargado
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  <Users className="inline w-4 h-4 mr-1" /> Cantidad de Integrantes
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSetMemberCount(num)}
                      className={`px-4 py-2 border transition-all duration-300 rounded-lg ${
                        selectedCount === num
                          ? "bg-emerald-500 border-emerald-500 text-zinc-950 scale-105 shadow-lg shadow-emerald-500/20"
                          : "bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-zinc-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  <Users className="inline w-4 h-4 mr-1" /> Integrantes *
                </label>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500/20">
                  {formData.integrantes.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={member.id_jugador}
                          onChange={(e) => handleMemberChange(index, "id_jugador", e.target.value)}
                          placeholder="ID Jugador"
                          required
                          className="bg-zinc-900/80 border border-zinc-700 focus:border-emerald-500 outline-none transition-colors px-3 py-2 text-zinc-100 text-sm rounded-lg"
                        />
                        <input
                          type="text"
                          value={member.nombre}
                          onChange={(e) => handleMemberChange(index, "nombre", e.target.value)}
                          placeholder="Nombre"
                          required
                          className="bg-zinc-900/80 border border-zinc-700 focus:border-emerald-500 outline-none transition-colors px-3 py-2 text-zinc-100 text-sm rounded-lg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-lg"
                        disabled={formData.integrantes.length <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      {index === formData.integrantes.length - 1 && (
                        <button
                          type="button"
                          onClick={addMember}
                          className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors rounded-lg"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <GlowButton
                type="submit"
                accent="emerald"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    <Send size={20} />
                    Registrar Equipo
                  </>
                )}
              </GlowButton>

              {success && (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-center animate-fade-in rounded-lg">
                  <Check className="inline w-5 h-5 mr-2" />
                  ¡Equipo registrado exitosamente!
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/40 text-red-400 text-center animate-fade-in rounded-lg">
                  <X className="inline w-5 h-5 mr-2" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REDES SOCIALES MODAL
// ============================================================

function SocialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/juan.franklin.3139?igsh=N3l3NWZtYXd0YXYw", color: "text-pink-500" },
    { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@juanfranklin303?si=8NcwZwvp2zclG9t4", color: "text-red-500" },
    { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/@juanfranklin444", color: "text-white" },
    { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/share/19H4c5V5wR/", color: "text-blue-500" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={onClose}>
      <div 
        className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 max-w-md w-full p-6 animate-scale-in shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 opacity-5 hex-pattern" />
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-2xl opacity-20" />
        
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black text-zinc-100 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <Star className="text-amber-400 animate-spin-slow" size={20} />
              Redes de Franklin
            </h3>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 transition-colors p-1 hover:bg-zinc-800 rounded">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 group hover:bg-zinc-800/50 hover:translate-x-1 rounded-lg"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <social.icon size={24} className={`${social.color} group-hover:scale-110 transition-transform`} />
                <span className="text-zinc-300 font-bold group-hover:text-amber-400 transition-colors">
                  {social.name}
                </span>
                <ChevronRight size={16} className="ml-auto text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BRACKET MODAL
// ============================================================

function BracketTeamBox({ name, logo, side = "left", isWinner = false }) {
  return (
    <div className={`brk-team ${side === "right" ? "brk-team-r" : ""} ${isWinner ? "brk-team-winner border-b-2 border-amber-400/60 shadow-[0_4px_12px_-2px_rgba(251,191,36,0.4)] rounded-md " : ""}`}>
      <div className="brk-avatar">
        {logo ? <img src={logo} alt={name} /> : <Swords size={14} />}
      </div>
      <span className="brk-team-name ">{name}</span>
      {isWinner && <Check size={20} className="brk-check" />}
    </div>
  );
}

function BracketMatchBox({ match, side, winners = [] }) {
  const winner1 = winners.includes(match.team1);
  const winner2 = winners.includes(match.team2);

  return (
    <div className="brk-node">
      <span className="brk-time">
        <Clock size={10} /> {match.time}
      </span>
      <div className="brk-matchup">
        <BracketTeamBox name={match.team1} logo={match.logo1} side="left" isWinner={winner1} />
        <span className="brk-vs">VS</span>
        <BracketTeamBox name={match.team2} logo={match.logo2} side="right" isWinner={winner2} />
      </div>
      {(winner1 || winner2) && (
        <div className="brk-advance">
          <Trophy size={10} />
          Avanza a la siguiente fase
        </div>
      )}
    </div>
  );
}

function PlayoffMatchCard({ match, accent, definido, winners = [] }) {
  const a = ACCENTS[accent];
  const team1 = definido ? match.team1 : "Por definir";
  const team2 = definido ? match.team2 : "Por definir";

  const isWinner1 = definido && winners.includes(match.team1);
  const isWinner2 = definido && winners.includes(match.team2);
  const hasWinner = isWinner1 || isWinner2;

  return (
    <div
      className={`relative border ${a.border} bg-gradient-to-br ${a.from} to-zinc-900/90 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        hasWinner ? "border-emerald-400/40 shadow-[0_4px_16px_-4px_rgba(52,211,153,0.35)]" : ""
      }`}
    >
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Equipo 1 */}
        <div
          className={`flex flex-col items-center gap-2 flex-1 min-w-0 ${
            isWinner1 ? "border-b-2 border-emerald-400/60 pb-2 rounded-md" : ""
          }`}
        >
          <div className="brk-avatar w-11 h-11 relative">
            {definido && match.logo1 ? (
              <img src={match.logo1} alt={team1} />
            ) : definido ? (
              <Swords size={16} />
            ) : (
              <Clock size={16} className="text-zinc-500" />
            )}
          </div>
          <span
            className={`text-xs font-bold text-center truncate w-full flex items-center gap-1 justify-center ${
              isWinner1 ? "text-emerald-400 font-black" : definido ? "text-zinc-100" : "text-zinc-500 italic"
            }`}
          >
            {team1}
            {isWinner1 && <Check size={14} className="text-emerald-400 shrink-0" />}
          </span>
        </div>

        <span className={`text-xs font-black ${a.text} shrink-0`}>VS</span>

        {/* Equipo 2 */}
        <div
          className={`flex flex-col items-center gap-2 flex-1 min-w-0 ${
            isWinner2 ? "border-b-2 border-emerald-400/60 pb-2 rounded-md" : ""
          }`}
        >
          <div className="brk-avatar w-11 h-11">
            {definido && match.logo2 ? (
              <img src={match.logo2} alt={team2} />
            ) : definido ? (
              <Swords size={16} />
            ) : (
              <Clock size={16} className="text-zinc-500" />
            )}
          </div>
          <span
            className={`text-xs font-bold text-center truncate w-full flex items-center gap-1 justify-center ${
              isWinner2 ? "text-emerald-400 font-black" : definido ? "text-zinc-100" : "text-zinc-500 italic"
            }`}
          >
            {team2}
            {isWinner2 && <Check size={14} className="text-emerald-400 shrink-0" />}
          </span>
        </div>
      </div>

      {!definido && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase border ${a.border} ${a.bgSoft} ${a.text} glow-pulse`}
        >
          <Sparkles size={10} />
          Clasificados por confirmar
        </span>
      )}

      {hasWinner && (
        <div className="brk-advance">
          <Trophy size={10} />
          Avanza a la siguiente fase
        </div>
      )}
    </div>
  );
}


  

function BracketModal({ isOpen, onClose }) {
  const [activeStage, setActiveStage] = useState("grupos");
  const [activeGroup, setActiveGroup] = useState("grupo-a");
  const [activeCuartosGroup, setActiveCuartosGroup] = useState("cuartos-a");

  if (!isOpen) return null;

  const group = BRACKET_DATA.find((g) => g.id === activeGroup);
  const a = ACCENTS[group.accent];

  const STAGES = [
    { id: "grupos", label: "Fase de Grupos", accent: "amber" },
    { id: "cuartos", label: "Cuartos de Final", accent: "amber" },
    { id: "semifinal", label: "Semifinal", accent: "cyan" },
    { id: "final", label: "Gran Final", accent: "red" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <style>{`
        .brk-panel {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
        }
        .brk-wave {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
        }
        .brk-wave-1 {
          width: 420px; height: 420px;
          top: -120px; left: -100px;
          background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
          animation: brk-float-1 12s ease-in-out infinite;
        }
        .brk-wave-2 {
          width: 380px; height: 380px;
          bottom: -140px; right: -100px;
          background: radial-gradient(circle, #ef4444 0%, transparent 70%);
          animation: brk-float-2 15s ease-in-out infinite;
        }
        .brk-wave-3 {
          width: 320px; height: 320px;
          top: 40%; left: 50%;
          background: radial-gradient(circle, #a855f7 0%, transparent 70%);
          animation: brk-float-3 18s ease-in-out infinite;
        }
        @keyframes brk-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes brk-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -30px) scale(1.2); }
        }
        @keyframes brk-float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.25; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
        }
        .brk-scroll {
          scrollbar-width: thin;
          scrollbar-color: #f59e0b transparent;
        }
        .brk-scroll::-webkit-scrollbar { width: 10px; }
        .brk-scroll::-wbracketebkit-scrollbar-track {
          background: rgba(24,24,27,0.4);
          border-radius: 999px;
          margin: 8px 0;
        }
        .brk-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #fbbf24, #ef4444, #a855f7);
          border-radius: 999px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow: 0 0 10px rgba(251,191,36,0.6);
          animation: brk-thumb-pulse 2.5s ease-in-out infinite;
        }
        @keyframes brk-thumb-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(251,191,36,0.5); }
          50% { box-shadow: 0 0 16px rgba(239,68,68,0.7); }
        }

        .brk-tree {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: stretch;
          gap: 0 1.5rem;
        }
        .brk-col { display: flex; flex-direction: column; justify-content: center; gap: 1.75rem; position: relative; }
        .brk-node {
          background: rgba(24,24,27,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 10px 14px;
          position: relative;
          transition: border-color 0.3s, transform 0.3s;
        }
        .brk-node:hover { border-color: rgba(251,191,36,0.4); transform: translateY(-2px); }
        .brk-time {
          display: flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #a1a1aa;
          font-family: 'Share Tech Mono', monospace;
          margin-bottom: 6px;
        }
        .brk-matchup { display: flex; align-items: center; gap: 8px; }
        .brk-team { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
        .brk-team-r { flex-direction: row-reverse; }
        .brk-avatar {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #f59e0b; overflow: hidden;
        }
        .brk-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .brk-team-name { font-size: 12px; font-weight: 700; color: #e4e4e7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .brk-team-winner .brk-team-name { color: #34d399; font-weight: 900; }
        .brk-check { color: #34d399; flex-shrink: 0; margin: 0 3px; }
        .brk-node:has(.brk-team-winner) {
          border-color: rgba(52,211,153,0.35);
          background: rgba(16,185,129,0.06);
        }
        .brk-advance {
          margin-top: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #34d399;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.25);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .brk-vs { font-size: 9px; font-weight: 900; color: #71717a; flex-shrink: 0; }

        .brk-hub {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; padding: 18px 14px; min-width: 110px;
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(251,191,36,0.15), rgba(24,24,27,0.7));
          border: 1px solid rgba(251,191,36,0.35);
          text-align: center;
        }
        .brk-hub-title { font-size: 10px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #fbbf24; }
        .brk-hub-sub { font-size: 9px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.08em; }

        .brk-col-left::before, .brk-col-left::after,
        .brk-col-right::before, .brk-col-right::after {
          content: ''; position: absolute; background: rgba(251,191,36,0.35);
        }
        .brk-col-left::before { right: -0.75rem; top: 25%; bottom: 25%; width: 2px; }
        .brk-col-left::after { right: -1.5rem; top: 50%; width: 0.75rem; height: 2px; }
        .brk-col-right::before { left: -0.75rem; top: 25%; bottom: 25%; width: 2px; }
        .brk-col-right::after { left: -1.5rem; top: 50%; width: 0.75rem; height: 2px; }
        .brk-node::after { display: none; }
        .brk-col-left .brk-node::after {
          content: ''; display: block; position: absolute;
          right: -0.75rem; top: 50%; width: 0.75rem; height: 2px;
          background: rgba(251,191,36,0.35);
        }
        .brk-col-right .brk-node::after {
          content: ''; display: block; position: absolute;
          left: -0.75rem; top: 50%; width: 0.75rem; height: 2px;
          background: rgba(251,191,36,0.35);
        }

        @media (max-width: 860px) {
          .brk-tree { display: flex; flex-direction: column; gap: 0.9rem; }
          .brk-col { gap: 0.9rem; }
          .brk-col-left::before, .brk-col-left::after,
          .brk-col-right::before, .brk-col-right::after,
          .brk-col-left .brk-node::after, .brk-col-right .brk-node::after {
            display: none;
          }
          .brk-hub { flex-direction: row; min-width: 0; width: 100%; justify-content: center; }
        }

        .brk-playoff-grid {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .brk-playoff-grid-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in brk-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="brk-panel bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/30 p-5 sm:p-8 shadow-2xl shadow-red-500/10">
          <div className="brk-wave brk-wave-1" />
          <div className="brk-wave brk-wave-2" />
          <div className="brk-wave brk-wave-3" />
          <div className="absolute inset-0 opacity-5 hex-pattern" />

          <div className="relative">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center shrink-0">
                  <Milestone size={20} className="text-zinc-950" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-3xl font-black text-zinc-100"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Bracket del torneo
                  </h3>
                  <p className="text-red-400 text-xs sm:text-sm">Aniversario Franklin Gamer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-200 transition-all hover:rotate-90 duration-300 p-2 hover:bg-zinc-800/50 rounded-full shrink-0"
              >
                <X size={22} />
              </button>
            </div>

            {/* Selector de FASE */}
            <div className="mt-5 flex flex-wrap gap-2">
              {STAGES.map((s) => {
                const sa = ACCENTS[s.accent];
                const isActive = activeStage === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(s.id)}
                    className={`px-4 py-2 border transition-all duration-300 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isActive
                        ? `${sa.bg} ${sa.borderStrong} text-zinc-950 scale-105`
                        : "bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    {s.id === "cuartos" && <Swords size={13} />}
                    {s.id === "semifinal" && <Flame size={13} />}
                    {s.id === "final" && <Trophy size={13} />}
                    {s.id === "grupos" && <UsersIcon size={13} />}
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* ===== FASE DE GRUPOS ===== */}
            {activeStage === "grupos" && (
              <div key="stage-grupos">
                <div className="mt-5 flex flex-wrap gap-2">
                  {BRACKET_DATA.map((g) => {
                    const ga = ACCENTS[g.accent];
                    const isActive = activeGroup === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setActiveGroup(g.id)}
                        className={`px-4 py-2 border transition-all duration-300 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider ${
                          isActive
                            ? `${ga.bg} ${ga.borderStrong} text-zinc-950 scale-105`
                            : "bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                        }`}
                      >
                        {g.name}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 mb-5 text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Calendar size={13} className={a.text} />
                  {group.day} · {group.name}
                </p>

                {/* key en el árbol para forzar remount limpio al cambiar de grupo */}
                <div className="brk-tree" key={activeGroup}>
                  <div className="brk-col brk-col-left">
                    {group.matches
                      .slice(0, Math.ceil(group.matches.length / 2))
                      .map((match, i) => (
                        <BracketMatchBox
                          key={`${activeGroup}-l-${match.id ?? i}`}
                          match={match}
                          side="left"
                          winners={group.winners}
                        />
                      ))}
                  </div>

                  <div className="brk-hub">
                    <Trophy size={18} className="text-amber-400" />
                    <span className="brk-hub-title">Top 2</span>
                    <span className="brk-hub-sub">Avanzan</span>
                  </div>

                  <div className="brk-col brk-col-right">
                    {group.matches
                      .slice(Math.ceil(group.matches.length / 2))
                      .map((match, i) => (
                        <BracketMatchBox
                          key={`${activeGroup}-r-${match.id ?? i}`}
                          match={match}
                          side="right"
                          winners={group.winners}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== CUARTOS / SEMIFINAL / FINAL ===== */}
            {activeStage !== "grupos" && (
              // 👇 LA CLAVE DEL FIX: key={activeStage} obliga a React a desmontar
              // por completo el bloque anterior (cuartos vs semi/final tienen
              // estructuras distintas) en vez de intentar "parchear" el DOM,
              // que es lo que causaba las filas y botones acumulándose.
              <div className="mt-6" key={`stage-${activeStage}`}>
                {(() => {
                  const stageData = PLAYOFFS_DATA[activeStage];
                  const sa = ACCENTS[stageData.accent];

                  // ===== CUARTOS: tiene subgrupos =====
                  if (stageData.groups) {
                    const cg =
                      stageData.groups.find((g) => g.id === activeCuartosGroup) ||
                      stageData.groups[0];
                    const ca = ACCENTS[stageData.accent];

                    return (
                      // key={activeCuartosGroup} evita el mismo problema al
                      // saltar entre Cuartos A / B / C
                      <div key={activeCuartosGroup}>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {stageData.groups.map((g) => {
                            const isActive = activeCuartosGroup === g.id;
                            return (
                              <button
                                key={g.id}
                                onClick={() => setActiveCuartosGroup(g.id)}
                                className={`px-4 py-2 border transition-all duration-300 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider ${
                                  isActive
                                    ? `${ca.bg} ${ca.borderStrong} text-zinc-950 scale-105`
                                    : "bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                                }`}
                              >
                                {g.name}
                              </button>
                            );
                          })}
                        </div>

                        <p className="mb-5 text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                          <Trophy size={13} className={ca.text} />
                          {cg.day} · {stageData.label} · {cg.name}
                        </p>

                        <div className="brk-tree">
                          <div className="brk-col brk-col-left">
                            {cg.matches
                              .slice(0, Math.ceil(cg.matches.length / 2))
                              .map((match, i) => (
                                <BracketMatchBox
                                  key={`${cg.id}-l-${match.id ?? i}`}
                                  match={match}
                                  side="left"
                                  winners={cg.winners}
                                />
                              ))}
                          </div>

                          <div className="brk-hub">
                            <Trophy size={18} className="text-amber-400" />
                            <span className="brk-hub-title">Top 1</span>
                            <span className="brk-hub-sub">Avanza</span>
                          </div>

                          <div className="brk-col brk-col-right">
                            {cg.matches
                              .slice(Math.ceil(cg.matches.length / 2))
                              .map((match, i) => (
                                <BracketMatchBox
                                  key={`${cg.id}-r-${match.id ?? i}`}
                                  match={match}
                                  side="right"
                                  winners={cg.winners}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // ===== SEMIFINAL / FINAL: mismo estilo que Cuartos =====
                  const matches = stageData.matches;
                  const isSingleMatch = matches.length <= 1;
                  const hubLabel = activeStage === "final" ? "Campeón" : "Avanza";

                  if (isSingleMatch) {
                    // Gran Final con un solo partido: nodo centrado + hub arriba
                    return (
                      <div className="flex flex-col items-center gap-3">
                        <div className="brk-hub" style={{ minWidth: 160 }}>
                          <Trophy size={20} className={sa.text} />
                          <span className="brk-hub-title">{stageData.label}</span>
                          <span className="brk-hub-sub">{hubLabel}</span>
                        </div>

                        {matches.map((match) => (
                          <div key={match.id ?? `${activeStage}-0`} className="w-full max-w-sm">
                            {(match.day || match.time) && (
                              <p className="mb-2 text-[11px] uppercase tracking-widest text-zinc-500 flex items-center justify-center gap-2">
                                <Calendar size={12} className={sa.text} />
                                {match.day}
                                {match.day && match.time && " · "}
                                {match.time}
                              </p>
                            )}
                            <BracketMatchBox
                              match={match}
                              side="left"
                              winners={stageData.winners}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Semifinal (u otra fase) con 2+ partidos: mismo árbol que Cuartos
                  return (
                    <>
                      <p className="mb-5 text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <Trophy size={13} className={sa.text} />
                        {stageData.label}
                      </p>

                      <div className="brk-tree">
                        <div className="brk-col brk-col-left">
                          {matches
                            .slice(0, Math.ceil(matches.length / 2))
                            .map((match, i) => (
                              <div key={match.id ?? `${activeStage}-l-${i}`}>
                                {(match.day || match.time) && (
                                  <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                    <Calendar size={11} className={sa.text} />
                                    {match.day}
                                    {match.day && match.time && " · "}
                                    {match.time}
                                  </p>
                                )}
                                <BracketMatchBox match={match} side="left" winners={stageData.winners} />
                              </div>
                            ))}
                        </div>

                        <div className="brk-hub">
                          <Trophy size={18} className={sa.text} />
                          <span className="brk-hub-title">{stageData.label}</span>
                          <span className="brk-hub-sub">{hubLabel}</span>
                        </div>

                        <div className="brk-col brk-col-right">
                          {matches
                            .slice(Math.ceil(matches.length / 2))
                            .map((match, i) => (
                              <div key={match.id ?? `${activeStage}-r-${i}`}>
                                {(match.day || match.time) && (
                                  <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                    <Calendar size={11} className={sa.text} />
                                    {match.day}
                                    {match.day && match.time && " · "}
                                    {match.time}
                                  </p>
                                )}
                                <BracketMatchBox match={match} side="right" winners={stageData.winners} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION COMPONENTS
// ============================================================

function useParallaxMouse(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return pos;
}

function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

function ParallaxBackground({ children, className = "" }) {
  const mouse = useParallaxMouse(20);
  const scrollY = useScrollParallax();

  return (
    <div
      className={`absolute inset-0 z-0 transition-transform duration-300 ease-out bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        transform: `translate3d(${mouse.x * 0.2}px, ${mouse.y * 0.2 + scrollY * 0.1}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}

function InicioSection({ particles, onFollowClick, following }) {
  const sectionRef = useRef(null);
  const mouse = useParallaxMouse(30);
  const scrollY = useScrollParallax();

  const scrollFade = Math.max(0, 1 - scrollY / 600);
  const scrollTranslate = scrollY * 0.35;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParallaxBackground className="bg-[url('/6.jpg')]">
        <BattlefieldBackground particles={particles} />
      </ParallaxBackground>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 85%)",
          opacity: scrollFade,
        }}
      />

      <div
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center transition-transform duration-150 ease-out"
        style={{
          opacity: scrollFade,
          transform: `translate3d(${mouse.x * 0.6}px, ${mouse.y * 0.6 - scrollTranslate}px, 0)`,
        }}
      >
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <SectionEyebrow accent="amber" icon={Crown}>
            Team Scorpio • Jungla
          </SectionEyebrow>
        </div>

        <h1
          className="fade-up text-6xl sm:text-8xl font-black tracking-tight text-zinc-50 leading-none relative"
          style={{ fontFamily: "'Orbitron', sans-serif", animationDelay: "0.15s" }}
        >
          <span
            className="absolute inset-0 blur-2xl opacity-40 animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(251,191,36,0.5) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <span className="relative">FRANKLIN</span>
          <span className="block text-2xl sm:text-3xl text-amber-400 mt-2 relative">
            El Aguijón Dorado
          </span>
        </h1>

        <p
          className="fade-up mt-4 text-base sm:text-xl text-zinc-300 max-w-xl mx-auto"
          style={{ animationDelay: "0.28s" }}
        >
          El aguijón que decide la partida. Rango Mítico, mente fría,
          iniciativas que rompen líneas enemigas.
        </p>

        <div
          className="fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: "0.4s" }}
        >
          <GlowButton
            accent="amber"
            onClick={() =>
              document.getElementById("torneos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Trophy size={18} /> ¡¡ LOS MEJORES DE LATAM !!
          </GlowButton>

          <button
            onClick={onFollowClick}
            className={`relative inline-flex items-center justify-center gap-2 font-bold px-7 py-3 tracking-wide border-2 transition-all duration-300 hover:scale-105 active:scale-95 rounded-lg ${
              following
                ? "bg-transparent text-zinc-100 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
                : "bg-transparent text-zinc-100 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            {following ? <Check size={18} /> : <Check size={18} />}
            {following ? "Seguir" : "Seguir"}
          </button>
        </div>

        <div
          className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.55s" }}
        >
          {[
            { label: "Rango", value: "Mítico", accent: "amber" },
            { label: "Win rate", value: "68%", accent: "cyan" },
            { label: "KDA", value: "7.2", accent: "violet" },
            { label: "Racha", value: "12V", accent: "red" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`fade-up px-4 py-2 border ${ACCENTS[s.accent].border} bg-zinc-900/50 backdrop-blur-sm hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default rounded-lg`}
              style={{
                animationDelay: `${0.65 + i * 0.08}s`,
              }}
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

      <div
        className="hidden lg:block absolute right-8 bottom-10 z-20 opacity-90 transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${mouse.x * 1.2}px, ${mouse.y * 1.2}px, 0)`,
        }}
      >
        <MiniRadar />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <TickerBar />
      </div>

      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce"
        style={{ opacity: scrollFade }}
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-amber-400 to-transparent" />
      </div>
    </section>
  );
}

function HeroesSection({ openHero, setOpenHero }) {
  return (
    <section id="heroes" className="relative py-24 bg-zinc-900/50 border-t border-zinc-800/50">
      <div className="absolute inset-0 opacity-[0.03] hex-pattern" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow accent="cyan" icon={SwordsIcon}>Pool de héroes</SectionEyebrow>
        <SectionTitle accent="cyan" subtitle="Toca una carta para ver las habilidades que Franklin domina con cada campeón.">
          Héroes de guerra
        </SectionTitle>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HERO_MAINS.map((hero) => {
            const a = ACCENTS[hero.accent];
            const isOpen = openHero === hero.id;
            return (
              <div
                key={hero.id}
                className={`relative border ${a.border} bg-gradient-to-br ${a.from} to-zinc-900/90 p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${hero.accent}-500/10 cursor-pointer group rounded-2xl`}
                onClick={() => setOpenHero(isOpen ? null : hero.id)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-transparent to-current pointer-events-none rounded-2xl" style={{ color: a.glow }} />
                
                <HexFrame accent={hero.accent} size="lg" className="mb-4 animate-float">
                  <img src={hero.imagen} alt={hero.name} className="w-full h-full object-cover rounded-full" />
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
                  className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 border ${a.border} ${a.text} hover:${a.bgSoft} transition-colors rounded-lg`}
                >
                  {isOpen ? "Ocultar habilidades" : "Ver habilidades"}
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>

                <div
                  className={`grid w-full transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                  style={{ display: "grid" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 text-left">
                      {hero.skills.map((skill) => (
                        <div key={skill.label} className="flex items-start gap-3 group/skill">
                          <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${a.bgSoft} ${a.text} group-hover/skill:scale-110 transition-transform`}>
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
  );
}

function TorneosSection({ countdown, onRegisterClick, onBracketClick }) {
  return (
    <section id="torneos" className=" relative
    w-full
    min-h-screen
    py-24
    overflow-hidden
    border-t border-zinc-800/50
    bg-[url('/2.png')]
    bg-cover
    bg-center
    bg-no-repeat">

      <div className="absolute inset-0 bg-black/70"></div>

<div className="absolute inset-0 hex-pattern opacity-[0.04]"></div>

<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-red-500/5 to-black/30"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow accent="red" icon={Award}>Historial de combate</SectionEyebrow>
        <SectionTitle accent="red" subtitle="Torneo especial por el aniversario de Franklin Gamer">
          Torneo Aniversario
        </SectionTitle>

        <div className="mt-10 max-w-2xl mx-auto border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-zinc-900/90 px-6 py-8 text-center relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 animate-pulse" />
          </div>
          
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-bold flex items-center justify-center gap-2">
            <Radio size={14} className="animate-pulse" /> Próxima misión Cuarta temporada del torneo Franklin
          </p>
          
          {countdown.over ? (
            <p className="mt-3 text-zinc-300 font-bold text-xl">
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
                  className="bg-zinc-950/80 border border-amber-500/30 px-3 sm:px-4 py-2 min-w-[64px] hover:scale-105 transition-transform rounded-lg"
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

        <div className="mt-12 border border-red-500/30 bg-gradient-to-br from-red-500/10 to-zinc-900/90 p-6 sm:p-8 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 rounded-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Crown className="w-4 h-4 text-red-400" />
                Torneo Especial
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-100 mt-1 flex items-center gap-3">
                {TOURNAMENT.name}
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </h3>
              <p className="text-zinc-400 mt-2">{TOURNAMENT.description}</p>
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-zinc-900/50 p-3 border border-zinc-800 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">Modalidad</p>
                  <p className="text-sm font-bold text-zinc-200 mt-0.5">
                    <Users className="inline w-4 h-4 mr-1 text-red-400" />
                    {TOURNAMENT.mode}
                  </p>
                </div>
                <div className="bg-zinc-900/50 p-3 border border-zinc-800 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">Fecha</p>
                  <p className="text-sm font-bold text-zinc-200 mt-0.5">
                    <Calendar className="inline w-4 h-4 mr-1 text-amber-400" />
                    {TOURNAMENT.date}
                  </p>
                </div>
                <div className="bg-zinc-900/50 p-3 border border-zinc-800 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">Premio</p>
                  <p className="text-sm font-bold text-amber-400 mt-0.5">
                    <Coins className="inline w-4 h-4 mr-1" />
                    {TOURNAMENT.prize}
                  </p>
                </div>
                <div className="bg-zinc-900/50 p-3 border border-zinc-800 rounded-lg">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">Estado</p>
                  <StatusPill status={TOURNAMENT.status} />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <GlowButton accent="red" onClick={onRegisterClick} className="w-full">
                <Rocket size={18} />
                Inscribirse
              </GlowButton>
              <GlowButton accent="amber" onClick={onBracketClick} className="w-full">
                <ClipboardList size={18} />
                Ver Cuadro
              </GlowButton>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-zinc-800/50">
            <p className="text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Gem className="w-4 h-4 text-amber-400" />
              Patrocinadores
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              {TOURNAMENT.sponsors.map((sponsor) => (
                <span key={sponsor} className="text-sm text-zinc-400 bg-zinc-900/50 px-3 py-1 border border-zinc-800 rounded-lg">
                  {sponsor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EquipoSection() {
  return (
    <section
  id="equipo"
  className="
    relative
    py-24
    border-t border-zinc-800/50
    overflow-hidden
    bg-[url('/2.png')]
    h-screen
    bg-cover
    bg-center
    bg-no-repeat
  "
>
  {/* Fondo oscuro */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Patrón hexagonal */}
  <div className="absolute inset-0 hex-pattern opacity-[0.04]" />

  {/* Luz roja sutil */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)]" />

  {/* Contenido */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow accent="violet" icon={ShieldIcon}>La colmena</SectionEyebrow>
        <SectionTitle accent="violet" subtitle="El equipo que domina el campo de batalla">
          Escuadrón Scorpio
        </SectionTitle>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-5">
          {ROSTER.map((m, index) => {
            const a = ACCENTS[m.accent];
            return (
              <div
                key={m.name + m.role}
                className={`flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 ${
                  m.lead ? "col-span-2 sm:col-span-1" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <HexFrame accent={m.accent} size={m.lead ? "xl" : "md"} className="mb-3 animate-float">
                  <img src={m.logo} alt={m.name} className="w-full h-full object-cover rounded-full" />
                </HexFrame>
                <p className={`font-black ${m.lead ? "text-xl" : "text-sm"} text-zinc-100`}>
                  {m.name}
                  {m.lead && <Crown className="inline w-4 h-4 ml-1 text-amber-400" />}
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
  );
}


function ParejasSection() {
  return (
    <section
      id="parejas"
      className="
        relative
        py-20 sm:py-24
        border-t border-zinc-800/50
        min-h-screen
      "
    >
      {/* Contenedor de fondo: aquí sí va overflow-hidden, aislado del contenido */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-[url('/2.png')]
            bg-cover bg-center bg-no-repeat
          "
        />
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Patrón hexagonal */}
        <div className="absolute inset-0 hex-pattern opacity-[0.04]" />

        {/* Iluminación roja */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)]" />

        {/* Degradado vertical */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow accent="red" icon={Heart}>Amor gamer</SectionEyebrow>
        <SectionTitle
          accent="red"
          subtitle="Las parejas confirmadas del canal, unidas dentro y fuera del Land of Dawn"
        >
          Parejas Confirmadas
        </SectionTitle>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {PAREJAS_CONFIRMADAS.map((p) => {
            const a = ACCENTS[p.accent];
            return (
              <div
                key={p.id}
                className={`relative border ${a.border} bg-gradient-to-br ${a.from} to-zinc-900/90 p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500`}
              >
                <div className="flex items-center justify-center gap-3">
                  <HexFrame accent={p.accent} size="md" animated>
                    <img src={p.fotoEl} alt={p.el} className="w-full h-full object-cover rounded-full" />
                  </HexFrame>
                  <Heart className={`${a.text} animate-pulse shrink-0`} size={26} fill="currentColor" />
                  <HexFrame accent={p.accent} size="md" animated>
                    <img src={p.fotoElla} alt={p.ella} className="w-full h-full object-cover rounded-full" />
                  </HexFrame>
                </div>

                <h3
                  className="mt-4 text-lg sm:text-xl font-black text-zinc-100"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {p.el} <span className={a.text}>&</span> {p.ella}
                </h3>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                  {p.heroEl} <Swords className="inline w-3 h-3 mx-1" /> {p.heroElla}
                </p>
                <p className={`text-[11px] uppercase tracking-widest ${a.text} mt-2`}>{p.desde}</p>
                <p className="text-sm text-zinc-400 mt-3">{p.frase}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GanadoresSection() {
  return (
    <section
      id="ganadores"
      className="relative py-20 sm:py-24 border-t border-zinc-800/50 overflow-hidden"
    >
      <style>{`
        @keyframes copa-entrada-y-flote {
          0% { transform: scale(0.3) rotate(-15deg) translateY(0); opacity: 0; }
          45% { transform: scale(1.15) rotate(6deg) translateY(0); opacity: 1; }
          65% { transform: scale(0.95) rotate(-3deg) translateY(0); opacity: 1; }
          80% { transform: scale(1) rotate(0deg) translateY(0); opacity: 1; }
          90% { transform: scale(1) rotate(0deg) translateY(-10px); opacity: 1; }
          100% { transform: scale(1) rotate(0deg) translateY(0); opacity: 1; }
        }
        .copa-pop {
          opacity: 0;
          animation: copa-entrada-y-flote 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     copa-float-loop 2.4s ease-in-out 0.9s infinite;
        }

        @keyframes copa-float-loop {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes copa-glow-ring {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.25); }
        }
        .copa-glow-ring { animation: copa-glow-ring 2.4s ease-in-out infinite; }

        @keyframes card-rise {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-rise { animation: card-rise 0.7s cubic-bezier(0.4,0,0.2,1) forwards; opacity: 0; }

        .ganador-card:hover .copa-hover-scale {
          transform: scale(1.18) translateY(-6px) rotate(-4deg);
        }
        .copa-hover-scale {
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Contenedor de fondo aislado: la imagen se mantiene fija/proporcional
          sin importar cuánto crezca la sección en mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-[url('/2.png')]
            bg-cover bg-center bg-no-repeat
            md:bg-fixed
          "
        />
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Patrón */}
        <div className="absolute inset-0 hex-pattern opacity-[0.04]" />

        {/* Iluminación roja */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)]" />

        {/* Degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow accent="amber" icon={Medal}>Salón de la fama</SectionEyebrow>
        <SectionTitle accent="amber" subtitle="Copas, campeones y las próximas batallas del Torneo Franklin">
          Ganadores Anteriores
        </SectionTitle>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {TORNEOS_PASADOS.map((t, index) => {
            const a = ACCENTS[t.accent];
            return (
              <div
                key={t.etapa}
                className={`ganador-card card-rise relative border ${a.border} bg-gradient-to-br ${a.from} to-zinc-900/90 p-5 sm:p-6 rounded-2xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* glow de fondo */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 20%, ${a.glow} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">{t.fecha}</p>
                  <h3
                    className={`text-xl font-black ${a.text} mt-1`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {t.nombre}
                  </h3>

                  {/* COPA con animación fuerte */}
                  <div className="relative mt-6 flex items-center justify-center h-28">
                    <div
                      className={`copa-glow-ring absolute w-24 h-24 rounded-full ${a.bg} blur-2xl`}
                    />
                    <div
                      className="copa-pop copa-hover-scale relative z-10"
                      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                    >
                      {t.copa ? (
                        <img
                          src={t.copa}
                          alt={`Copa ${t.nombre}`}
                          className="rounded-2xl w-20 h-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                          onError={(e) => {
                            console.error("❌ No se pudo cargar:", t.copa);
                            e.target.style.border = "2px solid red";
                          }}
                          onLoad={() => console.log("✅ Cargó bien:", t.copa)}
                        />
                      ) : (
                        <Trophy className={a.text} size={64} />
                      )}
                    </div>
                  </div>

                  {t.finalizado ? (
                    <div className="mt-2 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <HexFrame accent={t.accent} size="sm" animated>
                          {t.logo ? (
                            <img src={t.logo} alt={t.campeon} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <Crown className={a.text} size={18} />
                          )}
                        </HexFrame>
                        <p className="font-black text-zinc-100 text-lg">{t.campeon}</p>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-amber-400">Campeón</p>

                      <div className="mt-3 pt-3 border-t border-zinc-800/50 w-full text-sm text-zinc-400">
                        <p>🌟 MVP: <span className="text-zinc-200 font-bold">{t.mvp}</span></p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-col items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase border ${a.border} ${a.bgSoft} ${a.text} glow-pulse`}
                      >
                        <Sparkles size={12} />
                        Aún sin campeón
                      </span>
                      <p className="text-sm text-zinc-400 mt-2">
                        La copa espera a quien la levante 🏆
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// ============================================================
// MAIN COMPONENT
// ============================================================

export default function TeamScorpioFranklin() {
  const [currentSection, setCurrentSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [openHero, setOpenHero] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBracketModal, setShowBracketModal] = useState(false);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  const countdown = useCountdown(NEXT_MATCH_DATE);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 1.3) % 10,
        duration: 10 + ((i * 7) % 8),
        size: 1 + (i % 3),
        opacity: 0.3 + (i % 7) / 10,
      })),
    []
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let started = false;

  const tryPlay = () => {
    audio
      .play()
      .then(() => {
        started = true;
        setAudioPlaying(true);
      })
      .catch(() => {
        // El navegador bloqueó el autoplay con sonido; esperamos interacción
        started = false;
      });
  };

  // 1) Intento inmediato al cargar
  tryPlay();

  // 2) Si fue bloqueado, arrancar en la primera interacción del usuario
  const startOnInteraction = () => {
    if (!started) {
      tryPlay();
    }
    // Ya cumplió su propósito, se remueven los listeners
    window.removeEventListener("click", startOnInteraction);
    window.removeEventListener("touchstart", startOnInteraction);
    window.removeEventListener("keydown", startOnInteraction);
    window.removeEventListener("scroll", startOnInteraction);
  };

  window.addEventListener("click", startOnInteraction);
  window.addEventListener("touchstart", startOnInteraction);
  window.addEventListener("keydown", startOnInteraction);
  window.addEventListener("scroll", startOnInteraction, { passive: true });

  return () => {
    window.removeEventListener("click", startOnInteraction);
    window.removeEventListener("touchstart", startOnInteraction);
    window.removeEventListener("keydown", startOnInteraction);
    window.removeEventListener("scroll", startOnInteraction);
  };
}, []);

  const navigateTo = (section) => {
    setMenuOpen(false);
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  const handleFollowClick = () => {
    setFollowing(!following);
    setShowSocialModal(true);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "inicio":
        return <InicioSection particles={particles} onFollowClick={handleFollowClick} following={following} />;
      case "torneos":
        return <TorneosSection 
          countdown={countdown} 
          onRegisterClick={() => setShowRegisterModal(true)}
          onBracketClick={() => setShowBracketModal(true)}
        />;
      case "equipo":
        return <EquipoSection />;
      case "parejas":
        return <ParejasSection />;
      case "ganadores":
         return <GanadoresSection />;
      default:
        return <InicioSection particles={particles} onFollowClick={handleFollowClick} following={following} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 overflow-x-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <GlobalStyle />
      <SocialModal isOpen={showSocialModal} onClose={() => setShowSocialModal(false)} />
      <RegistrationModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => {}}
      />
      <BracketModal 
        isOpen={showBracketModal} 
        onClose={() => setShowBracketModal(false)} 
      />

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-900/90 border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigateTo("inicio")}
            className="flex items-center gap-2.5 group"
          >
            <HexFrame accent="amber" size="sm" animated>
              <img src="/foto.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
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

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-sm font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  currentSection === link.id
                    ? "text-amber-400 scale-105"
                    : "text-zinc-400 hover:text-amber-400 hover:scale-105"
                }`}
              >
                <link.icon size={16} />
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
          <div className="md:hidden border-t border-zinc-800/50 bg-zinc-900/95 px-4 py-3 flex flex-col gap-1 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-left px-2 py-3 text-sm font-semibold tracking-wide uppercase border-b border-zinc-900/50 last:border-none transition-all flex items-center gap-2 ${
                  currentSection === link.id
                    ? "text-amber-400"
                    : "text-zinc-300 hover:text-amber-400"
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      {renderSection()}

      {/* ================= REPRODUCTOR DE MÚSICA ================= */}
     <audio ref={audioRef} loop autoPlay src="/music.mp3" />

<div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-amber-500/30 px-4 py-3 shadow-2xl shadow-black/50 rounded-xl">
  <button
    onClick={toggleAudio}
    className="w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:scale-110 transition-transform text-zinc-950 shrink-0"
    aria-label={audioPlaying ? "Pausar música" : "Reproducir música"}
  >
    {audioPlaying ? <Pause size={14} /> : <Play size={18} className="ml-0.5" />}
  </button>

 
</div>
    </div>
  );
}

// ============================================================
// DECORATIVE PIECES
// ============================================================

function BattlefieldBackground({ particles }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-emerald-950/30 to-zinc-900" />
      <div className="absolute inset-0 opacity-[0.07] hud-grid" />
      
      <div className="absolute -left-1/4 bottom-0 w-[150%] h-64 bg-emerald-900/20 blur-3xl fog-drift" />
      <div className="absolute -right-1/4 bottom-10 w-[150%] h-56 bg-zinc-800/30 blur-3xl fog-drift" style={{ animationDelay: "3s" }} />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      <svg
        className="absolute bottom-0 left-0 w-full h-40 sm:h-56 text-zinc-900"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,200 L0,120 L60,90 L100,130 L160,60 L210,120 L260,80 L320,140 L380,70 L440,130 L500,90 L560,150 L620,60 L680,130 L740,90 L800,150 L860,70 L920,130 L980,90 L1040,140 L1100,80 L1160,120 L1200,100 L1200,200 Z" />
      </svg>

      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent scan-sweep" />
      </div>

      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-amber-400/60 float-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}

function MiniRadar() {
  return (
    <div className="relative w-40 h-40 rounded-full border border-emerald-500/30 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-emerald-500/10">
      <div className="absolute inset-3 rounded-full border border-emerald-500/20" />
      <div className="absolute inset-8 rounded-full border border-emerald-500/20" />
      <div className="absolute inset-10 rounded-full border border-emerald-500/10" />
      
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(52,211,153,0.35), transparent 40%, rgba(52,211,153,0.1))",
          animation: "radar-spin 4s linear infinite",
        }}
      />
      
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <div
          key={deg}
          className="absolute w-px h-12 bg-emerald-500/10"
          style={{ transform: `rotate(${deg}deg)` }}
        />
      ))}
      
      <span className="absolute w-2 h-2 rounded-full bg-amber-400 glow-pulse" />
      <Crosshair size={16} className="text-emerald-400/60 absolute" />
      
      <div className="absolute bottom-2 text-[8px] text-zinc-600 font-mono tracking-wider">
        SYS:ONLINE
      </div>
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
    "⭐ ANIVERSARIO FRANKLIN GAMER",
    "🎁 TORNEO 5 VS 5 — 1 DE AGOSTO 2026",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="bg-black/60 border-t border-amber-500/20 overflow-hidden py-2.5">
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

// ============================================================
// GLOBAL STYLE
// ============================================================

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

      @keyframes fade-up {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fade-up { animation: fade-up 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards; opacity: 0; }

      @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in { animation: fade-in 0.5s ease forwards; }

      @keyframes scale-in {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

      @keyframes slide-in {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .animate-slide-in { animation: slide-in 0.4s ease forwards; opacity: 0; }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      .animate-float { animation: float 3s ease-in-out infinite; }

      @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 6px #fbbf24, 0 0 2px #fbbf24 inset; }
        50% { box-shadow: 0 0 20px #fbbf24, 0 0 6px #fbbf24 inset; }
      }
      .glow-pulse { animation: glow-pulse 2.2s ease-in-out infinite; }

      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow { animation: spin-slow 6s linear infinite; }

      @keyframes fog-drift {
        0% { transform: translateX(-8%) scale(1); }
        50% { transform: translateX(8%) scale(1.1); }
        100% { transform: translateX(-8%) scale(1); }
      }
      .fog-drift { animation: fog-drift 14s ease-in-out infinite; }

      @keyframes scan-sweep {
        0% { transform: translateY(-120%) rotate(5deg); }
        100% { transform: translateY(220%) rotate(-5deg); }
      }
      .scan-sweep { animation: scan-sweep 6s linear infinite; }

      @keyframes float-particle {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 0.9; }
        90% { opacity: 0.9; }
        100% { transform: translateY(-90vh) translateX(20px) scale(0); opacity: 0; }
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

      @keyframes modal-in {
        from { opacity: 0; transform: scale(0.95) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-modal-in { animation: modal-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

      .hud-grid {
        background-image:
          linear-gradient(to right, rgba(148,163,184,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148,163,184,0.5) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .hex-pattern {
        background-image: radial-gradient(circle at 2px 2px, rgba(248,113,113,0.4) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(24, 24, 27, 0.5);
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(52, 211, 153, 0.3);
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(52, 211, 153, 0.5);
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