
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Timer, Eye, Wrench, Database, SettingsIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  matchSegments?: number; // Number of path segments to match for active state
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard />, matchSegments: 1 },
  { href: "/stopwatch", label: "Stopwatch", icon: <Timer />, matchSegments: 1 },
  { href: "/activity-watch", label: "ActivityWatch", icon: <Eye />, matchSegments: 1 },
  { href: "/tools", label: "Tools", icon: <Wrench />, matchSegments: 1 },
  { href: "/raw-data", label: "Raw Data", icon: <Database />, matchSegments: 1 },
  { href: "/settings", label: "Settings", icon: <SettingsIcon />, matchSegments: 1 },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string, matchSegments?: number) => {
    if (matchSegments) {
      const pathSegments = pathname.split("/").filter(Boolean);
      const hrefSegments = href.split("/").filter(Boolean);
      if (pathSegments.length < matchSegments || hrefSegments.length < matchSegments) {
        return false;
      }
      for (let i = 0; i < matchSegments; i++) {
        if (pathSegments[i] !== hrefSegments[i]) {
          return false;
        }
      }
      return true;
    }
    return pathname === href;
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href, item.matchSegments)}
              tooltip={{children: item.label, className: "group-data-[collapsible=icon]:block hidden"}}
            >
              <a> {/*<a> tag is required by asChild with next/link and SidebarMenuButton */}
                {item.icon}
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
