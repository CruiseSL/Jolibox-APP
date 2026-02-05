"use client";

import { Home, LayoutGrid, Gift, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/home", active: pathname === "/home" },
    { icon: LayoutGrid, label: "Discovery", href: "/discover", active: pathname === "/discover" },
    { icon: Gift, label: "Rewards", href: "/", active: pathname === "/" },
    { icon: User, label: "Me", href: "/me", active: pathname === "/me" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t bg-white pb-safe z-50">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 w-full h-full",
              item.active ? "text-black" : "text-gray-500"
            )}
          >
            <item.icon
              className={cn("h-6 w-6", item.active && "fill-current")}
              strokeWidth={item.active ? 2.5 : 2}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
