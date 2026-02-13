import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

/* ✅ IMPORTANT — DIRECT BACKEND URL */
const api = axios.create({
  baseURL: "http://localhost:3000", // must match your Express server
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
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-6 text-gray-200">
      {/* LEFT PANEL */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-5 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">
            Article Configuration
          </h1>
        </div>

        <label className="text-sm font-medium text-gray-300">
          Article Topic
        </label>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          type="text"
          placeholder="Future of AI..."
          className="w-full mt-2 p-2 px-3 rounded-md bg-[#0f0f0f] border border-gray-700 text-sm outline-none"
        />

        <p className="mt-5 text-sm font-medium text-gray-300">
          Article Length
        </p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {articleLength.map((item) => (
            <button
              type="button"
              key={item.text}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 rounded-full border ${
                selectedLength.text === item.text
                  ? "bg-blue-600 text-white border-blue-500"
                  : "border-gray-700 text-gray-400"
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-400"
        >
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* RIGHT PANEL */}
      <div className="w-full max-w-lg p-5 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md flex flex-col min-h-[400px]">
        <h1 className="text-xl font-semibold text-white mb-3">
          Generated Article
        </h1>

        {!content ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
            Generate an article to see result
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto text-sm leading-relaxed">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
