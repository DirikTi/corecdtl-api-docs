export function Limitations() {
  return (
    <section className="space-y-14">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Limitations</h2>

        <p className="text-slate-400 leading-relaxed">
          CoreCDTL combines a native C++ core (Hypernode) with a JavaScript
          runtime. While this hybrid architecture delivers very high
          performance, it cannot provide the same level of control as a fully
          native HTTP server written entirely in C/C++.
        </p>

        <p className="text-slate-400 leading-relaxed">
          The following constraints stem from Node.js runtime boundaries and
          socket ownership.
        </p>
      </div>

      {/* Limitation list */}
      <div className="space-y-10">
        {/* Zero copy */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">
            No True Zero-Copy
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Incoming socket data is ultimately wrapped by Node Buffers before
            reaching CoreCDTL. This introduces unavoidable memory copies
            between:
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>libuv → Node Buffer</li>
            <li>Node Buffer → JS runtime</li>
            <li>sometimes Buffer → user accumulator</li>
          </ul>

          <p className="text-slate-400 leading-relaxed mt-3">
            Because of this, true kernel-level zero-copy techniques are not
            possible.
          </p>
        </div>

        {/* Socket ownership */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">
            Limited Socket Control
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Sockets are owned and managed by Node’s libuv event loop. Hypernode
            does not directly control:
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>epoll / kqueue registration</li>
            <li>read batching strategies</li>
            <li>TCP tuning at kernel level</li>
            <li>sendfile / splice optimizations</li>
          </ul>

          <p className="text-slate-400 leading-relaxed mt-3">
            This prevents low-level networking tricks commonly used by
            fully-native servers.
          </p>
        </div>

        {/* Boundary cost */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">
            Native ↔ JS Boundary Cost
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Communication between C++ and JavaScript requires boundary
            crossings. Each transition introduces:
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>context switching</li>
            <li>object wrapping/unwrapping</li>
            <li>V8 call overhead</li>
          </ul>

          <p className="text-slate-400 leading-relaxed mt-3">
            Although minimized, this overhead cannot be fully eliminated.
          </p>
        </div>

        {/* GC */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">
            GC Still Exists
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Even with pooling strategies (CPool, ChunkProgression reuse),
            JavaScript objects still live inside V8 and are subject to garbage
            collection.
          </p>

          <p className="text-slate-400 leading-relaxed mt-3">
            Under extreme workloads, GC pauses may still occur compared to a
            fully-native server.
          </p>
        </div>

        {/* Kernel features */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">
            No Direct Kernel Features
          </h3>

          <p className="text-slate-400 leading-relaxed mt-2">
            Advanced kernel-level optimizations such as:
          </p>

          <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
            <li>sendfile()</li>
            <li>io_uring</li>
            <li>splice()</li>
            <li>mmap-based streaming</li>
          </ul>

          <p className="text-slate-400 leading-relaxed mt-3">
            are not directly usable inside the Node runtime.
          </p>
        </div>
      </div>

      {/* Honest conclusion */}
      <div className="pt-10 border-t border-slate-800 text-slate-400 leading-relaxed">
        CoreCDTL focuses on a pragmatic balance:
        <br />
        <br />
        near-native performance + developer ergonomics.
        <br />
        <br />
        If you require absolute kernel-level control and true zero-copy
        networking, a fully native server architecture may be more appropriate.
        <br />
        <br />
        For most real-world APIs, CoreCDTL provides performance that is close to
        native while keeping the productivity of the JavaScript ecosystem.
      </div>
    </section>
  );
}
