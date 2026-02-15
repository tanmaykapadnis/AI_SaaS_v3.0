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
    <div className={`w-64 glass border-r border-white/5 flex flex-col justify-between
    max-sm:absolute top-14 bottom-0 z-20
    ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
    transition-all duration-300`}>

      <div className="p-6">
        <img src={user.imageUrl} className="w-14 rounded-full mx-auto" />
        <h1 className="mt-3 text-center font-medium">{user.fullName}</h1>

        <div className="mt-8 space-y-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center gap-3 rounded-xl transition-all
                ${isActive
                  ? "bg-white/5 glow-border text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"}`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-white/5">
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <LogOut className="w-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
