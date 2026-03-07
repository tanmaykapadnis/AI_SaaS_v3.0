import React, { useState } from "react";
import { Sparkles, FileText } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";


const api = axios.create({
  baseURL: "http://localhost:3000", 
});

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500–800 words)" },
    { length: 1200, text: "Medium (800–1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast.error("Please enter an article topic");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const token = await getToken();

      const { data } = await api.post(
        "/api/ai/generate-article",
        {
          prompt: topic,
          length: selectedLength.length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Article generated ✅");
      } else {
        toast.error(data.message || "Generation failed");
      }
    } catch (error) {
      console.error("FRONTEND ERROR:", error);
      toast.error("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#09090b] text-zinc-300">
      <div className="mx-auto w-full max-w-[900px] px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <form
            onSubmit={onSubmitHandler}
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover overflow-hidden
            before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px
            before:bg-gradient-to-r before:from-[#5b21b6]/70 before:via-[#5b21b6]/25 before:to-transparent"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#c4b5fd]" />
              <h1 className="text-xl font-semibold text-white tracking-tight">
                Article writer
              </h1>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-400">
                  Article topic
                </label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  type="text"
                  placeholder="Future of AI in software development..."
                  className="w-full mt-3 rounded-xl bg-white/[0.03] border border-white/[0.10] px-4 py-4 text-sm text-white placeholder:text-zinc-600
                  focus:outline-none focus:ring-2 focus:ring-[#5b21b6]/35 focus:border-[#5b21b6]/45"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400">
                  Article length
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {articleLength.map((item) => {
                    const selected = selectedLength.text === item.text;
                    return (
                      <button
                        type="button"
                        key={item.text}
                        onClick={() => setSelectedLength(item)}
                        className={`text-xs px-4 py-2 rounded-full border transition-all duration-150 ${
                          selected
                            ? "bg-[#5b21b6]/20 text-[#ddd6fe] border-[#5b21b6]/40"
                            : "bg-transparent text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        {item.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold
                bg-[#5b21b6] hover:bg-[#4c1d95] disabled:opacity-60 disabled:hover:bg-[#5b21b6] transition-all duration-150"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                {loading ? "Generating..." : "Generate article"}
              </button>
            </div>
          </form>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover flex flex-col min-h-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#c4b5fd]" />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Output
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5b21b6]/12 border border-[#5b21b6]/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#c4b5fd]" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-200">
                    Ready when you are.
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Enter a topic, choose a length, and generate a polished article draft.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto text-sm text-zinc-300 leading-relaxed">
                <div className="reset-tw prose prose-invert max-w-none">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
