import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen bg-[#09090b]">
      {/* Navbar */}
      <nav className="w-full px-6 lg:px-8 h-14 flex items-center justify-between border-b border-white/[0.06] bg-[#09090b] transition-colors">
        <img
          className="cursor-pointer w-28 sm:w-36 transition-opacity hover:opacity-90"
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />

        {/* Mobile menu toggle */}
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-5 h-5 text-zinc-400 sm:hidden cursor-pointer hover:text-white transition-colors"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-5 h-5 text-zinc-400 sm:hidden cursor-pointer hover:text-white transition-colors"
          />
        )}
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 w-full h-[calc(100vh-56px)] overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Main content area */}
        <div className="flex-1 bg-[#09090b] text-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[#09090b]">
      <SignIn />
    </div>
  );
};

export default Layout;
