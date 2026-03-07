import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post("/api/ai/remove-image-background", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
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
                Background removal
              </h1>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-gray-400">Upload image</p>
                <input
                  onChange={(e) => setInput(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="w-full mt-3 rounded-xl bg-white/[0.03] border border-white/[0.10] px-4 py-4 text-sm text-zinc-200 file:mr-4 file:rounded-lg file:border-0 file:bg-[#5b21b6] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#4c1d95]
                  focus:outline-none focus:ring-2 focus:ring-[#5b21b6]/35 focus:border-[#5b21b6]/45"
                  required
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Supports JPG, PNG, and other common image formats.
                </p>
              </div>

              <button
                disabled={loading}
                className="w-full mt-2 py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold
                bg-[#5b21b6] hover:bg-[#4c1d95] disabled:opacity-60 disabled:hover:bg-[#5b21b6] transition-all duration-150"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
                ) : (
                  <Eraser className="w-4 h-4" />
                )}
                {loading ? "Processing..." : "Remove background"}
              </button>
            </div>
          </form>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover flex flex-col min-h-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <Eraser className="w-5 h-5 text-[#c4b5fd]" />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Output
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5b21b6]/12 border border-[#5b21b6]/20 flex items-center justify-center">
                    <Eraser className="w-6 h-6 text-[#c4b5fd]" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-200">
                    Upload an image to begin.
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    We’ll remove the background and return a clean cutout.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex-1">
                <img
                  src={content}
                  alt="Processed"
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

export default RemoveBackground;
