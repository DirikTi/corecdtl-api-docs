export function FuturePlans() {
  return (
    <section className="space-y-14">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Future Plans</h2>

        <p className="text-slate-400 leading-relaxed">
          CoreCDTL continuously evolves toward lower latency, fewer allocations
          and deeper native integration. The goal is simple:
        </p>

        <p className="text-slate-300 font-medium">
          Push the boundary between JavaScript ergonomics and native performance
          as far as possible.
        </p>
      </div>

      {/* Roadmap list */}
      <div className="space-y-12">
        {/* Native expansion */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400">
            Deeper Native Offloading
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Move more hot-path logic from JavaScript into Hypernode (C++) to
            reduce JS ↔ native boundary crossings.
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>Header parsing optimizations</li>
            <li>Route scanning improvements</li>
            <li>Buffer slicing without JS overhead</li>
            <li>More work executed inside HttpCore</li>
          </ul>
        </div>

        {/* Memory */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400">
            Smarter Memory & Pooling
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Reduce garbage collection pressure even further by extending pooling
            strategies across more internal structures.
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>Extended CPool coverage</li>
            <li>Reusable parser buffers</li>
            <li>Pre-allocated response objects</li>
            <li>Zero-allocation request lifecycle targets</li>
          </ul>
        </div>

        {/* Streaming */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400">
            Advanced Streaming & Backpressure
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Improve streaming workflows and give developers finer control over
            socket backpressure and incremental processing.
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>Lower-level streaming APIs</li>
            <li>More customizable accumulators</li>
            <li>Incremental body processing pipelines</li>
            <li>Better flow control primitives</li>
          </ul>
        </div>

        {/* Native features */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400">
            Native Networking Capabilities
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Explore ways to expose more kernel-level capabilities through
            Hypernode while staying compatible with the Node runtime.
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>sendfile-style optimizations</li>
            <li>reduced copy strategies</li>
            <li>faster static asset serving</li>
            <li>lower syscall counts</li>
          </ul>
        </div>

        {/* DX */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400">
            Developer Experience
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Performance should not come at the cost of usability. CoreCDTL will
            continue to simplify APIs while keeping internals powerful.
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>Clearer diagnostics & metrics</li>
            <li>Better debugging tools</li>
            <li>More documentation deep dives</li>
            <li>Safer defaults with optional low-level escape hatches</li>
          </ul>
        </div>
      </div>

      {/* Vision footer */}
      <div className="pt-10 border-t border-slate-800 text-slate-400 leading-relaxed">
        CoreCDTL is not trying to replace fully-native servers.
        <br />
        <br />
        Instead, it aims to deliver{" "}
        <span className="text-slate-200 font-medium">
          “near-native performance with JavaScript productivity”
        </span>
        .
        <br />
        <br />
        Every release moves the runtime closer to that balance — fewer copies,
        fewer allocations, tighter loops, and smarter native integration.
      </div>
    </section>
  );
}
