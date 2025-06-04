
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

// Placeholder data - replace with actual data source
const topCategoriesData = [
  { name: "Work > Dev Tools > AI Coding", usage: "4h 48s" },
  { name: "Work > Dev Tools > Core Prog", usage: "3h 54m" },
  { name: "Work > Browsers", usage: "3h 49m" },
  { name: "System Tools > System Utilities", usage: "1h 2m" },
  { name: "Media > Streaming", usage: "55m" },
];

interface CategoryItem {
  name: string;
  usage: string;
}

function CategoryList({ items }: { items: CategoryItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="flex items-center">
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{item.usage}</span>
        </li>
      ))}
    </ul>
  );
}

export function TopCategoriesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Top Categories
        </CardTitle>
        <CardDescription>Most active categories by time spent.</CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryList items={topCategoriesData} />
      </CardContent>
    </Card>
  );
}
