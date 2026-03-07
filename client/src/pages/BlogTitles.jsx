import { useAuth } from "@clerk/clerk-react";
import { Hash, Sparkles, ListOrdered } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const prompt = `
Generate 5 engaging SEO-friendly blog titles.

Keyword: ${input}
Category: ${selectedCategory}

Return only the titles as a clean numbered list.
`;

      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Titles generated!");
      } else {
        toast.error(data.message || "Failed to generate titles");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
                Blog title generator
              </h1>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-400">
                  Keyword
                </label>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="AI in healthcare..."
                  className="w-full mt-3 rounded-xl bg-white/[0.03] border border-white/[0.10] px-4 py-4 text-sm text-white placeholder:text-zinc-600
                  focus:outline-none focus:ring-2 focus:ring-[#5b21b6]/35 focus:border-[#5b21b6]/45"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400">Category</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {blogCategories.map((item) => {
                    const selected = selectedCategory === item;
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSelectedCategory(item)}
                        className={`text-xs px-4 py-2 rounded-full border transition-all duration-150 ${
                          selected
                            ? "bg-[#5b21b6]/20 text-[#ddd6fe] border-[#5b21b6]/40"
                            : "bg-transparent text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        {item}
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
                  <Hash className="w-4 h-4" />
                )}
                {loading ? "Generating..." : "Generate titles"}
              </button>
            </div>
          </form>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover flex flex-col min-h-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <ListOrdered className="w-5 h-5 text-[#c4b5fd]" />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Output
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5b21b6]/12 border border-[#5b21b6]/20 flex items-center justify-center">
                    <Hash className="w-6 h-6 text-[#c4b5fd]" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-200">
                    Generate SEO-friendly titles.
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Add a keyword, pick a category, and we’ll suggest 5 options.
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

export default BlogTitles;
