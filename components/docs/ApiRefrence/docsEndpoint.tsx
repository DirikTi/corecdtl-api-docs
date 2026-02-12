import CodeBlock from "@/components/CodeBlock";
import { OptionRow } from "@/components/OptionRow";
import { Arrow, Stage } from "@/components/Stage";

export function DocEndpoint({ setActiveId }: any) {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Endpoint
        </h1>
        <p className="text-slate-400 leading-relaxed">
          An Endpoint is the <strong>final destination</strong> of an HTTP
          request. After route matching is completed, execution reaches the
          endpoint where the actual business logic is performed.
        </p>
      </div>

      {/* Big picture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          The Big Picture
        </h2>

        <p className="text-slate-400 leading-relaxed">
          In CoreCDTL’s architecture, the request lifecycle follows this flow:
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

    <Stage label="Log Middleware" />
    <Arrow />

    <Stage label="Auth Middleware" />
    <Arrow />

    <Stage label="Profile endpoint" highlight />

  </div>
</div>
      </div>

      {/* Creating endpoint */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Creating an Endpoint
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Endpoints are defined using the <code>createEndpoint</code> factory.
          Each endpoint is bound to a single HTTP method and a URL segment.
        </p>

        <CodeBlock
          title="endpoint.ts"
          code={`import { Factory } from "corecdtl";
            
const getUserEndpoint = Factory.createEndpoint(
  HttpMethod.GET,
  "/profile",
  async (req, res) => {
    res.json({ user: "asikus" });
  }
);`}
        />
      </div>

      {/* HTTP Method */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">HTTP Method</h2>

        <p className="text-slate-400 leading-relaxed">
          An endpoint only matches requests using the defined HTTP method.
          Requests with a different method will never reach the handler.
        </p>

        <CodeBlock
          title="http-methods"
          code={`enum HttpMethod {
  HEAD,
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  OPTIONS
}`}
        />
      </div>

      {/* Handler */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Handler
        </h2>

        <p className="text-slate-400 leading-relaxed">
          The handler function is the final execution stage of a request. At
          this point, routing, parsing, and matching have already been
          completed.
        </p>

        <CodeBlock
          title="handler"
          code={`const handler = (req, res) => {
  // req -> parsed request
  // res -> response abstraction

  res.setStatus(200).send("OK");
}`}
        />

        <p className="text-slate-400 leading-relaxed">
          Handlers can be synchronous or asynchronous.
        </p>
      </div>

      {/* Content config */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Content Configuration
        </h2>

        <p className="text-slate-400 leading-relaxed">
          An endpoint can optionally declare the accepted content type and
          content encoding.
        </p>

        <CodeBlock
          title="content-config"
          code={`import { Factory, Http } from "corecdtl";
            
const createUserEndpoint = Factory.createEndpoint(
  HttpMethod.POST,
  "/users",
  handler,
  {
    type: Http.ContentTypeTables.JSON,
    encoding: Http.ContentEncodingTables.gzip
  }
);`}
        />

        <p className="text-slate-400 leading-relaxed">
          These settings signal the parser. Parsing is handled internally by the
          HyperNode runtime.
        </p>
      </div>

      {/* EndpointOpts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Options
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Endpoint options allow you to fine-tune how CoreCDTL accumulates and
          parses the request body for a specific endpoint.
        </p>

        <CodeBlock
          title="content-config"
          code={`import { Factory, Http } from "corecdtl";
      
const createUserEndpoint = Factory.createEndpoint(
  HttpMethod.POST,
  "/users",
  handler,
  {
    type: Http.ContentTypeTables.JSON,
    encoding: Http.ContentEncodingTables.gzip
  },
  {
    untilEnd: false,
    maxContentSize: 1024,
    maxHeaderSize: undefined
  }
);`}
        />

        <p className="text-slate-400 leading-relaxed">
          Unlike middleware, these settings are evaluated during the{" "}
          <strong>route build phase</strong>, not at runtime. CoreCDTL uses them
          to preselect the correct accumulator and memory strategy.
        </p>
        {/* Options Table */}
        <div className="space-y-6">
          <div className="space-y-3">
            <OptionRow
              name="untilEnd"
              defaultValue="false"
              desc="Signals that the request body has no Content-Length and will be streamed until socket end."
              effect="CoreCDTL selects the until-end accumulator and waits for the 'end' event."
            />

            <OptionRow
              name="maxContentSize"
              defaultValue="server.maxContentSize"
              desc="Maximum allowed request body size (bytes) for this endpoint."
              effect="Requests exceeding the limit are rejected with 413 Payload Too Large."
            />

            <OptionRow
              name="maxHeaderSize"
              defaultValue="server.maxHeaderSize"
              desc="Maximum total header size for this endpoint."
              effect="Prevents header overflow / memory abuse. Exceeding triggers 400."
            />
          </div>
        </div>
      </div>
      {/* Accumulation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Request Accumulation
        </h2>

        <p className="text-slate-400 leading-relaxed">
          After headers are parsed, CoreCDTL must decide how the request body
          should be collected. This process is called{" "}
          <strong>accumulation</strong>.
        </p>

        <p className="text-slate-400 leading-relaxed">
          The accumulation strategy is automatically selected based on:
        </p>

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>HTTP method (GET / HEAD skip body)</li>
          <li>Content-Type configuration</li>
          <li>Content-Encoding configuration</li>
          <li>Content-Length header</li>
          <li>Transfer-Encoding (chunked)</li>
          <li>Endpoint options (untilEnd, limits)</li>
        </ul>

        <div className="space-y-5">
  <h3 className="text-lg font-semibold text-slate-200">
    Accumulation Modes
  </h3>

  <div className="grid md:grid-cols-2 gap-4">

    {/* No Body */}
    <div className="rounded-2xl border border-slate-700 bg-[#0B0F17] p-5">
      <div className="text-slate-200 font-medium mb-2">
        No Body
      </div>

      <div className="text-sm text-slate-400 mb-3">
        HEAD / GET requests do not allocate an accumulator.
      </div>

      <div className="text-xs text-slate-500 font-mono">
        zero allocation • immediate pipeline
      </div>
    </div>

    {/* Content-Length */}
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
      <div className="text-emerald-400 font-medium mb-2">
        Content-Length
      </div>

      <div className="text-sm text-slate-300 mb-3">
        Fixed-size buffer is pre-allocated and filled until expected length.
      </div>

      <div className="text-xs text-slate-500 font-mono">
        fixed-length • predictable • fastest path
      </div>
    </div>

    {/* Chunked */}
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
      <div className="text-blue-400 font-medium mb-2">
        Transfer-Encoding: chunked
      </div>

      <div className="text-sm text-slate-300 mb-3">
        Streaming parser processes chunks incrementally.
      </div>

      <div className="text-xs text-slate-500 font-mono">
        streaming • low memory • progressive
      </div>
    </div>

    {/* Until End */}
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <div className="text-amber-400 font-medium mb-2">
        Until-End Mode
      </div>

      <div className="text-sm text-slate-300 mb-3">
        No length header. Data is accumulated until socket closes.
      </div>

      <div className="text-xs text-slate-500 font-mono">
        connection-bound • fallback • optional
      </div>
    </div>

  </div>
</div>


        <p className="text-slate-400 leading-relaxed">
          CoreCDTL selects the appropriate<button
            className="ml-2 text-cyan-400 hover:underline"
            onClick={() => setActiveId("accumulator")}
          >accumulator</button> during the{" "}
          <strong>route build phase</strong>, so no runtime branching is needed
          while processing requests.
        </p>
      </div>

      {/* Custom accumulator */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Custom Accumulator
        </h2>

        <p className="text-slate-400 leading-relaxed">
          For advanced use cases, an endpoint can provide its own custom
          accumulation handler using <code>accumulateHandle</code>.
        </p>

        <CodeBlock
          title="custom-accumulator"
          code={`import { Factory } from "corecdtl";

Factory.createEndpoint(
  HttpMethod.POST,
  "/stream",
  handler,
  undefined,
  undefined,
  customAccumulateHandle
);`}
        />

        <p className="text-slate-400 leading-relaxed">
          When defined, CoreCDTL completely bypasses the default accumulation
          logic and delegates the socket handling directly to your function.
        </p>

        <p className="text-slate-400 leading-relaxed">
          This is considered an <strong>advanced feature</strong> and is
          documented separately.
        </p>
      </div>

      {/* Limits */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Limits
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Endpoint-level limits allow you to override global server
          configuration for specific routes.
        </p>

        <CodeBlock
          title="endpoint-options"
          code={`import { Factory } from "corecdtl";
          
const uploadEndpoint = Factory.createEndpoint(
  HttpMethod.POST,
  "/upload",
  handler,
  undefined,
  {
    maxContentSize: 5 * 1024 * 1024,
    maxHeaderSize: 4096,
    untilEnd: true
  }
);`}
        />

        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>
            <strong>maxContentSize</strong> – Maximum allowed payload size
          </li>
          <li>
            <strong>maxHeaderSize</strong> – Maximum allowed header size
          </li>
          <li>
            <strong>untilEnd</strong> – Whether to wait until the stream ends
          </li>
        </ul>
      </div>

      {/* Middleware */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Endpoint Middleware
        </h2>

        <p className="text-slate-400 leading-relaxed">
          You can attach middleware directly to an endpoint. These run after
          route-level middlewares.
        </p>

        <CodeBlock
          title="endpoint-middleware"
          code={`endpoint.addMiddleware(authMiddleware);`}
        />
      </div>

      {/* Summary */}
      <div className="pt-10 border-t border-slate-800 space-y-3">
        <p className="text-slate-400 leading-relaxed">
          In summary, an Endpoint:
        </p>
        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Is bound to a single HTTP method</li>
          <li>Contains the final business logic</li>
          <li>Defines content and limit rules</li>
          <li>Represents the last stage in the middleware chain</li>
        </ul>
      </div>
    </section>
  );
}
