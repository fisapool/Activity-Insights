
import { Header } from "@/components/layout/header"; // This might be removed if header is in layout
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { TopApplicationsCard, TopWindowTitlesCard } from "@/components/dashboard/top-activities";
import { TopCategoriesCard } from "@/components/dashboard/top-categories-card";
import { CategoryTree } from "@/components/dashboard/category-tree";
import { CategorySunburstChart } from "@/components/dashboard/category-sunburst-chart";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        <TopApplicationsCard />
        <TopWindowTitlesCard />
        <ActivityTimeline />
        <TopCategoriesCard />
        <CategoryTree />
        <CategorySunburstChart />
      </div>
    </main>
  );
}
