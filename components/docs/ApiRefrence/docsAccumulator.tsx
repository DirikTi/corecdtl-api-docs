import CodeBlock from "@/components/CodeBlock";
import { OptionRow } from "@/components/OptionRow";
import { Arrow, Stage } from "@/components/Stage";

const introCode = `const accumulateJSON: CoreCDTL.AccumulateHandleFn = (socket, p) => {
    const 
}`;

export function DocAccumulator() {
  return (
    <section className="space-y-16">
      {/* Advanced warning */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-amber-400">
          Advanced Usage — Read Before Proceeding
        </h2>

        <p className="text-slate-300 leading-relaxed">
          This section is intended for developers who{" "}
          <strong> fully understand</strong>
          socket-level I/O, backpressure, and HTTP request lifecycles.
        </p>

        <p className="text-slate-400 leading-relaxed">
          If you are a junior developer, or if you are unsure how to safely
          manage
          <code className="mx-1">net.Socket</code>, flow control, and streaming
          parsers, you should <strong>not</strong> use accumulators.
        </p>

        <p className="text-slate-400 leading-relaxed">
          Used correctly, accumulators allow you to unlock the true performance
          potential of the system. Used incorrectly, they can stall sockets,
          corrupt request state, or destabilize the server.
        </p>

        <p className="text-slate-300 font-medium">
          With great control comes great responsibility.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Accumulator — Deep Dive
        </h1>
        <p className="text-slate-400 leading-relaxed">
          Accumulator is a{" "}
          <strong>low-level, socket-driven request body controller</strong>.
          When you define an accumulator, you are explicitly opting out of
          CoreCDTL’s safety rails and taking responsibility for backpressure,
          flow control, and parser coordination.
        </p>
      </div>

      {/* Philosophy */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Design Philosophy
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Accumulators exist for cases where abstraction becomes a bottleneck.
          They expose the raw <code>net.Socket</code> and the internal parsing
          state so that endpoints can implement streaming, tunneling, or
          protocol-like behavior.
        </p>

        <p className="text-slate-400 leading-relaxed">
          This is a <strong>power-user feature</strong>. If you don’t need it,
          you should not use it.
        </p>
      </div>

      {/* Responsibility warning */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-red-400">
          Responsibility Warning
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Backpressure management is your responsibility</li>
          <li>You must pause and resume the socket correctly</li>
          <li>You must enforce content size limits manually</li>
          <li>
            You must coordinate with <code>ChunkParser</code> correctly
          </li>
          <li>Incorrect handling can stall or corrupt the connection</li>
        </ul>
      </div>

      {/* When does accumulator start */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200">
          When Does an Accumulator Start?
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Accumulators are{" "}
          <strong>not active from the beginning of the connection</strong>.
          CoreCDTL first completes routing and header parsing before body
          accumulation begins.
        </p>

        <p className="text-slate-400 leading-relaxed">
          In other words, an accumulator only runs{" "}
          <strong>after the request is fully identified</strong>. Until that
          point, the engine is still in parsing mode.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
          <h3 className="text-slate-200 font-semibold mb-4">
            Request Lifecycle
          </h3>
        
          <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">
        
            <Stage label="Socket accept" subtle />
            <Arrow />
        
            <Stage label="ChunkProgression allocated (from pool)" subtle />
            <Arrow />
        
            <Stage label="Request line parse" subtle />
            <Arrow />
        
            <Stage label="Route match" subtle />
            <Arrow />
        
            <Stage label="Accumulator starts <-- This is your PRO accumulate" highlight />
            <Arrow />
        
            <Stage label="Socket end free (from pool)" />
        
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed">The important rule is:</p>

        <div className="rounded-md border border-slate-800 bg-slate-900/60 p-4 text-slate-300">
          Accumulators never run before <strong>route resolution</strong> and
          <strong> header parsing</strong> are complete.
        </div>
      </div>

      {/* ChunkProgression mindset */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200">
          ChunkProgression Mindset
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Once routing and header parsing are complete, CoreCDTL hands control to the
          <strong> accumulator layer</strong>.
        </p>

        <p className="text-slate-400 leading-relaxed">
          At this point you no longer deal with routing or parsing logic —
          you directly operate on a <code>ChunkProgression</code> object.
        </p>

        <div className="rounded-md border border-slate-800 bg-slate-900/60 p-4 text-slate-300">
          Think of <strong>ChunkProgression</strong> as your request state machine.
          Everything you need lives inside it.
        </div>
      </div>

      {/* Ownership rules */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-slate-200">
          Ownership Rules (Important)
        </h3>

        <p className="text-slate-400 leading-relaxed">
          <code>ChunkProgression</code> instances are managed by the engine.
          They are pooled and reused for performance.
        </p>

        <OptionRow
          name="allocate()"
          defaultValue="engine"
          desc="Allocated automatically when a socket is accepted."
          effect="You never create it manually."
        />

        <OptionRow
          name="free()"
          defaultValue="engine"
          desc="Returned to the pool when the socket closes."
          effect="Never call inside an accumulator."
        />

        <OptionRow
          name="reset()"
          defaultValue="allowed"
          desc="Clears internal state for next request on keep-alive connections."
          effect="Safe to call after sending a response."
        />

        <OptionRow
          name="allocateResp()"
          defaultValue="allowed"
          desc="Fetches a pooled response object."
          effect="Use when you need a custom response writer."
        />

        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4 text-amber-300">
          The engine owns lifecycle.  
          You only operate on state — never memory management.
        </div>
      </div>

      {/* Where is the data */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-200">
          Where Is The Request Data?
        </h3>

        <p className="text-slate-400 leading-relaxed">
          Accumulators must know where bytes live and how to read them.
        </p>

        <OptionRow
          name="rawBuf"
          defaultValue="Buffer"
          desc="Contains the raw request bytes (headers + possibly body)."
          effect="Primary source of truth."
        />

        <OptionRow
          name="mainOffset"
          defaultValue="number"
          desc="Byte offset where the body begins."
          effect="rawBuf.slice(mainOffset) gives you the body."
        />

        <OptionRow
          name="contentLen"
          defaultValue="optional"
          desc="Expected body length when Content-Length exists."
          effect="Used to know when accumulation is complete."
        />

        <OptionRow
          name="chunkParser"
          defaultValue="internal"
          desc="Helpers for fixed / streaming / until-end accumulation."
          effect="Use if you don’t want to reimplement parsing."
        />
      </div>

      {/* Parsing control */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-200">
          Controlling The Next Chunk
        </h3>

        <p className="text-slate-400 leading-relaxed">
          <code>fn</code> determines which function handles the next incoming chunk.
          This is how CoreCDTL switches between parsing stages. If you expect more data → set <code>fn</code> to your accumulator.  
          If you already have enough data → process immediately.
        </p>
      </div>

      {/* Responsibilities */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-200">
          Accumulator Responsibilities
        </h3>

        <p className="text-slate-400 leading-relaxed">
          When writing a custom accumulator, CoreCDTL stops making decisions for you.
          You are responsible for correctness and safety.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Manage backpressure (<code>pause()</code> / <code>resume()</code>)</li>
          <li>Respect <code>maxContentSize</code></li>
          <li>Validate body length</li>
          <li>Decide when body is complete</li>
          <li>Call route handler</li>
          <li>Write response manually</li>
          <li>Close or reuse socket correctly</li>
        </ul>

        <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-red-300">
          CoreCDTL will NOT protect you here.  
          Incorrect accumulator logic can leak memory or stall sockets.
        </div>
      </div>

      {/* Mental model */}
      <div className="pt-8 border-t border-slate-800 space-y-3">
        <CodeBlock
          title="accumulator-mental-model"
          code={`ChunkProgression = state
      rawBuf = bytes
      mainOffset = body start
      fn = next step

      Engine gives control
      You handle everything else`}
        />
      </div>

{/* ===================================================== */}
{/* Custom ChunkProgression & ChunkParser (Advanced) */}
{/* ===================================================== */}

<section className="space-y-14">
  {/* Title */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-200">
      Custom ChunkProgression & ChunkParser
    </h2>

    <p className="text-slate-400 leading-relaxed">
      If the built-in accumulators are not enough, you can go one level deeper
      and customize the <strong>request state object itself</strong>.
    </p>

    <p className="text-slate-400 leading-relaxed">
      CoreCDTL allows you to intercept the creation of every
      <code> ChunkProgression</code> instance and modify it before it enters the pool.
    </p>
  </div>

  {/* bootstrap option */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      bootstrapPoolChunkProgression
    </h3>

    <p className="text-slate-400 leading-relaxed">
      During server startup, CoreCDTL pre-allocates a pool of
      <code> ChunkProgression</code> objects.  
      You can hook into this phase using the following option:
    </p>

    <CodeBlock
      title="server-option"
      code={`createServer({
  bootstrapPoolChunkProgression: (p) => {
    // modify state before it enters pool
  }
})`}
    />

    <p className="text-slate-400 leading-relaxed">
      This function runs <strong>once per created object</strong>.
      After initialization, the object is stored in the pool and reused for the
      lifetime of the server.
    </p>
  </div>

  {/* What you can modify */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      What Can You Customize?
    </h3>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>Replace or extend <code>chunkParser</code></li>
      <li>Add custom fields to store request state</li>
      <li>Pre-allocate buffers</li>
      <li>Attach metrics / tracing data</li>
      <li>Swap parser strategies entirely</li>
    </ul>
  </div>

  {/* Default parser */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      Default ChunkParser
    </h3>

    <p className="text-slate-400 leading-relaxed">
      By default, every <code>ChunkProgression</code> contains three internal parsers:
    </p>

    <CodeBlock
      title="default-parser"
      code={`export interface ChunkParser {
  streaming: StreamingChunkedParser; // Transfer-Encoding: chunked
  fixed: FixedChunkedParser;         // Content-Length
  untilEnd: UntilEndChunkedParser;   // stream until socket end
}`}
    />

    <p className="text-slate-400 leading-relaxed">
      These are optimized, pooled and zero-allocation friendly.
      For most workloads, replacing them is unnecessary.
    </p>
  </div>

  {/* Example */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      Example: Custom Parser Injection
    </h3>

    <CodeBlock
      title="bootstrap-example"
      code={`createServer({
  bootstrapPoolChunkProgression(p) {
    p.chunkParser.fixed = new MyUltraFastParser();
    p.myCustomState = {};
  }
})`}
    />

    <p className="text-slate-400 leading-relaxed">
      Now every request automatically uses your custom implementation.
      No runtime allocation is required.
    </p>
  </div>

  {/* Warning */}
  <div className="rounded-md border border-red-500/30 bg-red-500/5 p-5 text-red-300">
    <strong>Warning — Engine Level Customization</strong>
    <br /><br />
    You are now modifying internal runtime behavior.
    Incorrect parser logic can:
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>corrupt request bodies</li>
      <li>break backpressure</li>
      <li>cause memory leaks</li>
      <li>stall sockets</li>
    </ul>
    Only override this if you fully understand the HTTP parsing lifecycle.
  </div>

  {/* Closing */}
  <div className="pt-8 border-t border-slate-800 text-slate-400 leading-relaxed">
    In short:
    <br />
    <strong>CoreCDTL gives you the entire runtime.</strong><br />
    You can use the defaults — or replace every layer.
  </div>
</section>


    </section>
  );
}
