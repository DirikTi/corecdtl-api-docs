import CodeBlock from "@/components/CodeBlock";
import { Arrow, Stage } from "@/components/Stage";
import React from 'react';

export function ContextOverview({ setActiveId }: any) {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Context Overview
        </h1>
        <p className="text-slate-400 leading-relaxed">
          A <strong>Context</strong> represents the execution environment of an
          HTTP server in CoreCDTL. It owns the socket lifecycle, request
          parsing, routing decisions, and the execution pipeline that produces
          responses.
        </p>
      </div>

      {/* Big picture */}
      <div className="space-y-6">
  <h2 className="text-xl font-semibold text-slate-200">
    What Is a Context?
  </h2>

  <p className="text-slate-400 leading-relaxed">
    A Context is the <strong className="text-slate-200">entire runtime engine</strong>.
    It owns the server, sockets, routing tree and execution pipeline.
    Nothing runs outside of it.
  </p>

  {/* Runtime Boundary */}
  <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 space-y-5">

    <div className="text-indigo-300 text-xs font-semibold tracking-wider">
      CONTEXT (Runtime Owner)
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">

      {[
        "Socket Lifecycle",
        "HTTP Parsing",
        "Router Tree",
        "Pipeline",
        "Chunk Progression Pool",
        "Response Pool"
      ].map(item => (
        <div
          key={item}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-[#0B0F17] text-slate-300 text-center"
        >
          {item}
        </div>
      ))}
    </div>
  </div>

  <p className="text-xs text-slate-500">
    Sockets are created and managed by the Context itself — they do not exist independently.
  </p>
</div>


      {/* Base Context */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          HttpContext (Base Layer)
        </h2>

        <p className="text-slate-400 leading-relaxed">
          All contexts extend from <code>HttpContext</code>, which provides the
          shared HTTP engine and lifecycle management.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Socket acceptance and lifecycle</li>
          <li>ChunkProgression and pool management</li>
          <li>HTTP header and body parsing</li>
          <li>Route → Endpoint → Middleware pipeline binding</li>
          <li>Error response handling</li>
        </ul>

        <p className="text-slate-400 leading-relaxed">
          Think of <code>HttpContext</code> as the{" "}
          <strong>HTTP runtime core</strong>, while specialized contexts define
          behavior.
        </p>
      </div>

      {/* Context Types */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200">Context Types</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-300">ApiContext</h3>

          <p className="text-slate-400 leading-relaxed">
            <code>ApiContext</code> is optimized for high-throughput,
            low-latency API workloads.
          </p>

          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>Pure dynamic routing</li>
            <li>Accumulator-based request processing</li>
            <li>Strict HTTP validation</li>
            <li>No static assets or SPA handling</li>
          </ul>

          <p className="text-slate-400 leading-relaxed">
            This context is ideal for JSON APIs, internal services, and
            performance-critical backends.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-300">WebContext</h3>

          <p className="text-slate-400 leading-relaxed">
            <code>WebContext</code> extends the API runtime with
            <strong>static asset and SPA support</strong>.
          </p>

          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>
              Static asset routing (<code>/public/*</code>)
            </li>
            <li>In-memory asset caching</li>
            <li>Fingerprint-aware cache control</li>
            <li>SPA fallback routing</li>
            <li>Dynamic routes via pipeline</li>
          </ul>

          <p className="text-slate-400 leading-relaxed">
            WebContext enables running a full web server (static + API + SPA)
            inside a single CoreCDTL runtime.
          </p>
        </div>
      </div>

      {/* Request flow */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Request Flow</h2>

        <p className="text-slate-400 leading-relaxed">
          Both contexts follow the same core parsing flow, but diverge after
          route resolution.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
        <h3 className="text-slate-200 font-semibold mb-4">
          Context-Request Flow
        </h3>
      
        <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">
      
          <Stage label="Socket Accept" subtle />
          <Arrow />
      
          <Stage label="parseInitial" />
          <Arrow />
      
          <Stage label="Route Resolution" />
          <Arrow />
      
          <Stage label="Context-specific Dispatch" highlight />
          <Arrow />
      
          <Stage label="Pipeline / Static / SPA" />
          <Arrow />

          <Stage label="Response" />

        </div>
      </div>

      {/* Shared runtime */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Shared Runtime Tables
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext and WebContext share the same
          <button
            className="ml-2 text-cyan-400 hover:underline"
            onClick={() => setActiveId("content-encoding")}
          >
            parsing and encoding tables
          </button>
          , ensuring consistent behavior across runtimes.
        </p>
      </div>

      {/* Comparison */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200">
          ApiContext vs WebContext
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Both contexts share the same HTTP core. The difference is the feature
          layer enabled on top of the pipeline.
        </p>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B0F14]">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4 text-cyan-400">ApiContext</th>
                <th className="px-6 py-4 text-indigo-400">WebContext</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">Dynamic routing</td>
                <td className="px-6 py-4">✓</td>
                <td className="px-6 py-4">✓</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">
                  Middleware pipeline
                </td>
                <td className="px-6 py-4">✓</td>
                <td className="px-6 py-4">✓</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">Static assets</td>
                <td className="px-6 py-4 text-red-400">—</td>
                <td className="px-6 py-4 text-emerald-400">✓</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">SPA fallback</td>
                <td className="px-6 py-4 text-red-400">—</td>
                <td className="px-6 py-4 text-emerald-400">✓</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">Asset caching</td>
                <td className="px-6 py-4 text-red-400">—</td>
                <td className="px-6 py-4 text-emerald-400">✓</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">Runtime overhead</td>
                <td className="px-6 py-4 text-emerald-400">Lowest</td>
                <td className="px-6 py-4 text-amber-400">Slightly higher</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-4 text-slate-400">Primary use case</td>
                <td className="px-6 py-4">REST / RPC APIs</td>
                <td className="px-6 py-4">Web apps + APIs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="pt-10 border-t border-slate-800 space-y-3">
        <p className="text-slate-400 leading-relaxed">
          In summary, Contexts in CoreCDTL:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Define the HTTP execution environment</li>
          <li>Control socket, parsing, and routing behavior</li>
          <li>Separate API and Web concerns cleanly</li>
          <li>Share a common high-performance core</li>
        </ul>
      </div>
    </section>
  );
}
