import CodeBlock from "@/components/CodeBlock";
import { Arrow, Stage } from "@/components/Stage";

export function DocMiddleware() {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Middleware
        </h1>
        <p className="text-slate-400 leading-relaxed">
          Middleware is a <strong>processing layer</strong> that sits between
          routing and the endpoint handler. It allows you to intercept,
          validate, mutate, or short-circuit a request before it reaches
          the endpoint.
        </p>
      </div>

      {/* Big picture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Request Flow
        </h2>

        <p className="text-slate-400 leading-relaxed">
          In CoreCDTL, middleware participates directly in the request pipeline.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
  <h3 className="text-slate-200 font-semibold mb-4">
    Pipeline Lifecycle
  </h3>

  <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">

    <Stage label="Body Decode/Parse" subtle />
    <Arrow />

    <Stage label="Allocate Response" subtle />
    <Arrow />

    <Stage label="Log Middleware" highlight />
    <Arrow />

    <Stage label="Auth Middleware" highlight />
    <Arrow />

    <Stage label="Profile endpoint" />

  </div>
</div>

      </div>

      {/* Creating middleware */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Creating a Middleware
        </h2>

        <p className="text-slate-400 leading-relaxed">
          A middleware is created using the <code>createMiddleware</code> factory.
          It wraps a handler function and exposes it as a middleware unit.
        </p>

        <CodeBlock
          title="createMiddleware"
          code={`import { Factory } from "corecdtl";

const authMw = Factory.createMiddleware((req, resp) => {
    const token = req.headers["authorization"]
    ...
});`}
        />
      </div>

      {/* Middleware handler */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Middleware Handler
        </h2>

        <p className="text-slate-400 leading-relaxed">
          The handler function is executed during the middleware phase.
          It has access to the request, response, and control flow.
        </p>

        <CodeBlock
          title="middleware-handler"
          code={`import { Factory } from "corecdtl";

const authMiddleware = createMiddleware(
  (req, res, next) => {
    if (!req.headers.authorization) {
      res.setStatus(401).send("Unauthorized");
      return;
    }

    next();
  }
);`}
        />

        <p className="text-slate-400 leading-relaxed">
          A middleware can:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Continue the pipeline (<code>next()</code>)</li>
          <li>Stop the request early</li>
          <li>Modify request or response objects</li>
        </ul>
      </div>

      {/* Where middleware is used */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Where Middleware Is Applied
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Middleware can be attached at different levels of the routing system.
        </p>

        <div className="space-y-4">
  <h3 className="text-lg font-semibold text-slate-200">
    Middleware Levels
  </h3>

  <div className="grid md:grid-cols-2 gap-4">

    {/* Router Middleware */}
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
      <div className="text-blue-400 font-semibold mb-2">
        Router Middleware
      </div>

      <p className="text-sm text-slate-300 mb-3">
        Applies to <span className="text-blue-300 font-medium">all routes</span> under the router.
      </p>

      <div className="text-xs text-slate-500 font-mono">
        Global • Cross-cutting • Shared logic
      </div>
    </div>

    {/* Endpoint Middleware */}
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
      <div className="text-emerald-400 font-semibold mb-2">
        Endpoint Middleware
      </div>

      <p className="text-sm text-slate-300 mb-3">
        Applies only to a <span className="text-emerald-300 font-medium">single endpoint</span>.
      </p>

      <div className="text-xs text-slate-500 font-mono">
        Local • Targeted • Fine-grained control
      </div>
    </div>

  </div>
</div>

      </div>

      {/* Endpoint middleware */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Middleware
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Endpoint-level middleware runs <strong>after routing</strong> and
          <strong> before the endpoint handler</strong>.
        </p>

        <CodeBlock
          title="endpoint-middleware"
          code={`endpoint.addMiddleware(authMiddleware);`}
        />
      </div>

      {/* Characteristics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Characteristics
        </h2>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Middleware is synchronous or asynchronous</li>
          <li>Execution order is deterministic</li>
          <li>Can short-circuit request processing</li>
          <li>Does not perform routing or parsing</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="pt-10 border-t border-slate-800 space-y-3">
        <p className="text-slate-400 leading-relaxed">
          In summary, Middleware:
        </p>
        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Intercepts requests in the pipeline</li>
          <li>Encapsulates cross-cutting concerns</li>
          <li>Runs before the endpoint handler</li>
          <li>Is composable and reusable</li>
        </ul>
      </div>
    </section>
  );
}
