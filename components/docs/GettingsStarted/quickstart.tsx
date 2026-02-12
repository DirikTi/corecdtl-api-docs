import CodeBlock from "@/components/CodeBlock";

export function Quickstart() {
    return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
        Quick Start
      </h1>

      <p className="text-slate-400 max-w-3xl">
        This example demonstrates a minimal HTTP server built using CoreCDTL.
        No middleware layers, no abstractions — just execution.
      </p>

      <CodeBlock
        language="javascript"
        title="server.js"
        code={`import { createServer, Factory } from 'corecdtl';
const root = Factory.createRoute("/api/v1");

const api = createServer({
    timeout: 10_000,
    untilEnd: false
}).Api(root);

api.listen(port);`}
      />

      <div className="p-6 border border-slate-800 bg-slate-900/20">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
          What Happens Internally
        </h3>
        <p className="text-sm text-slate-400">
          Routes are compiled at startup, requests are parsed via DFA scanners,
          and execution operates on reused context objects to minimize runtime cost.
        </p>
      </div>
    </div>
  );

}