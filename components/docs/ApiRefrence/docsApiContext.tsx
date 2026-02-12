import CodeBlock from "@/components/CodeBlock";
import { Arrow, Stage } from "@/components/Stage";

export function DocApiContext() {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          ApiContext
        </h1>
        <p className="text-slate-400 leading-relaxed">
          <strong>ApiContext</strong> is the core execution environment for
          high-performance API servers in CoreCDTL. It is designed for
          <strong> low-latency, high-throughput, and predictable behavior</strong>
          under sustained load.
        </p>
      </div>

      {/* Purpose */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Purpose & Design Goals
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Minimize allocations during request processing</li>
          <li>Avoid intermediate abstractions</li>
          <li>Keep parsing and routing deterministic</li>
          <li>Optimize for API-style workloads (small payloads, fast responses)</li>
        </ul>

        <p className="text-slate-400 leading-relaxed">
          ApiContext deliberately excludes features like static assets or SPA
          routing to keep the runtime focused and efficient.
        </p>
      </div>

      {/* Construction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Creating an ApiContext
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext is created via <code>createServer()</code> and initialized
          with optional <code>ServerOptions</code>.
        </p>

        <CodeBlock
          title="create-api-context"
          code={`import { createServer } from "corecdtl";
            
const server = createServer({
  maxHeaderSize: 4096,
  maxRequests: 8000
});

const api = server.Api(mainRoute);`}
        />
      </div>

      {/* Socket lifecycle */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Socket Lifecycle
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext binds directly to a Node.js <code>net.Server</code> and
          operates on raw TCP sockets.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
                <h3 className="text-slate-200 font-semibold mb-4">
                  Context-Request Flow
                </h3>
              
                <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">
              
                  <Stage label="Socket Accept" subtle />
                  <Arrow />
              
                  <Stage label="ChunkProgression allocation" />
                  <Arrow />
              
                  <Stage label="parseInitial" />
                  <Arrow />
              
                  <Stage label="pipeline" />
                  <Arrow />
              
                  <Stage label="response" />
                  <Arrow />
        
                  <Stage label="socket close/alive" />
                  <Arrow />
        
                  <Stage label="ChunkProgression free" />
        
                </div>
              </div>

        <p className="text-slate-400 leading-relaxed">
          If no <code>ChunkProgression</code> is available from the pool,
          the connection is immediately rejected to protect system stability.
        </p>
      </div>

      {/* Parsing */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          HTTP Parsing Strategy
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext uses a <strong>DFA-based HTTP scanner</strong> for parsing
          request lines and headers.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Route matching occurs during the first scan</li>
          <li>Header limits are enforced incrementally</li>
          <li>Invalid states fail fast</li>
        </ul>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
  <h3 className="text-slate-200 font-semibold mb-4">
    API-PARSE-FLOW
  </h3>

  <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">

    <Stage label="parseInitial" />
    <Arrow />

    <Stage label="Scanner Router" />
    <Arrow />

    <Stage label="Route Pipe Selection" />
    <Arrow />

    <Stage label="Validate Headers" />
    <Arrow />

    <Stage label="accumulateHandler" />

  </div>
</div>

      {/* ChunkProgression */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          ChunkProgression & Pooling
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Each request is processed using a reusable
          <code>ChunkProgression</code> object allocated from a pool.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>No per-request object creation</li>
          <li>State machine lives inside the progression</li>
          <li>Buffers are reused across requests</li>
        </ul>

        <p className="text-slate-400 leading-relaxed">
          This approach significantly reduces GC pressure under load.
        </p>
      </div>

      {/* Accumulator */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Accumulator-Based Processing
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext uses accumulators to process request bodies without
          buffering unnecessary data. This enables efficient handling of streamed or chunked payloads
          without copying data.
        </p>
      </div>

      {/* Error handling */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Error Handling Philosophy
        </h2>

        <p className="text-slate-400 leading-relaxed">
          ApiContext follows a strict, deterministic error model.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Errors are detected as early as possible</li>
          <li>Standard HTTP responses are prebuilt</li>
          <li>Invalid requests terminate the socket immediately</li>
        </ul>
      </div>

      {/* When to use */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          When to Use ApiContext
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Internal microservices</li>
          <li>Public JSON APIs</li>
          <li>Latency-sensitive backends</li>
          <li>High connection concurrency scenarios</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="pt-10 border-t border-slate-800 space-y-3">
        <p className="text-slate-400 leading-relaxed">
          In summary, ApiContext:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Is optimized for API workloads</li>
          <li>Uses pooled state machines for requests</li>
          <li>Minimizes memory churn</li>
          <li>Provides deterministic, high-performance behavior</li>
        </ul>
      </div>
    </section>
  );
}
