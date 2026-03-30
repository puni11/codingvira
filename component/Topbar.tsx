"use client";

import { Menu } from "lucide-react";

export default function Topbar({
  collapsed,
  toggle,
}: {
  collapsed: boolean;
  toggle: () => void;
}) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
      <button
        onClick={toggle}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Menu size={18} />
      </button>

      <div className="ml-auto flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
}
