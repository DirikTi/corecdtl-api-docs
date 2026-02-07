export function Stage({ label, highlight, subtle }: any) {
  return (
    <div
      className={`
        px-4 py-2 rounded-lg border
        ${highlight
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
          : subtle
          ? "bg-slate-900 border-slate-800 text-slate-500"
          : "bg-slate-800 border-slate-700"}
      `}
    >
      {label}
    </div>
  );
}

export function Arrow() {
  return <span className="text-slate-600">↓</span>;
}
