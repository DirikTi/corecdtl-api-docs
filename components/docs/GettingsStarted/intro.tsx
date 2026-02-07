export function Intro() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
          Introduction
        </h1>

        <p className="text-lg text-slate-400 leading-relaxed">
          CoreCDTL is a high-performance HTTP engine designed for systems where
          predictability, low latency, and execution control matter more than
          convenience abstractions.
        </p>

        <p className="text-slate-500 leading-relaxed max-w-3xl">
          It is not a web framework.  
          It is a low-level infrastructure component meant to be embedded into
          API gateways, custom servers, routers, proxies, and edge runtimes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-slate-800 bg-slate-900/20">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            Design Goals
          </h3>
          <p className="text-sm text-slate-400">
            Deterministic execution, minimal memory churn, and stable tail latency
            under sustained concurrency.
          </p>
        </div>

        <div className="p-6 border border-slate-800 bg-slate-900/20">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            Intended Use
          </h3>
          <p className="text-sm text-slate-400">
            API servers, high-throughput gateways, internal services,
            and performance-critical HTTP workloads.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Core Characteristics</h2>
        <ul className="space-y-3">
          {[
            "DFA-based HTTP parsing and routing.",
            "Object reuse and pool-driven memory discipline.",
            "Designed for small-payload, high-frequency API traffic.",
            "Built with LLVM-friendly execution paths in mind."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-400 items-start">
              <span className="text-cyan-500 font-bold mt-1">/</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}