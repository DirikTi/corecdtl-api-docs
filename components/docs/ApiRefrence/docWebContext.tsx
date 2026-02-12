import CodeBlock from "@/components/CodeBlock";

export function DocWebContext() {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          WebContext
        </h1>
        <p className="text-slate-400 leading-relaxed">
          <strong>WebContext</strong> is a specialized execution environment
          designed for serving <strong>static assets, SPAs, and dynamic web routes</strong>
          with the same high-performance core used by ApiContext.
        </p>
      </div>

      {/* Philosophy */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Design Philosophy
        </h2>

        <p className="text-slate-400 leading-relaxed">
          WebContext extends the CoreCDTL runtime to handle browser-oriented
          workloads while preserving deterministic request handling.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Serve static files without middleware overhead</li>
          <li>Provide zero-runtime-cost SPA fallbacks</li>
          <li>Reuse the same HTTP core and parsing pipeline</li>
        </ul>
      </div>

      {/* Construction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Creating a WebContext
        </h2>

        <p className="text-slate-400 leading-relaxed">
          WebContext is created via <code>createServer()</code> using the
          <code>Web()</code> factory and accepts additional web-specific options.
        </p>

        <CodeBlock
          title="create-web-context"
          code={`import { createServer } from "corecdtl";
            
const server = createServer({
  maxHeaderSize: 4096
});

const web = server.Web({
  publicStaticPath: "dist",
  publicStaticRoute: "/public",
  spaRootPath: "dist/index.html"
}, mainRoute);`}
        />
      </div>

      {/* Routing model */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Web Routing Model
        </h2>

        <p className="text-slate-400 leading-relaxed">
          WebContext distinguishes requests at the routing level and assigns
          a specialized execution path for each category.
        </p>
<div className="space-y-6">
  <h3 className="text-lg font-semibold text-slate-200">
    Web Routing Types
  </h3>

  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-4">

    <div className="text-emerald-300 text-xs font-semibold tracking-wider">
      MATCHING ORDER (top → bottom)
    </div>

    <div className="flex flex-col gap-3 text-sm">

      <div className="px-4 py-3 rounded-xl border border-slate-700 bg-[#0B0F17] flex justify-between">
        <span className="text-slate-200 font-medium">Static Assets</span>
        <span className="text-slate-400">/public/* files (css, js, images)</span>
      </div>

      <div className="px-4 py-3 rounded-xl border border-slate-700 bg-[#0B0F17] flex justify-between">
        <span className="text-slate-200 font-medium">SPA Fallback</span>
        <span className="text-slate-400">* → index.html</span>
      </div>

      <div className="px-4 py-3 rounded-xl border border-slate-700 bg-[#0B0F17] flex justify-between">
        <span className="text-slate-200 font-medium">Dynamic Routes</span>
        <span className="text-slate-400">Router / Endpoint handlers</span>
      </div>

    </div>
  </div>
</div>

        <p className="text-slate-400 leading-relaxed">
          This avoids conditional checks during request handling and keeps
          execution paths predictable.
        </p>
      </div>

      {/* Static assets */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Static Asset Handling
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Static assets are parsed, cached, and served directly from memory.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Assets are eagerly scanned at startup</li>
          <li>Headers and payload are precomputed</li>
          <li>Immutable fingerprinted assets are cached aggressively</li>
        </ul>

        <CodeBlock
          title="static-asset-flow"
          code={`Request
  → Asset Cache Lookup
    → Prebuilt HTTP payload
      → socket.write(payload)`} 
        />
      </div>

      {/* SPA handling */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          SPA Fallback Handling
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Single Page Applications are handled using a dedicated wildcard route.
        </p>

        <CodeBlock
          title="spa-fallback"
          code={`GET /*
  → return prebuilt index.html response`} 
        />

        <p className="text-slate-400 leading-relaxed">
          The SPA response is fully pre-buffered, avoiding disk IO during runtime.
        </p>
      </div>

      {/* Dynamic routes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Dynamic Routes
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Requests that do not match static or SPA routes fall back to the
          standard CoreCDTL routing and pipeline system.
        </p>

        <CodeBlock
          title="dynamic-route-flow"
          code={`Route Match
  → Middleware
    → Accumulator
      → Endpoint Handler`}
        />
      </div>

      {/* Performance characteristics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Performance Characteristics
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>No per-request filesystem access</li>
          <li>Zero-copy static responses</li>
          <li>Shared ChunkProgression pool</li>
          <li>Single parsing pipeline for all request types</li>
        </ul>
      </div>

      {/* When to use */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          When to Use WebContext
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Serving SPAs and static assets</li>
          <li>Edge or CDN-like deployments</li>
          <li>Unified API + frontend servers</li>
          <li>High-traffic web gateways</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="pt-10 border-t border-slate-800 space-y-3">
        <p className="text-slate-400 leading-relaxed">
          In summary, WebContext:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Extends CoreCDTL for browser workloads</li>
          <li>Optimizes static and SPA delivery</li>
          <li>Shares the same high-performance HTTP core</li>
          <li>Keeps runtime logic minimal and predictable</li>
        </ul>
      </div>
    </section>
  );
}
