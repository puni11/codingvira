"use client";

import { LayoutDashboard, Users, Settings, Loader2, CheckCircle, LogOut, PenSquareIcon, ListCheckIcon, UserCheck2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleLogout = async () => {
    if (status === "loading") return;

    setStatus("loading");

    await signOut({
      redirect: false,
    });

    setStatus("success");

    // Small UX delay before redirect
    setTimeout(() => {
      window.location.href = "/login";
    }, 600);
  };
  const nav = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
     { name: "Create Blog", href: "/dashboard/blog/create", icon: PenSquareIcon },
      { name: "Blog List", href: "/dashboard/blog", icon: ListCheckIcon },
        { name: "Enquiry", href: "/dashboard/contacts", icon: UserCheck2 },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-20 h-full bg-white border-r border-gray-200
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="h-16 flex items-center justify-center border-b">
        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold">
          C
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
              transition-all
              ${active ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"}
              `}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
         <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-3 cursor-pointer rounded-xl
      text-sm font-medium text-gray-600 w-full
      hover:bg-gray-100 transition-all"
    >
      {status === "loading" && <Loader2 size={16} className="animate-spin" />}
      {status === "success" && <CheckCircle size={16} />}
      {status === "idle" && <LogOut size={16} />}

      <span>Logout</span>
    </button>
      </nav>
     
    </aside>
  );
}
