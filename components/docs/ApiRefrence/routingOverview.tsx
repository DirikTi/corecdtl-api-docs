export function RoutingOverview({ setActiveId }: any) {
  return (
    <section className="space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Routing Overview
        </h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          CoreCDTL routing is built on a hierarchical composition model rather than a flat route table.
          <button className="ml-2 text-cyan-400 hover:underline cursor" onClick={() => setActiveId("routing-router")}>Routes</button>, 
          <button className="ml-2 text-cyan-400 hover:underline cursor" onClick={() => setActiveId("routing-endpoint")}>Endpoints</button>, and 
          <button className="ml-2 text-cyan-400 hover:underline cursor" onClick={() => setActiveId("routing-middleware")}>Middlewares</button> form an explicit routing tree that defines both structure
          and execution order.
        </p>
      </div>

      {/* Core Concept */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Core Concept
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Instead of registering isolated routes, CoreCDTL constructs a routing tree composed of
          route segments. Each request is resolved by walking this tree from root to leaf.
        </p>

        <pre className="bg-[#05070C] border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
{`Route
 ├─ Middleware(s)
 ├─ Sub-Route
 │   ├─ Middleware(s)
 │   └─ Endpoint (GET / POST / ...)
`}
        </pre>
      </div>

      {/* Routing Factory */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Routing Factory
        </h2>
        <p className="text-slate-400 leading-relaxed">
          The routing factory is responsible for constructing routing nodes.
          It does not perform matching, I/O, or request execution.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Its only responsibility is describing the routing graph using small,
          composable builders:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li><span className="text-slate-300">createRoute</span> — defines a URL path segment</li>
          <li><span className="text-slate-300">createEndpoint</span> — attaches an HTTP method handler</li>
          <li><span className="text-slate-300">createMiddleware</span> — defines an interception unit</li>
        </ul>
      </div>

      {/* Route Node */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Route as a Structural Node
        </h2>
        <p className="text-slate-400 leading-relaxed">
          A route represents a single URL segment in the routing tree.
          It is a purely structural unit and does not depend on HTTP methods.
        </p>

        <pre className="bg-[#05070C] border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
{`/users
  /:id
    GET
    PUT
`}
        </pre>

        <p className="text-slate-400 leading-relaxed">
          Each route node may contain nested routes, endpoints, and middlewares.
          This enables fine-grained control over execution scope.
        </p>
      </div>

      {/* URL Definition Rules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          URL Definition Rules
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Route URLs are normalized and validated at creation time.
          This guarantees deterministic routing behavior and prevents ambiguous paths
          from entering the routing tree.
        </p>

        <h3 className="text-lg font-semibold text-slate-300">
          Normalization
        </h3>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Windows-style slashes (<code className="text-slate-300">\</code>) are converted to <code className="text-slate-300">/</code></li>
          <li>Duplicate slashes are collapsed (<code className="text-slate-300">//</code> → <code className="text-slate-300">/</code>)</li>
          <li>Trailing slashes are removed</li>
          <li>The root route <code className="text-slate-300">/</code> is preserved as-is</li>
        </ul>

        <pre className="bg-[#05070C] border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
{`"/users//42/"   → "/users/42"
"\\users\\id"    → "/users/id"`}
        </pre>

        <h3 className="text-lg font-semibold text-slate-300">
          Validation
        </h3>

        <p className="text-slate-400 leading-relaxed">
          After normalization, routes are validated segment by segment.
          Invalid routes fail fast during construction.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Double slashes are rejected</li>
          <li>Empty parameter names are not allowed</li>
          <li>Parameter and wildcard names must be alphanumeric or underscore</li>
        </ul>

        <pre className="bg-[#05070C] border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
{`✔ /users/:id
✔ /files/*rest
✔ /assets/*

✖ /users//id
✖ /users/:
✖ /files/*$path`}
        </pre>
      </div>

      {/* Parameters & Wildcards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Parameters and Wildcards
        </h2>

        <p className="text-slate-400 leading-relaxed">
          CoreCDTL supports explicit parameter and wildcard segments
          as first-class routing primitives.
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>
            <span className="text-slate-300">:param</span> — named parameter segment
          </li>
          <li>
            <span className="text-slate-300">*</span> or <span className="text-slate-300">*name</span> — wildcard segment
          </li>
        </ul>

        <pre className="bg-[#05070C] border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
{`/users/:id
/files/*rest
/static/*`}
        </pre>

        <p className="text-slate-400 leading-relaxed">
          Validation ensures that parameter and wildcard names are safe
          for downstream extraction and execution.
        </p>
      </div>

      {/* Execution Order */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          High-Level Execution Order
        </h2>
        <ol className="list-decimal list-inside text-slate-400 space-y-2">
          <li>Route-level middlewares (top-down)</li>
          <li>Endpoint-level middlewares</li>
          <li>Endpoint handler</li>
          <li>Response pipeline</li>
        </ol>

        <p className="text-slate-400 leading-relaxed">
          There is no implicit bubbling or global middleware stack.
          Execution order is fully determined by the routing tree.
        </p>
      </div>

      {/* Scope */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Scope of This Section
        </h2>
        <p className="text-slate-400 leading-relaxed">
          This page introduces the routing model and URL semantics at a conceptual level.
          Detailed matching and execution behavior is covered in the following sections.
        </p>
      </div>

      {/* Next */}
      <div className="pt-8 border-t border-slate-800">
        <p className="text-slate-400 leading-relaxed">
          Next, we dive into the <button className="ml-2 text-cyan-400 hover:underline" onClick={() => setActiveId("routing-router")}>Router</button> —
          how the routing tree is traversed and how requests are matched.
        </p>
      </div>
    </section>
  );
}
