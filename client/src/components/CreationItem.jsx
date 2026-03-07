import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const typeLabel = item.type
    ?.split("-")
    ?.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    ?.join(" ") || item.type;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="rounded-xl border border-white/[0.08] bg-[#09090b] p-4 cursor-pointer card-hover overflow-hidden"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-medium text-white truncate">{item.prompt}</h2>
          <span className="inline-flex items-center mt-2 px-2.5 py-1 text-xs font-medium rounded-md bg-violet-500/15 text-violet-400 border border-violet-500/20">
            {typeLabel} · {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
        <span className="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-white/[0.06] text-zinc-400 border border-white/[0.06]">
          {typeLabel}
        </span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="Creation"
              className="w-full max-w-md rounded-lg border border-white/[0.06]"
            />
          ) : (
            <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
