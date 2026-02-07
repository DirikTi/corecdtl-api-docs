export const OptionRow = ({ name, desc, defaultValue, effect }) => (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="font-mono text-cyan-400">{name}</div>
      <div className="col-span-2 text-slate-400">{desc}</div>
      <div className="text-slate-500 text-xs">
        {defaultValue && <div>Default: {defaultValue}</div>}
        <div className="opacity-60">{effect}</div>
      </div>
    </div>
  );