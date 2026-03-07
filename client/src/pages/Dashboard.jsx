import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem, Sparkles, SquarePen, Hash, Image, Eraser, Scissors, FileText } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const quickActions = [
  {
    title: "Article Writer",
    desc: "Generate full articles with AI.",
    icon: SquarePen,
    path: "/ai/write-article",
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
  },
  {
    title: "Blog Titles",
    desc: "Create catchy titles for posts.",
    icon: Hash,
    path: "/ai/blog-titles",
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-400",
  },
  {
    title: "Image Generation",
    desc: "Turn text into high-quality images.",
    icon: Image,
    path: "/ai/generate-images",
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
  },
  {
    title: "Remove Background",
    desc: "Isolate subjects from any image.",
    icon: Eraser,
    path: "/ai/remove-background",
    color: "from-orange-500/20 to-orange-500/5",
    accent: "text-orange-400",
  },
  {
    title: "Remove Object",
    desc: "Clean up unwanted image elements.",
    icon: Scissors,
    path: "/ai/remove-object",
    color: "from-pink-500/20 to-pink-500/5",
    accent: "text-pink-400",
  },
  {
    title: "Resume Review",
    desc: "Get AI feedback on your resume.",
    icon: FileText,
    path: "/ai/review-resume",
    color: "from-cyan-500/20 to-cyan-500/5",
    accent: "text-cyan-400",
  },
];

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-8 text-zinc-300 bg-[#09090b]">
      {/* Top Stats Section */}
      <div className="flex flex-wrap gap-4 mb-10">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-5 rounded-xl bg-[#09090b] border border-white/[0.08] card-hover">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Total Creations
            </p>
            <h2 className="text-2xl font-semibold text-white mt-1.5">
              {creations.length}
            </h2>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#5b21b6]/16 flex justify-center items-center border border-[#5b21b6]/28">
            <Sparkles className="w-5 text-[#c4b5fd]" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-5 rounded-xl bg-[#09090b] border border-white/[0.08] card-hover">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Active Plan
            </p>
            <h2 className="text-2xl font-semibold text-white mt-1.5">
              <Protect plan={"premium"} fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#5b21b6]/16 flex justify-center items-center border border-[#5b21b6]/28">
            <Gem className="w-5 text-[#c4b5fd]" />
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <div
              key={idx}
              onClick={() => navigate(action.path)}
              className={`group cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${action.color} border border-white/[0.06] hover:border-white/15 hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${action.accent}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold mb-1">{action.title}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {action.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[320px]">
          <span className="w-10 h-10 rounded-full border-2 border-[#5b21b6]/30 border-t-[#5b21b6] animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Recent Creations
          </h3>
          {creations.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center py-24 text-zinc-500 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <Sparkles className="w-12 h-12 mb-4 text-zinc-600" />
              <p className="text-sm font-medium">No creations yet.</p>
              <p className="text-xs mt-1">Start exploring AI tools to create something.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
