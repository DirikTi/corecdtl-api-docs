import CodeBlock from "@/components/CodeBlock";
import { Arrow, Stage } from "@/components/Stage";

const code1 = `import { Factory } from "corecdtl";

const mwLog = Factory.createMiddleware(...);
rootRouter.addMiddleware(mwLog);

const userRoute = Factory.createRoute("/users");

const mwAuth = Factory.createMiddleware(...);
userRoute.addMiddleware(myAuth);

const profileEP = Factory.createEndpoint(HttpMethod.GET ,"/:id/profile", ...);
userRoute.addEndpoint(profileEP);

rootRouter.addRoute(userRoute);`;

export function DocRouter({ setActiveId }: any) {
  return (
    <section className="space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Router
        </h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          The Router is the runtime component responsible for traversing the routing tree
          and resolving incoming requests into executable endpoints.
        </p>
      </div>
    <div>
        <CodeBlock code={`import { Factory } from "corecdtl";
          
const rootRouter = Factory.createRouter("/api/v1")`} title="router" />
    </div>
      {/* Responsibility */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Responsibility
        </h2>
        <p className="text-slate-400 leading-relaxed">
          In CoreCDTL, the router does <strong>not</strong> register routes dynamically
          nor mutate routing structures at runtime.
          Its sole responsibility is to walk a pre-defined routing tree and determine:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Which route segments match the request URL</li>
          <li>Which endpoint corresponds to the HTTP method</li>
          <li>Which middleware chain applies to the request</li>
        </ul>
      </div>

      {/* Route as Input */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Route Tree as Router Input
        </h2>
        <p className="text-slate-400 leading-relaxed">
          The router operates entirely on the <span className="text-slate-300">Route</span> structure.
          Routes define a static routing graph that the router consumes at runtime.
          The router treats each route as a node in a tree, not as an isolated URL definition.
        </p>
      </div>

      <CodeBlock code={code1} title="router" />

      {/* Traversal */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Traversal Model
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Incoming request paths are normalized and split into segments.
          The router then performs a deterministic tree traversal.
        </p>

  <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6 font-mono text-sm text-slate-300">
  <div className="space-y-1 leading-6">
    <div className="text-cyan-400">/users/42/profile</div>

    <div className="text-slate-500">│</div>
    <div>├─ <span className="text-slate-200">/users</span></div>
    <div className="pl-5">├─ <span className="text-slate-200">/:id</span></div>
    <div className="pl-10">└─ <span className="text-emerald-400">/profile</span></div>
  </div>
</div>




        <p className="text-slate-400 leading-relaxed">
          Each segment is matched against child routes.
          If no matching route is found, traversal stops immediately.
        </p>
      </div>

      {/* Matching Rules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Matching Rules
        </h2>
        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Route URLs are normalized at creation time</li>
          <li>Matching is segment-based, not regex-based</li>
          <li>Traversal is strictly top-down</li>
          <li>No backtracking is performed</li>
        </ul>

        <p className="text-slate-400 leading-relaxed">
          This design eliminates ambiguous matches and ensures predictable routing behavior.
        </p>
      </div>

      {/* Endpoint Resolution */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Resolution
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Once traversal reaches the final route node,
          the router selects an endpoint based on the HTTP method.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-5 font-mono text-sm">
  <div className="mb-3 text-cyan-400 font-semibold">
    Route('/users/:id')
  </div>

  <div className="space-y-2 text-slate-300">
    <div className="flex items-center gap-3">
      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">GET</span>
      <span>getUser()</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-semibold">PUT</span>
      <span>updateUser()</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-semibold">DELETE</span>
      <span>deleteUser()</span>
    </div>
  </div>
</div>


        <p className="text-slate-400 leading-relaxed">
          If no endpoint matches the method,
          the request is rejected before execution.
        </p>
      </div>

      {/* Middleware Collection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Middleware Collection
        </h2>
        <p className="text-slate-400 leading-relaxed">
          During traversal, the router accumulates middleware references
          from each matched route node.
        </p>

<div className="rounded-2xl border border-slate-800 bg-[#0B0F14] p-6">
  <h3 className="text-slate-200 font-semibold mb-4">
    Route
  </h3>

  <div className="flex flex-col items-center text-sm font-mono text-slate-300 gap-2">

    <Stage label="Log Middleware" />
    <Arrow />

    <Stage label="Auth Middleware" />
    <Arrow />

    <Stage label="Profile endpoint" />

  </div>
</div>

        <p className="text-slate-400 leading-relaxed">
          Middleware execution order is derived from route depth,
          not registration order.
        </p>
      </div>

      {/* createRoute Role */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Role of createRoute
        </h2>
        <p className="text-slate-400 leading-relaxed">
          The <span className="text-slate-300">createRoute</span> factory constructs routing nodes
          in a normalized and validated form.
        </p>

        <p className="text-slate-400 leading-relaxed">
          By enforcing normalization at creation time,
          the router avoids runtime URL sanitation costs.
        </p>
      </div>

      {/* What Router Does Not Do */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          What the Router Does Not Do
        </h2>
        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Does not parse headers or body</li>
          <li>Does not execute business logic</li>
          <li>Does not allocate request objects</li>
          <li>Does not handle response encoding</li>
        </ul>
      </div>

      {/* Next */}
      <div className="pt-8 border-t border-slate-800">
        <p className="text-slate-400 leading-relaxed">
          Next, we explore <button className="ml-2 text-cyan-400 hover:underline" onClick={() => setActiveId("routing-middleware")}>Middleware</button> —
          how HTTP methods, content limits, and handlers are defined and executed.
        </p>
      </div>
    </section>
  );
}
