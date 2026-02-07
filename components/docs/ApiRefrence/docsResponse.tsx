import CodeBlock from "@/components/CodeBlock";
import { OptionRow } from "@/components/OptionRow";

export function DocResponse() {
    return (
<section className="space-y-14">
  {/* Title */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-200">
      Response Model (PipeResponseBase)
    </h2>

    <p className="text-slate-400 leading-relaxed">
      CoreCDTL uses a pooled response object for every request.
      Instead of creating new response instances, objects are reused for
      maximum performance and zero-allocation behavior.
    </p>

    <p className="text-slate-400 leading-relaxed">
      By default, the server uses <code>PipeResponseBase</code>.
      However, you can replace it with your own implementation.
    </p>
  </div>

  {/* OptionRow */}
  <OptionRow
    name="ResponseCtor"
    defaultValue="PipeResponseBase"
    desc="Custom Response class constructor. Allows overriding serialization, helpers, or behavior."
    effect="Every request allocates this type from the pool instead of the default response."
  />

  {/* Usage */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      Usage
    </h3>

    <CodeBlock
      title="server-option"
      code={`createServer({
  ResponseCtor: MyResponse
})`}
    />
  </div>

  {/* What is PipeResponseBase */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      What is PipeResponseBase?
    </h3>

    <p className="text-slate-400 leading-relaxed">
      It is a minimal, high-performance HTTP response container.
      It manages:
    </p>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>status code</li>
      <li>headers</li>
      <li>body buffer</li>
      <li>compression</li>
      <li>pool lifecycle</li>
      <li>final HTTP serialization</li>
    </ul>
  </div>

  {/* What you can override */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      What You Can Override
    </h3>

    <p className="text-slate-400 leading-relaxed">
      You are free to extend the class and customize high-level behavior:
    </p>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>json()</li>
      <li>send()</li>
      <li>redirect()</li>
      <li>setHeader logic</li>
      <li>compression strategy</li>
      <li>getResp() serialization</li>
      <li>custom helpers (html(), stream(), file(), etc)</li>
    </ul>
  </div>

  {/* Example */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      Example: Custom JSON Serializer
    </h3>

    <CodeBlock
      title="custom-response"
      code={`class MyResponse extends PipeResponseBase {
  json(obj: unknown) {
    this.setHeader("Content-Type", "application/json");
    this.send(JSON.stringify(obj, null, 2)); // pretty print
  }
}`}
    />
  </div>

  {/* getResp explanation */}
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-slate-200">
      getResp() — Final Serialization
    </h3>

    <p className="text-slate-400 leading-relaxed">
      The default pipeline calls <code>getResp()</code> internally to convert the
      response into raw bytes before writing to the socket.
    </p>

    <p className="text-slate-400 leading-relaxed">
      This method:
    </p>

    <ul className="list-disc list-inside text-slate-400 space-y-2">
      <li>applies compression</li>
      <li>sets Content-Length</li>
      <li>serializes headers</li>
      <li>returns a final Buffer</li>
    </ul>

    <p className="text-slate-400 leading-relaxed">
      Overriding this lets you fully control wire-level output.
    </p>
  </div>

  {/* Warning */}
  <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-5 text-yellow-300">
    <strong>Important — Do Not Break Lifecycle</strong>
    <br /><br />
    Response objects are pooled and reused.
    <br />
    Do not override:
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>pool methods</li>
      <li>freeCPool()</li>
      <li>internal lifecycle flags</li>
    </ul>
    <br />
    Breaking these can cause memory leaks or corrupted responses.
    <br />
    Only customize behavior — not lifecycle.
  </div>

  {/* Closing */}
  <div className="pt-8 border-t border-slate-800 text-slate-400 leading-relaxed">
    In short:
    <br />
    <strong>Accumulator controls how data comes in.</strong><br />
    <strong>Response controls how data goes out.</strong>
    <br /><br />
    Together, they form the complete CoreCDTL runtime.
  </div>
</section>

    )
}