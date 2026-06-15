import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ScanText, FileText, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "CV Builder", path: "/builder", icon: FileText },
  { label: "Resume Reviewer", path: "/reviewer", icon: ScanText },
];

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = (isMobile = false) => (
    <nav className={`flex ${isMobile ? "flex-row gap-1 px-3" : "flex-col gap-1 px-3 py-3"}`}>
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => { navigate(path); setDrawerOpen(false); }}
            title={collapsed && !isMobile ? label : ""}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
              active
                ? "bg-[#4DB6AC] text-white font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-[#E0F2F1]"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            {(!collapsed || isMobile) && <span>{label}</span>}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      <aside className={`hidden md:flex flex-col shrink-0 bg-white border-r border-[#E0F2F1] transition-all duration-200 ${
        collapsed ? "w-14" : "w-52"
      }`}>

        <div className={`flex items-center gap-2.5 px-4 h-14 border-b border-[#E0F2F1] shrink-0 ${
          collapsed ? "justify-center px-0" : ""
        }`}>
          <div className="w-7 h-7 bg-[#4DB6AC] rounded-lg flex items-center justify-center shrink-0">
            <FileText size={14} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-gray-900 tracking-tight">EasyCv</span>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {navLinks()}
        </div>

        <div className="border-t border-[#E0F2F1] p-2 flex justify-center shrink-0">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-md text-gray-400 hover:text-[#4DB6AC] hover:bg-[#E0F2F1] transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-20 h-12 flex items-center justify-between px-4 bg-white border-b border-[#E0F2F1]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#4DB6AC] rounded-md flex items-center justify-center">
            <FileText size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">EasyCv</span>
        </div>

        <div className="flex items-center">
          {navLinks(true)}
        </div>
      </div>

      <main className="flex-1 overflow-hidden md:mt-0 mt-12">
        <Outlet />
      </main>

    </div>
  );
};