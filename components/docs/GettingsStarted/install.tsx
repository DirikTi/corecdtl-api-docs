import CodeBlock from "@/components/CodeBlock";

export function Install() {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
        Installation
      </h1>

      <p className="text-slate-400 max-w-3xl">
        CoreCDTL can be installed either as an npm module, built from source
        using CMake, or used via precompiled native binaries.
      </p>

      {/* npm */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Using npm</h2>
        <CodeBlock
          language="bash"
          code="npm install corecdtl"
          title="Terminal"
        />
        <p className="text-sm text-slate-500">
          The npm package includes native bindings compiled for supported platforms.
        </p>
      </div>

      {/* Note */}
      <div className="p-4 border-l-4 border-cyan-500 bg-cyan-500/5">
        <p className="text-sm text-slate-300 italic">
          Linux users will benefit most from newer kernels due to improved
          IO and scheduling primitives.
        </p>
      </div>
    </div>
  );
}