import { Header } from "@/components/layout/header";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { TopActivities } from "@/components/dashboard/top-activities";
import { CategoryVisualization } from "@/components/dashboard/category-visualization";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-6 md:gap-8">
          {/* Row 1: Activity Timeline */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ActivityTimeline />
          </div>

          {/* Row 2: Top Activities */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <TopActivities />
          </div>
          
          {/* Row 3: Category Sunburst/Treemap */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <CategoryVisualization />
          </div>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by Activity Insights.
          </p>
        </div>
      </footer>
    </div>
  );
}
