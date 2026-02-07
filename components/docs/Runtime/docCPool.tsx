import CodeBlock from "@/components/CodeBlock";

export function DocCPool() {
    return (
        <section className="space-y-10">
  <h3 className="text-lg font-semibold text-slate-200">CPool (Native Object Pool)</h3>

  <p className="text-slate-400 leading-relaxed">
    Hypernode implements a native object pool to eliminate runtime allocations.
  </p>

  <CodeBlock
    title="ICPool"
    code={`export interface ICPool {
  initializePool(size: number): void;
  registerObj(obj: object): number;
  allocate(): any | null;
  free(index: number): void;
  resizePool(newSize: number): void;
}`}
  />

  <ul className="list-disc list-inside text-slate-400 space-y-3">
    <li>No per-request new/delete</li>
    <li>Constant memory usage</li>
    <li>Cache-friendly reuse</li>
    <li>Zero GC pressure</li>
  </ul>

  <p className="text-slate-400 leading-relaxed">
    ChunkProgression and response objects are recycled instead of created.
    This keeps latency stable under sustained load.
  </p>
</section>
    )
}