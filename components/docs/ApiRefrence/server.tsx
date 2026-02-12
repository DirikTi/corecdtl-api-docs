import CodeBlock from "@/components/CodeBlock";
import { OptionRow } from "@/components/OptionRow";

export function DocServer({ setActiveId }: any) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
          createServer
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          <strong>createServer</strong> is the entry point of CoreCDTL. It wires
          the HTTP core, memory pools, parsers, and execution context into a
          single runtime instance.
        </p>
      </div>

      {/* Dual Context */}
      <div className="p-8 border border-slate-800 bg-slate-900/20 space-y-4">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
          Dual Runtime Model
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          A CoreCDTL server can operate in two distinct execution modes:
        </p>

        <ul className="space-y-3 text-sm text-slate-400">
          <li>
            <span className="text-cyan-500 font-bold">Web()</span> — Designed
            for browser-facing workloads. Includes additional safety checks and
            content-oriented defaults.
            <button
              onClick={() => setActiveId("context-web")}
              className="ml-2 text-cyan-400 hover:underline"
            >
              → Web Context
            </button>
          </li>
          <li>
            <span className="text-cyan-500 font-bold">Api()</span> — Optimized
            for machine-to-machine traffic. Prioritizes throughput stability and
            minimal allocations.
            <button
              onClick={() => setActiveId("context-api")}
              className="ml-2 text-cyan-400 hover:underline"
            >
              → API Context
            </button>
          </li>
        </ul>
      </div>

      {/* Code */}
      <CodeBlock
        title="createServer.ts"
        language="ts"
        code={`import { createServer } from "corecdtl";
          
createServer({
  maxHeaderSize: 4096,
  maxContentSize: 5 * 1024 * 1024,
  maxRequests: 8000,
  timeout: 3000,
  untilEnd: false
});`}
      />

      {/* Server Options */}
      <section className="space-y-10">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100">ServerOptions</h2>
          <p className="text-slate-400 leading-relaxed">
            ServerOptions define the hard boundaries of the CoreCDTL runtime.
            These values directly affect memory layout, parser behavior, and
            request flow. They are evaluated once during initialization and
            never mutated at runtime.
          </p>
        </section>
        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Networking & Runtime
          </h3>

          <div className="border border-slate-800 divide-y divide-slate-800 text-sm">
            <OptionRow
              name="netServerOptions"
              desc="Options forwarded to Node.js net.Server."
              defaultValue={"net.ServerOptions"}
              effect="Socket behavior, backlog, TCP tuning."
            />
            <OptionRow
              name="timeout"
              desc="Socket inactivity timeout in milliseconds."
              defaultValue="0 (disabled)"
              effect="Protects against stalled connections."
            />
            <OptionRow
              name="maxRequests"
              desc="Maximum number of concurrent requests."
              defaultValue="5000"
              effect="Defines internal pool and object reuse limits."
            />
          </div>
        </section>
        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Header & Query Parsing
          </h3>

          <div className="border border-slate-800 divide-y divide-slate-800 text-sm">
            <OptionRow
              name="maxHeaderSize"
              desc="Total allowed size of all HTTP headers."
              defaultValue="2048 bytes"
              effect="Caps parser memory and DFA state expansion."
            />
            <OptionRow
              name="maxHeaderNameSize"
              defaultValue={"512 bytes"}
              desc="Maximum length of a single header name."
              effect="Prevents pathological header abuse."
            />
            <OptionRow
              name="maxHeaderValueSize"
              defaultValue={"1024 bytes"}
              desc="Maximum length of a single header value."
              effect="Keeps header parsing cache-friendly."
            />
            <OptionRow
              name="requestQuerySize"
              desc="Maximum query string size."
              defaultValue="2048 bytes"
              effect="Limits URI parsing and allocation pressure."
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Request Body Handling
          </h3>

          <div className="border border-slate-800 divide-y divide-slate-800 text-sm">
            <OptionRow
              name="maxContentSize"
              desc="Maximum allowed request body size."
              defaultValue="3MB"
              effect="Prevents memory overcommit under load."
            />
            <OptionRow
              name="untilEnd"
              desc="Controls behavior when Content-Length / Transfer-Encoding is missing."
              defaultValue="false"
              effect="Strict HTTP compliance vs stream tolerance."
            />
          </div>
        </section>
        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Response Handling
          </h3>

          <div className="border border-slate-800 p-6 text-sm text-slate-400 space-y-2">
            <p>
              <strong>ResponseCtor</strong> allows injecting a custom response
              implementation.
            </p>
            <p className="opacity-70">
              This enables extending <code>PipeResponseBase</code> to introduce
              specialized serialization (JSON, binary, streaming) without
              additional abstraction layers.
            </p>
          </div>
        </section>
      </section>

      {/* Summary */}
      <div className="p-6 border-l-4 border-cyan-500 bg-cyan-500/5">
        <p className="text-sm text-slate-300 italic">
          createServer does not hide complexity — it exposes control. The engine
          assumes you know your workload and gives you the tools to shape it
          precisely.
        </p>
      </div>
    </div>
  );
}
