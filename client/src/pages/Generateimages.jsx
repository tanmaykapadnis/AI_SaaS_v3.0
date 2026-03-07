import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
                Image generation
              </h1>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-gray-400">Prompt</p>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  rows={4}
                  className="w-full mt-3 rounded-xl bg-white/[0.03] border border-white/[0.10] px-4 py-4 text-sm text-white placeholder:text-zinc-600
                  focus:outline-none focus:ring-2 focus:ring-[#5b21b6]/35 focus:border-[#5b21b6]/45"
                  placeholder="Describe what you want to see..."
                  required
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400">Style</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {imageStyle.map((item) => {
                    const selected = selectedStyle === item;
                    return (
                      <button
                        type="button"
                        onClick={() => setSelectedStyle(item)}
                        className={`text-xs px-4 py-2 border rounded-full transition-all duration-150 ${
                          selected
                            ? "bg-[#5b21b6]/20 text-[#ddd6fe] border-[#5b21b6]/40"
                            : "bg-transparent text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                        key={item}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    Publish to community
                  </p>
                  <p className="text-xs text-zinc-500">
                    Make this image visible in the public feed.
                  </p>
                </div>
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => setPublish(e.target.checked)}
                    checked={publish}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-[#5b21b6] transition-all duration-150 border border-white/10"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-150 peer-checked:translate-x-4"></span>
                </label>
              </div>

              <button
                disabled={loading}
                className="w-full mt-2 py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold
                bg-[#5b21b6] hover:bg-[#4c1d95] disabled:opacity-60 disabled:hover:bg-[#5b21b6] transition-all duration-150"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
                ) : (
                  <Image className="w-4 h-4" />
                )}
                {loading ? "Generating..." : "Generate image"}
              </button>
            </div>
          </form>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover flex flex-col min-h-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-5 h-5 text-[#c4b5fd]" />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Output
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5b21b6]/12 border border-[#5b21b6]/20 flex items-center justify-center">
                    <Image className="w-6 h-6 text-[#c4b5fd]" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-200">
                    Generate a clean image preview.
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Add a prompt, pick a style, and click generate.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex-1">
                <img
                  src={content}
                  alt="Generated"
                  className="w-full h-full max-h-[420px] object-contain rounded-xl border border-white/[0.08] bg-black/20"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
