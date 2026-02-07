
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const DesignInternals: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative justify-items-center">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="max-w-5xl space-y-24">
        <section className="space-y-6">
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
            Design & <span className="text-cyan-500 animate-pulse-cyan">Internals</span>
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl border-l-4 border-cyan-500 pl-8 italic">
            CoreCDTL is not built around abstractions.  
            It is built around execution paths.
          </p>

          <p className="text-slate-500 max-w-3xl leading-relaxed">
            Every subsystem — networking, parsing, routing, memory, and execution — is designed
            to eliminate variability under sustained API workloads.
          </p>
        </section>

        <section className="space-y-10 relative">
          <div className="absolute -left-20 top-0 text-[100px] font-black text-white/5 select-none pointer-events-none uppercase">01</div>
          <div className="flex items-end justify-between border-b border-slate-800 pb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Layered Execution Model
            </h2>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Module: CPool</span>
          </div>
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
            <p>
              CoreCDTL processes requests through a strictly ordered execution pipeline.
              Each layer operates on pre-initialized structures, avoiding dynamic allocation
              and speculative execution paths.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-8 text-sm text-slate-400">
            <li>
              <strong className="text-white uppercase tracking-widest text-xs">Network Layer</strong><br />
              Direct socket ingestion with minimal buffering. No intermediate copies.
            </li>
            <li>
              <strong className="text-white uppercase tracking-widest text-xs">Header Parsing</strong><br />
              Custom DFA-based scanner. Zero regex. Deterministic state transitions.
            </li>
            <li>
              <strong className="text-white uppercase tracking-widest text-xs">Route Resolution</strong><br />
              Precompiled DFA / trie hybrid. Route count does not affect lookup cost.
            </li>
            <li>
              <strong className="text-white uppercase tracking-widest text-xs">API Context</strong><br />
              Optimized for low-byte payloads and fast response turnover.
            </li>
          </ul>
        </section>

        <section className="space-y-8 relative">
          <div className="absolute -left-20 top-0 text-[100px] font-black text-white/5 select-none pointer-events-none uppercase">02</div>
          <div className="flex items-end justify-between border-b border-slate-800 pb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Deterministic Parsing via DFA
            </h2>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Module: Parser</span>
          </div>
<div className="space-y-6 text-slate-400 leading-relaxed text-lg">
          <p>
            Both HTTP header parsing and route resolution are driven by deterministic
            finite automata (DFA). This eliminates backtracking, unpredictable branches,
            and runtime pattern matching.
          </p>
</div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-6 border border-slate-800 bg-[#020408]">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">
                Header Scanner
              </h4>
              <p className="text-slate-500 text-sm">
                Incoming bytes are processed through a state machine that recognizes
                headers in a single forward pass, without allocations or string slicing.
              </p>
            </div>

            <div className="p-6 border border-slate-800 bg-[#020408]">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">
                Route Lookup
              </h4>
              <p className="text-slate-500 text-sm">
                Routes are compiled at startup into a DFA-backed structure.
                Matching cost depends only on path depth — not route count.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8 relative">
          <div className="absolute -left-20 top-0 text-[100px] font-black text-white/5 select-none pointer-events-none uppercase">03</div>
          <div className="flex items-end justify-between border-b border-slate-800 pb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              LLVM-Oriented Execution
            </h2>
          </div>
          
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
          <p>
            Internal execution paths are designed to remain friendly to LLVM-based
            optimizations. Hot paths avoid polymorphism and indirect branching,
            allowing predictable instruction layouts.
          </p>
          </div>

          <p className="text-slate-500 max-w-4xl">
            CoreCDTL operates primarily on pre-initialized progression objects.
            Instead of creating new objects per request, execution reuses
            pre-allocated structures to minimize allocator pressure.
          </p>
        </section>

        <section className="space-y-8 relative">
          <div className="absolute -left-20 top-0 text-[100px] font-black text-white/5 select-none pointer-events-none uppercase">04</div>
          <div className="flex items-end justify-between border-b border-slate-800 pb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              LLVM-Oriented Execution
            </h2>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Memory Discipline
          </h2>
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
          <p>
            CPool provides controlled object reuse with strict attention to memory drift.
            Even during pool resizing, allocation patterns are kept stable to avoid
            long-term heap fragmentation.
          </p>
          </div>

          <p className="text-slate-500 max-w-4xl">
            This approach ensures consistent latency behavior over long-running API
            workloads, where allocator instability often becomes the dominant bottleneck.
          </p>
        </section>

        <section className="space-y-8 relative">
          <div className="absolute -left-20 top-0 text-[100px] font-black text-white/5 select-none pointer-events-none uppercase">05</div>
          <div className="flex items-end justify-between border-b border-slate-800 pb-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              API-Oriented Throughput
            </h2>
          </div>
          
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
            <p className="text-slate-400 text-lg max-w-4xl">
              CoreCDTL intentionally avoids chasing maximum raw throughput numbers.
              Instead, the engine is optimized for fast turnover of small payloads,
              which dominates real-world API traffic.
            </p>
          </div>

          <p className="text-slate-500 max-w-4xl">
            By keeping per-request byte volume low and execution paths short,
            the system maintains stable tail latency even under sustained concurrency.
          </p>
        </section>


        {/* Aggressive Visual Footer */}
        <section className="py-32 text-center relative border-t border-slate-800">
           <div className="max-w-xl mx-auto space-y-12 relative z-10">
              <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
                 <div className="absolute inset-0 border-2 border-cyan-500 rotate-45 animate-pulse-cyan"></div>
                 <div className="w-16 h-16 bg-cyan-500/20 flex items-center justify-center transform rotate-45">
                    <div className="w-6 h-6 bg-cyan-500"></div>
                 </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em]">Absolute Control</h2>
                <p className="text-slate-500 text-lg italic font-light">
                  "Precision isn't an accident. It's the byproduct of aggressive removal of the unnecessary."
                </p>
              </div>
           </div>
           {/* Decorative Background Photo */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] -z-10 opacity-5 grayscale pointer-events-none">
              <img src="assets/hero_bg.png" alt="Lynx" className="w-full h-full object-cover" />
           </div>
        </section>
      </div>
    </div>
  );
};

export default DesignInternals;
