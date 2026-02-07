import CodeBlock from "@/components/CodeBlock";

export function DocParser() {
    return (
        <section className="space-y-10">
  <h3 className="text-lg font-semibold text-slate-200">Parsers</h3>

  <p className="text-slate-400 leading-relaxed">
    Hypernode contains the core HTTP scanners responsible for reading raw
    buffers directly from the socket and transforming them into structured data.
  </p>

  <CodeBlock
    title="IHttpCore"
    code={`export interface IHttpCore {
  registerRoutes(routes: CoreCDTL.BuildedRoute[]): any;

  scannerRouteFirst(buffer, reqObj, ...limits): number;
  scannerHeader(buffer, reqObj, ...limits): void;

  printRouteTree(deepth: number): void;
}`}
  />

  <ul className="list-disc list-inside text-slate-400 space-y-3">
    <li>
      <strong>scannerRouteFirst</strong> → parses request line + finds route
    </li>
    <li>
      <strong>scannerHeader</strong> → parses headers directly into ChunkProgression
    </li>
    <li>
      <strong>registerRoutes</strong> → builds native route tree for O(1)/O(log n) matching
    </li>
  </ul>

  <p className="text-slate-400 leading-relaxed">
    These operations run entirely in C++ to avoid string allocations and JS parsing
    overhead. Buffers are scanned using pointer arithmetic.
  </p>
</section>
    )
}