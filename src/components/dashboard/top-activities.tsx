"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListChecks, TerminalSquare } from "lucide-react";

const topAppsData = [
  { name: "Visual Studio Code", usage: "120 hours", icon: <TerminalSquare className="h-5 w-5 text-muted-foreground" /> },
  { name: "Google Chrome", usage: "95 hours", icon: <TerminalSquare className="h-5 w-5 text-muted-foreground" /> },
  { name: "Slack", usage: "60 hours", icon: <TerminalSquare className="h-5 w-5 text-muted-foreground" /> },
  { name: "Spotify", usage: "40 hours", icon: <TerminalSquare className="h-5 w-5 text-muted-foreground" /> },
  { name: "Terminal", usage: "35 hours", icon: <TerminalSquare className="h-5 w-5 text-muted-foreground" /> },
];

const topTitlesData = [
  { name: "Project X - main.py", usage: "30 hours", icon: <ListChecks className="h-5 w-5 text-muted-foreground" /> },
  { name: "Team Sync - Slack", usage: "25 hours", icon: <ListChecks className="h-5 w-5 text-muted-foreground" /> },
  { name: "Documentation - Confluence", usage: "20 hours", icon: <ListChecks className="h-5 w-5 text-muted-foreground" /> },
  { name: "Research Paper XYZ - Google Scholar", usage: "18 hours", icon: <ListChecks className="h-5 w-5 text-muted-foreground" /> },
  { name: "Inbox - Gmail", usage: "15 hours", icon: <ListChecks className="h-5 w-5 text-muted-foreground" /> },
];

interface ActivityItem {
  name: string;
  usage: string;
  icon: React.ReactNode;
}

function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="flex items-center">
            <span className="mr-3">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{item.usage}</span>
        </li>
      ))}
    </ul>
  );
}

export function TopActivities() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TerminalSquare className="h-5 w-5 mr-2 text-primary" />
            Top Applications
          </CardTitle>
          <CardDescription>Most frequently used applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityList items={topAppsData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ListChecks className="h-5 w-5 mr-2 text-primary" />
            Top Window Titles
          </CardTitle>
          <CardDescription>Most frequent window titles.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityList items={topTitlesData} />
        </CardContent>
      </Card>
    </>
  );
}
