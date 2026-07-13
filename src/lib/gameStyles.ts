export const OPTION_COLORS = [
  { from: "from-pink-500", to: "to-rose-600", border: "border-pink-700", hover: "hover:from-pink-600 hover:to-rose-700" },
  { from: "from-blue-500", to: "to-indigo-600", border: "border-blue-700", hover: "hover:from-blue-600 hover:to-indigo-700" },
  { from: "from-green-500", to: "to-emerald-600", border: "border-green-700", hover: "hover:from-green-600 hover:to-emerald-700" },
  { from: "from-amber-500", to: "to-orange-600", border: "border-amber-700", hover: "hover:from-amber-600 hover:to-orange-700" },
  { from: "from-purple-500", to: "to-violet-600", border: "border-purple-700", hover: "hover:from-purple-600 hover:to-violet-700" },
  { from: "from-cyan-500", to: "to-teal-600", border: "border-cyan-700", hover: "hover:from-cyan-600 hover:to-teal-700" },
  { from: "from-red-500", to: "to-rose-600", border: "border-red-700", hover: "hover:from-red-600 hover:to-rose-700" },
  { from: "from-fuchsia-500", to: "to-pink-600", border: "border-fuchsia-700", hover: "hover:from-fuchsia-600 hover:to-pink-700" },
];

export function getOptionColor(qIndex: number, optIndex: number) {
  return OPTION_COLORS[(qIndex * 3 + optIndex * 7) % OPTION_COLORS.length];
}

export const btn3d = "font-black text-white rounded-2xl border-b-[5px] active:translate-y-1 active:border-b-[2px] active:mb-[3px] transition-all duration-100 drop-shadow-lg";
