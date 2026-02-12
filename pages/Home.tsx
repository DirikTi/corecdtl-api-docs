import React from "react";
import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";

const QUICK_START_CODE = `import { hypernode } from "corecdtl/runtime";

const { CPool } = hypernode;

// Initialize a high-performance object pool
const pool = new CPool();
pool.initializePool(1024);

// Allocate and release objects deterministically
const obj = pool.allocate();

if (obj !== null) {
  // ... use object
  pool.free(obj.id);
}
`;

const PERFORMANCE_CODE = `import { createServer, Factory } from "corecdtl";
const root = Factory.createRoute("/api/v1");

const apiEngine = createServer({
  timeout: 10_000,
  untilEnd: false
}).Api(root);

apiEngine.listen(8080);`;

const Home: React.FC = () => {
  return (
    <div className="relative pt-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Lynx Imagery */}
        <div className="absolute inset-0 z-0">
          <img
            src="assets/hero_bg.png"
            alt="Lynx Stare"
            className="w-full h-full object-cover opacity-50 grayscale contrast-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070C] via-[#05070C]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070C] via-transparent to-[#05070C]"></div>
          <div className="scanline opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                  CoreCDTL HTTP Engine v0.9.0
                </div>
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-none">
                  Core
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    CDTL
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl text-slate-300 font-light max-w-xl leading-snug border-l-4 border-cyan-500/50 pl-8">
                  A{" "}
                  <span className="text-cyan-400 font-bold uppercase italic animate-pulse-cyan">
                    Low-Level
                  </span>{" "}
                  HTTP Engine for Systems That Cannot Afford Latency.
                </p>
                <p className="text-slate-500 max-w-lg leading-relaxed text-lg">
                  Engineered for high-frequency trading, real-time telemetry,
                  and large-scale distributed systems. Deterministic latency,
                  zero-overhead parsing, and uncompromising throughput.
                </p>
              </div>

              <div className="flex flex-wrap gap-8">
                <Link
                  to="/docs"
                  className="group relative px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-widest transition-all overflow-hidden flex items-center gap-3"
                >
                  <span className="relative z-10 uppercase tracking-[0.2em]">
                    Initialize
                  </span>
                  <svg
                    className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-700"></div>
                </Link>
                <Link
                  to="/benchmarks"
                  className="px-12 py-5 border-2 border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-bold uppercase tracking-widest transition-all bg-slate-900/40 backdrop-blur-md"
                >
                  Benchmark
                </Link>
              </div>
            </div>

            <div className="relative group">
              {/*<div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>*/}
              <CodeBlock code={PERFORMANCE_CODE} title="core/engine.cpp" />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK START SECTION */}
      <section className="py-32 bg-[#020408] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full">
          <img
            src="assets/lynx_running.png"
            alt="Lynx Running"
            className="w-full h-full object-cover grayscale opacity-20 contrast-125 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#05070C]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <CodeBlock
                code={QUICK_START_CODE}
                title="examples/quickstart.js"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-cyan-500/20 border border-cyan-500/40">
                  <svg
                    className="w-6 h-6 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="square"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.5em]">
                  EXECUTION CORE
                </h2>
              </div>
              <h3 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
                THE ENGINE INSIDE THE{" "}
                <span className="text-cyan-500">ENGINE.</span>
              </h3>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  HyperNode is the execution layer where CoreCDTL gains its
                  advantage. This is where memory, scheduling, and object
                  lifecycles are engineered for extreme throughput and
                  deterministic latency.
                </p>
                <p className="font-bold text-slate-200 border-l-2 border-cyan-500 pl-4 py-1 bg-cyan-500/5">
                  "Most performance is not lost in networking — it is lost in
                  memory and scheduling. HyperNode exists to eliminate that
                  loss."
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    HYPERNODE OVERVIEW
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0zM9.3 17.7a1 1 0 0 0 0-1.4l-1.6-1.6 1.6-1.6a1 1 0 0 0-1.4-1.4l-3 3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0zM10.3 5.1a1 1 0 0 0-1.2.7l-4 12a1 1 0 0 0 .7 1.2 1 1 0 0 0 1.2-.7l4-12a1 1 0 0 0-.7-1.2z" />
                    </svg>
                    RUNTIME API
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREDATORY NATURE SECTION */}
      <section className="py-40 border-y border-slate-800/50 bg-[#05070C] relative">
        <div className="absolute top-0 right-0 w-[40%] h-full">
          <img
            src="assets/lynx_roar.png"
            alt="Lynx Running"
            className="w-full h-full object-cover grayscale opacity-20 contrast-125 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#05070C]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.5em]">
                The Predator's Edge
              </h2>
              <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                Total Hardware <span className="text-cyan-500">Dominance</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Unified Execution Context",
                  desc: "Each request is executed inside a fully isolated runtime context shared across API and Web layers. State, timers, and lifecycle are managed deterministically without global locks.",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.726 2.179a2 2 0 01-2.665 1.185l-1.127-.564a2 2 0 00-2.316.353l-1.55 1.55a2 2 0 01-3.216-1.01l-.25-1.25a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.726 2.179a2 2 0 01-2.665 1.185l-1.127-.564a2 2 0 00-2.316.353l-1.55 1.55a2 2 0 01-3.216-1.01l-.25-1.25z"
                      />
                    </svg>
                  ),
                  title: "DFA-Driven Routing & Header Scanners",
                  desc: "Routes and headers are resolved by dynamic deterministic automata. No regex backtracking, no linear scans — just constant-time state transitions at wire speed.",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: "Custom Accumulators",
                  desc: "Build your own accumulation strategies for streaming, buffering, and protocol state. Plug custom allocators and parsers directly into the execution core without touching the engine.",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M4 7v10c0 2.21 4.477 4 10 4s10-1.79 10-4V7M4 7c0 2.21 4.477 4 10 4s10-1.79 10-4M4 7c0-2.21 4.477-4 10-4s10 1.79 10 4m0 5c0 2.21-4.477 4-10 4s-10-1.79-10-4"
                      />
                    </svg>
                  ),
                  title: "Deterministic Middleware Pipeline",
                  desc: "Define exactly which middleware stages execute and in what order. The pipeline is compiled into the hot path to eliminate dynamic dispatch and scheduling overhead.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-3 group border-l-2 border-slate-800 hover:border-cyan-500 pl-6 transition-all relative"
                >
                  <div className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors mb-2">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-bold uppercase text-sm tracking-widest group-hover:text-cyan-400">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            {/*
            <div className="pt-8 relative group">
               <img 
                src="assets/lynx_running.png" 
                alt="Lynx Eyes" 
                className="w-full h-64 object-cover border border-slate-800 grayscale group-hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 border-2 border-cyan-400 animate-ping"></div>
               </div>
               <div className="mt-4 text-[10px] font-bold text-slate-700 uppercase tracking-[0.5em]">Vision System Active / Precision Lock</div>
            </div>
*/}
          </div>
        </div>
      </section>

      {/* RFC SECTION */}
      <section className="py-40 bg-[#020408] relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <div className="w-12 h-[2px] bg-cyan-500"></div>
            <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.5em]">
              RFC-Strict HTTP Parsing
            </h2>
            <h3 className="text-5xl font-black text-white uppercase italic leading-none">
              Protocol Correctness,
              <span className="text-cyan-500"> Enforced at Wire Speed</span>
            </h3>
            <p className="max-w-3xl text-slate-400 text-lg leading-relaxed mt-6">
              CoreCDTL implements a strictly validated HTTP/1.1 parser built on
              deterministic finite automata. Every byte is validated against the
              RFC grammar. Ambiguity is treated as a protocol violation — not a
              recoverable condition.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Parsing */}
            <div className="space-y-4 border-l-2 border-slate-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                Deterministic Parsing
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Request lines, headers, and framing are parsed using DFA-based
                state machines. Malformed syntax, invalid tokens, and incomplete
                frames are rejected immediately.
              </p>
            </div>

            {/* Headers */}
            <div className="space-y-4 border-l-2 border-slate-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                Header Integrity
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Duplicate single-instance headers, invalid header names, control
                characters, and obsolete line folding are explicitly forbidden
                per RFC specifications.
              </p>
            </div>

            {/* Content-Length */}
            <div className="space-y-4 border-l-2 border-slate-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                Content-Length Semantics
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Conflicting, negative, or malformed Content-Length values are
                detected at parse time. Only a single, valid body framing
                strategy is permitted.
              </p>
            </div>

            {/* Smuggling */}
            <div className="space-y-4 border-l-2 border-slate-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                Smuggling Defense
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Ambiguous framing such as Content-Length combined with
                Transfer-Encoding is rejected by design, closing classic request
                smuggling vectors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
