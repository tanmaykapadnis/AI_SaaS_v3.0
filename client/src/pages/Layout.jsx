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
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-8 h-14 flex items-center justify-between border-b border-gray-700 bg-[#0a0a0a]">
        <img
          className="cursor-pointer w-32 sm:w-44"
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />

        {/* Mobile menu toggle */}
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-300 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-300 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Main layout */}
      <div className="flex flex-1 w-full h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Main content area */}
        <div className="flex-1 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
      <SignIn />
    </div>
  );
};

export default Layout;
