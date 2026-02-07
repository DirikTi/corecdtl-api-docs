import CodeBlock from "@/components/CodeBlock";

export function DocHypernode() {
    return (
<section className="space-y-14">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-200">
      Hypernode Overview
    </h2>

    <p className="text-slate-400 leading-relaxed">
      Hypernode is the native (C++) core that powers CoreCDTL.
    </p>

    <p className="text-slate-400 leading-relaxed">
      While CoreCDTL manages routing, accumulators and request lifecycle in
      TypeScript, the heavy work — parsing, pooling and low-level memory handling —
      is executed inside Hypernode for maximum performance.
    </p>

    <p className="text-slate-400 leading-relaxed">
      Think of it as:
      <br />
      <strong>CoreCDTL = orchestration</strong><br />
      <strong>Hypernode = engine</strong>
    </p>
  </div>

  {/* Native binding */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      Native Binding
    </h3>

    <p className="text-slate-400 leading-relaxed">
      The addon is compiled C++ code loaded through Node’s native bindings.
      This allows CoreCDTL to bypass JavaScript bottlenecks for hot paths like:
    </p>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>URL scanning</li>
      <li>header parsing</li>
      <li>route matching</li>
      <li>object pooling</li>
    </ul>
  </div>

  <div className="pt-10 border-t border-slate-800 text-slate-400 leading-relaxed">
  Hypernode is not a helper library.
  <br /><br />
  It is the execution core of CoreCDTL.
  <br />
  Parsing, pooling and memory discipline live here.
</div>
</section>

    )
}