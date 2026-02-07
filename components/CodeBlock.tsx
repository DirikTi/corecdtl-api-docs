import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const lynxTheme = {
  ...tomorrow,

  'pre[class*="language-"]': {
    background: "#020408",
    padding: "1.75rem",
    margin: 0,
    borderRadius: 0,
    border: "1px solid rgba(148,163,184,0.2)",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  'code[class*="language-"]': {
    color: "#E5E7EB",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
  },

  keyword: { color: "#22D3EE", fontWeight: 600 },
  function: { color: "#A78BFA" },
  string: { color: "#34D399" },
  comment: { color: "#64748B", fontStyle: "italic" },
  number: { color: "#FBBF24" },
  operator: { color: "#CBD5E1" },
  punctuation: { color: "#94A3B8" },
};

export default function CodeBlock({ code, language = "javascript", title }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur opacity-70"></div>

      <div className="relative">
        {title && (
          <div className="bg-[#020408] border border-slate-800 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
            {title}
          </div>
        )}

        <SyntaxHighlighter
          language={language}
          style={lynxTheme}
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
