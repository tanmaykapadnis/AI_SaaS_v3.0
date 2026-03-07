import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

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
