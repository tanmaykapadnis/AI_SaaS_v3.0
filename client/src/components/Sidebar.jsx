import { useClerk, useUser } from "@clerk/clerk-react";
import { House, SquarePen, Hash, Image, Eraser, Scissors, FileText, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div
      className={`w-64 flex-shrink-0 bg-[#09090b] border-r border-white/[0.06] flex flex-col justify-between
      max-sm:absolute top-14 bottom-0 z-20 max-sm:bg-[#09090b]/95 max-sm:backdrop-blur-sm
      ${sidebar ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}
      transition-transform duration-200 ease-out`}
    >
      <div className="p-5">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full mx-auto object-cover ring-1 ring-white/[0.08]"
        />
        <h1 className="mt-3 text-center text-sm font-medium text-zinc-300 truncate px-2">
          {user.fullName}
        </h1>

        <div className="mt-6 space-y-0.5">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-violet-500/15 text-violet-400 border-l-2 border-violet-500 -ml-[2px] pl-[14px]"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 border-l-2 border-transparent"}`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="p-5 border-t border-white/[0.06]">
        <button
          onClick={signOut}
          className="flex items-center gap-2.5 text-sm text-zinc-500 hover:text-zinc-300 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-150"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
