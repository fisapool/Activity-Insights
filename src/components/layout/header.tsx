import { LayoutDashboard } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <LayoutDashboard className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-xl font-bold text-primary">Activity Insights Dashboard</h1>
      </div>
    </header>
  );
}
