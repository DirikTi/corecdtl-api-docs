import CodeBlock from "@/components/CodeBlock";
import { Arrow, Stage } from "@/components/Stage";

export function DocContent() {
    return (

<section className="space-y-14">
  {/* Title */}
  <div className="space-y-4">
    <h1 className="text-2xl font-semibold text-slate-200">
      Content Encoding & Parser
    </h1>

    <p className="text-slate-400 leading-relaxed">
      CoreCDTL does not decide body parsing using <code>if / else</code> chains
      or string comparisons at runtime.
    </p>

    <p className="text-slate-400 leading-relaxed">
      Instead, it uses <strong>direct lookup tables</strong>.
      The request headers map directly to parser functions with
      constant-time dispatch.
    </p>
  </div>

  {/* How it works */}
  <div className="space-y-6">
  <h2 className="text-lg font-semibold text-slate-200">How It Works</h2>

  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 space-y-6">

    {/* Content-Type flow */}
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wider text-indigo-300">
        Content-Type Dispatch
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Stage label="Content-Type Header" />
        <span className="text-slate-600">-</span>
        <Stage label="Parser Table" />
        <span className="text-slate-600">-</span>
        <Stage label="Body Parser Fn" highlight />
      </div>
    </div>

    {/* Content-Encoding flow */}
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wider text-indigo-300">
        Content-Encoding Dispatch
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Stage label="Encoding Header" />
        <span className="text-slate-600">-</span>
        <Stage label="Decoder Table" />
        <span className="text-slate-600">-</span>
        <Stage label="Decompressor Fn" highlight />
      </div>
    </div>
  </div>

  <p className="text-slate-400 leading-relaxed">
    No branching. No runtime type checks.  
    Just <span className="text-indigo-300 font-medium">table lookup → direct function call</span>.
  </p>
</div>


  {/* Default tables */}
  <div className="space-y-10">
  <h2 className="text-xl font-semibold text-slate-200">
    Default Parsers & Encodings
  </h2>

  <p className="text-slate-400 leading-relaxed">
    CoreCDTL ships with built-in content type parsers and compression handlers.
    These work out of the box — no configuration required.
  </p>

  {/* ============================== */}
  {/* Content Types */}
  {/* ============================== */}

  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-slate-300">
      Content Types
    </h3>

    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B0F14]">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Type</th>
            <th className="px-6 py-4 text-left">MIME</th>
            <th className="px-6 py-4 text-left">Behavior</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 text-slate-300">

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">JSON</td>
            <td className="px-6 py-4 font-mono text-cyan-400">application/json</td>
            <td className="px-6 py-4">Automatically parsed into objects</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">Form URL Encoded</td>
            <td className="px-6 py-4 font-mono text-cyan-400">application/x-www-form-urlencoded</td>
            <td className="px-6 py-4">Key-value body parsing</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">Multipart</td>
            <td className="px-6 py-4 font-mono text-cyan-400">multipart/form-data</td>
            <td className="px-6 py-4">File & form streaming support</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">Text</td>
            <td className="px-6 py-4 font-mono text-cyan-400">text/plain</td>
            <td className="px-6 py-4">Raw string body</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">HTML / CSS / JS</td>
            <td className="px-6 py-4 font-mono text-cyan-400">text/html • text/css • application/javascript</td>
            <td className="px-6 py-4">Served as static or raw content</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">Binary</td>
            <td className="px-6 py-4 font-mono text-cyan-400">application/octet-stream</td>
            <td className="px-6 py-4">Buffer passthrough</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4">XML</td>
            <td className="px-6 py-4 font-mono text-cyan-400">application/xml</td>
            <td className="px-6 py-4">Raw text or custom parser</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

  {/* ============================== */}
  {/* Content Encodings */}
  {/* ============================== */}

  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-slate-300">
      Content Encodings
    </h3>

    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B0F14]">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Encoding</th>
            <th className="px-6 py-4 text-left">Description</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 text-slate-300">

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4 font-mono text-indigo-400">gzip</td>
            <td className="px-6 py-4">Standard compression (widely supported)</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4 font-mono text-indigo-400">br</td>
            <td className="px-6 py-4">Brotli compression (smaller payloads)</td>
          </tr>

          <tr className="hover:bg-slate-900/40">
            <td className="px-6 py-4 font-mono text-indigo-400">deflate</td>
            <td className="px-6 py-4">Legacy compression support</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</div>


  {/* Explanation */}
  <div className="space-y-4 text-slate-400 leading-relaxed">
    <p>
      When headers are parsed, CoreCDTL directly resolves these values and jumps
      to the corresponding parser/decoder.
    </p>
  </div>

  {/* Overriding */}
  <div className="space-y-6">
    <h2 className="text-lg font-semibold text-slate-200">
      Overriding Parsers (Global)
    </h2>

    <p className="text-slate-400 leading-relaxed">
      These tables are <strong>global</strong>.
      You can override them during server bootstrap and inject your own
      implementations.
    </p>

    <CodeBlock
      title="override-example"
      code={`import { ContentTypeTables } from "corecdtl";

// replace default JSON parser
ContentTypeTables["application/json"]= JSON.parse;`}
    />

    <p className="text-slate-400 leading-relaxed">
      From that point forward, every request automatically uses your functions.
      No runtime cost. No additional allocations.
    </p>
  </div>

  {/* Use cases */}
  <div className="space-y-6">
    <h2 className="text-lg font-semibold text-slate-200">
      Common Use Cases
    </h2>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>Custom JSON parser (faster or schema-based)</li>
      <li>Binary protocol parsing</li>
      <li>Protobuf / MessagePack support</li>
      <li>Custom compression formats</li>
      <li>Streaming transforms</li>
    </ul>
  </div>

  {/* Warning */}
  <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-5 text-amber-300">
    <strong>Warning — Global Behavior</strong>
    <br /><br />
    These tables affect the entire server.
    Overriding them changes parsing for every request.
    Make sure your implementation:
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>is stateless or pooled</li>
      <li>handles backpressure correctly</li>
      <li>does not allocate per chunk</li>
      <li>is safe under concurrency</li>
    </ul>
  </div>

  {/* Closing */}
  <div className="pt-8 border-t border-slate-800 text-slate-400 leading-relaxed">
    <strong>In short:</strong><br />
    CoreCDTL doesn’t parse by logic.<br />
    It parses by tables.
    <br /><br />
    Swap the table → swap the engine behavior.
  </div>
</section>

    )
}