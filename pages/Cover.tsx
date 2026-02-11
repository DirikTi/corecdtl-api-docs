import React, { useState } from "react";

const Cover: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setDone(false);

    try {
      await fetch("/api/v1/cover", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: text
      });

      setText("");
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-slate-300 overflow-hidden">
      <div className="w-full max-w-2xl">

        <div
          className="
            rounded-2xl
            p-10
            border border-slate-700/60
            bg-[#0B0F17]/70
            backdrop-blur-xl
            shadow-2xl shadow-cyan-500/10
          "
        >
          <h1 className="text-3xl font-bold text-cyan-400 tracking-wide mb-2">
            Share your thoughts
          </h1>

          <p className="text-slate-400 text-sm mb-8">
            Not olarak görüşleriniz için şimdiden teşekkür ediyorum.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your message here..."
            className="
              w-full h-40
              bg-[#0F1623]/90
              border border-slate-700
              rounded-xl
              p-4
              resize-none
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
              transition
              text-sm
              placeholder:text-slate-600
            "
          />

          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-slate-600">
              {text.length} characters
            </span>

            <button
              onClick={submit}
              disabled={loading}
              className="
                px-6 py-2
                rounded-lg
                bg-cyan-500/10
                border border-cyan-500/40
                text-cyan-400
                font-medium
                hover:bg-cyan-500/20
                active:scale-95
                transition
                disabled:opacity-40
              "
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {done && (
            <div className="mt-4 text-green-400 text-sm">
              ✓ Saved successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cover;
