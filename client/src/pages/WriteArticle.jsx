import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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

      const prompt = `Write a detailed, high-quality article about "${topic}".`;

      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
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
        toast.success("Article generated successfully");
      } else {
        toast.error(data.message || "Failed to generate article");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-6 text-gray-200">
      {/* LEFT: CONFIG */}
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
          placeholder="The future of artificial intelligence..."
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
              className={`text-xs px-4 py-1 rounded-full border transition ${
                selectedLength.text === item.text
                  ? "bg-blue-600 text-white border-blue-500"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Edit className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* RIGHT: OUTPUT */}
      <div className="w-full max-w-lg p-5 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md flex flex-col min-h-[400px] max-h-[600px]">
        <div className="flex items-center gap-3 mb-3">
          <Edit className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">
            Generated Article
          </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
            Enter a topic and generate an article to see the result here
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
