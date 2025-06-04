
import { Header } from "@/components/layout/header";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { TopApplicationsCard, TopWindowTitlesCard } from "@/components/dashboard/top-activities";
import { TopCategoriesCard } from "@/components/dashboard/top-categories-card";
import { CategoryTree } from "@/components/dashboard/category-tree";
import { CategorySunburstChart } from "@/components/dashboard/category-sunburst-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <TopApplicationsCard />
          <TopWindowTitlesCard />
          <ActivityTimeline />
          <TopCategoriesCard />
          <CategoryTree />
          <CategorySunburstChart />
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t mt-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by Activity Insights.
          </p>
        </div>
      </footer>
    </div>
  );
}
