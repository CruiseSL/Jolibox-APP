"use client";

import { Home, LayoutGrid, Gift, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/home", active: pathname === "/home" },
    { icon: Gift, label: "Rewards", href: "/", active: pathname === "/" },
    { icon: LayoutGrid, label: "For You", href: "/foryou", active: pathname === "/foryou" },
    { icon: User, label: "Me", href: "/me", active: pathname === "/me" },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-gray-800 bg-[#1a1a1a] z-50">
      <div className="flex h-[80px] pb-4 items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 w-full h-full",
              item.active ? "text-purple-500" : "text-gray-500"
            )}
          >
            <item.icon
              className={cn("h-6 w-6 mt-2", item.active && "fill-current")}
              strokeWidth={item.active ? 2.5 : 2}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
