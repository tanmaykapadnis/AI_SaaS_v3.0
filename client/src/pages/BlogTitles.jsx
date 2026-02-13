import { useAuth } from "@clerk/clerk-react";
import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";

// Base URL from .env (ex: http://localhost:3000)
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
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-6 text-gray-200">
      {/* LEFT PANEL */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-5 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">
            Blog Title Generator
          </h1>
        </div>

        <label className="text-sm font-medium text-gray-300">
          Enter Keyword
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="AI in Healthcare..."
          className="w-full mt-2 p-2 px-3 rounded-md bg-[#0f0f0f] border border-gray-700 text-sm outline-none"
        />

        <p className="mt-5 text-sm font-medium text-gray-300">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {blogCategories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 rounded-full border transition ${
                selectedCategory === item
                  ? "bg-blue-600 text-white border-blue-500"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {item}
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
            <Hash className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "Generate Titles"}
        </button>
      </form>

      {/* RIGHT PANEL */}
      <div className="w-full max-w-lg p-5 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md flex flex-col min-h-[400px] max-h-[600px]">
        <div className="flex items-center gap-3 mb-3">
          <Hash className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">
            Generated Titles
          </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
            Enter a keyword and click generate to see titles here.
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

export default BlogTitles;
