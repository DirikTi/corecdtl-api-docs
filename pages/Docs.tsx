import React, { useState, useEffect } from "react";
import { DOC_SECTIONS } from "../constants";
import CodeBlock from "../components/CodeBlock";
import { Intro } from "@/components/docs/GettingsStarted/intro";
import { Install } from "@/components/docs/GettingsStarted/install";
import { Quickstart } from "@/components/docs/GettingsStarted/quickstart";
import { DocServer } from "@/components/docs/ApiRefrence/server";
import { RoutingOverview } from "@/components/docs/ApiRefrence/routingOverview";
import { DocRouter } from "@/components/docs/ApiRefrence/docsRouter";
import { DocEndpoint } from "@/components/docs/ApiRefrence/docsEndpoint";
import { DocMiddleware } from "@/components/docs/ApiRefrence/docMiddleware";
import { ContextOverview } from "@/components/docs/ApiRefrence/contextOverview";
import { DocApiContext } from "@/components/docs/ApiRefrence/docsApiContext";
import { DocWebContext } from "@/components/docs/ApiRefrence/docWebContext";
import { DocAccumulator } from "@/components/docs/ApiRefrence/docsAccumulator";
import { DocContent } from "@/components/docs/ApiRefrence/docsContent";
import { DocResponse } from "@/components/docs/ApiRefrence/docsResponse";
import { DocHypernode } from "@/components/docs/Runtime/docsHypernode";
import { DocParser } from "@/components/docs/Runtime/docParser";
import { DocCPool } from "@/components/docs/Runtime/docCPool";
import { Limitations } from "@/components/docs/Limitations";
import { FuturePlans } from "@/components/docs/FuturePlans";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Docs: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeId, setActiveId] = useState(itemId || "intro");

  useEffect(() => {
    if (!itemId) return;

    if (itemId !== activeId) {
      setActiveId(itemId);
    }
  }, [itemId]); 

    useEffect(() => {
    if (!activeId) return;

    const target = `/docs/${activeId}`;

    if (location.pathname !== target) {
      navigate(target, { replace: true });
    }
  }, [activeId, location.pathname]);
  /* -------------------------------- */
  /* STATE -> URL (tab değişince)     */
  /* -------------------------------- */
  

  const getContent = () => {
    switch (activeId) {
      case "intro":
        return <Intro />;
      case "install":
        return <Install />;
      case "quickstart":
        return <Quickstart />;
      case "server":
        return <DocServer setActiveId={setActiveId} />
      case "routing":
        return <RoutingOverview setActiveId={setActiveId} />
      case "routing-router":
        return <DocRouter setActiveId={setActiveId}  />
      case "routing-endpoint":
        return <DocEndpoint setActiveId={setActiveId}  />
      case "routing-middleware":
        return <DocMiddleware setActiveId={setActiveId}  />
      case "context":
        return <ContextOverview setActiveId={setActiveId}  />
      case "context-api":
        return <DocApiContext />
      case "context-web":
        return <DocWebContext />
      case "accumulator":
        return <DocAccumulator />
      case "content-encoding":
        return <DocContent />
      case "response":
        return <DocResponse />
      case "hypernode":
        return <DocHypernode />
      case "hypernode-parsers":
        return <DocParser />
      case "hypernode-cpool":
        return <DocCPool />
      case "limitations":
        return <Limitations />
      case "roadmap":
        return <FuturePlans />

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800">
            <span className="text-slate-600 font-mono text-sm uppercase tracking-widest">
              Section under construction
            </span>
            <span className="text-xs text-slate-500 mt-2">
              Check back in the next release.
            </span>
          </div>
        );
    }
  };

  const flatDocItems = DOC_SECTIONS.flatMap((section) =>
    section.items.flatMap((item) =>
      item.children ? [item, ...item.children] : [item],
    ),
  );

  const currentIndex = flatDocItems.findIndex((item) => item.id === activeId);

  const prevItem = flatDocItems[currentIndex - 1];
  const nextItem = flatDocItems[currentIndex + 1];

  return (
    <div className="pt-24 min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-72 bg-[#05070C] border-r border-slate-800 overflow-y-auto hidden md:block">
        <div className="p-8 space-y-10">
          {DOC_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[14px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                {section.title}
              </h4>
              <nav className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = activeId === item.id;

                  return (
                    <div key={item.id} className="space-y-1">
                      {/* Parent item */}
                      <button
                        onClick={() => setActiveId(item.id)}
                        className={`w-full text-left px-3 py-2 text-m transition-all border-l-2 ${
                          isActive
                            ? "text-cyan-400 border-cyan-500 bg-cyan-500/5 font-semibold"
                            : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {item.label}
                      </button>

                      {/* Children */}
                      {item.children && (
                        <div className="ml-4 flex flex-col gap-1">
                          {item.children.map((child) => {
                            const isChildActive = activeId === child.id;

                            return (
                              <button
                                key={child.id}
                                onClick={() => setActiveId(child.id)}
                                className={`text-left px-3 py-1.5 text-sm transition-all border-l ${
                                  isChildActive
                                    ? "text-cyan-300 border-cyan-400 bg-cyan-500/5"
                                    : "text-slate-500 border-transparent hover:text-slate-300"
                                }`}
                              >
                                {child.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-72 p-8 lg:p-16 max-w-5xl">
        <div className="max-w-4xl mx-auto">
          {getContent()}

          <div className="mt-20 pt-8 border-t border-slate-800 flex justify-between">
            <button
              disabled={!prevItem}
              onClick={() => prevItem && setActiveId(prevItem.id)}
              className={`text-sm font-bold flex items-center gap-2 ${
                prevItem
                  ? "text-slate-500 hover:text-slate-300"
                  : "text-slate-700 cursor-not-allowed"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              {prevItem?.label ?? "Previous"}
            </button>

            <button
              disabled={!nextItem}
              onClick={() => nextItem && setActiveId(nextItem.id)}
              className={`text-sm font-bold flex items-center gap-2 ${
                nextItem
                  ? "text-cyan-500 hover:text-cyan-400"
                  : "text-slate-700 cursor-not-allowed"
              }`}
            >
              {nextItem?.label ?? "Next"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Docs;
