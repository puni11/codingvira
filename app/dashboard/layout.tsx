"use client";

import Sidebar from "@/component/Sidebar";
import Topbar from "@/component/Topbar";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
const { data: session } = useSession();
    if (!session) {
        return <div className="flex items-center justify-center h-screen">Please log in to access the dashboard.</div>;
    }
  return (
    <div className="min-h-screen flex font-['Inter',sans-serif] mt-20">
      <Sidebar collapsed={collapsed} />

      <div className={`flex-1 transition-all ${collapsed ? "ml-20" : "ml-64"}`}>
        <Topbar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
