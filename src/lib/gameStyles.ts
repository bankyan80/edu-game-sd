export const OPTION_COLORS = [
  { from: "from-pink-400", to: "to-rose-500", border: "border-pink-600", hover: "hover:from-pink-500 hover:to-rose-600" },
  { from: "from-blue-400", to: "to-indigo-500", border: "border-blue-600", hover: "hover:from-blue-500 hover:to-indigo-600" },
  { from: "from-green-400", to: "to-emerald-500", border: "border-green-600", hover: "hover:from-green-500 hover:to-emerald-600" },
  { from: "from-amber-400", to: "to-orange-500", border: "border-amber-600", hover: "hover:from-amber-500 hover:to-orange-600" },
  { from: "from-purple-400", to: "to-violet-500", border: "border-purple-600", hover: "hover:from-purple-500 hover:to-violet-600" },
  { from: "from-cyan-400", to: "to-teal-500", border: "border-cyan-600", hover: "hover:from-cyan-500 hover:to-teal-600" },
  { from: "from-red-400", to: "to-rose-500", border: "border-red-600", hover: "hover:from-red-500 hover:to-rose-600" },
  { from: "from-fuchsia-400", to: "to-pink-500", border: "border-fuchsia-600", hover: "hover:from-fuchsia-500 hover:to-pink-600" },
];

export function getOptionColor(qIndex: number, optIndex: number) {
  return OPTION_COLORS[(qIndex * 3 + optIndex * 7) % OPTION_COLORS.length];
}

export const btn3d = "font-black text-white rounded-2xl border-b-[5px] active:translate-y-1 active:border-b-[2px] active:mb-[3px] transition-all duration-100 drop-shadow-lg";
