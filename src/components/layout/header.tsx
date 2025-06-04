
import { LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:hidden">
           <SidebarTrigger />
        </div>
        <LayoutDashboard className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-xl font-bold text-primary">Activity Insights</h1>
        {/* Add user menu or other header items here if needed */}
      </div>
    </header>
  );
}
