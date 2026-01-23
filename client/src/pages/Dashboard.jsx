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
    <div className="h-full overflow-y-scroll p-6 text-gray-200 bg-transparent">
      {/* Top Stats Section */}
      <div className="flex flex-wrap gap-4">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md">
          <div>
            <p className="text-sm font-semibold text-gray-400">Total Creations</p>
            <h2 className="text-2xl font-semibold text-white mt-1">
              {creations.length}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex justify-center items-center shadow-md">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-md">
          <div>
            <p className="text-sm font-semibold text-gray-400">Active Plan</p>
            <h2 className="text-2xl font-semibold text-white mt-1">
              <Protect plan={"premium"} fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex justify-center items-center shadow-md">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-11 h-11 rounded-full border-4 border-[#9E53EE] border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <p className="text-lg font-semibold text-gray-300 mb-2">
            Recent Creations
          </p>
          {creations.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center py-20 text-gray-400">
              <Sparkles className="w-10 h-10 mb-3 text-gray-500" />
              <p>No creations yet. Start exploring AI tools!</p>
            </div>
          ) : (
            creations.map((item) => <CreationItem key={item.id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
