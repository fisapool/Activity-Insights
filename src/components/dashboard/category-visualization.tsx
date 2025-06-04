"use client";

import * as React from "react";
import { Treemap as RechartsTreemap, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Network } from "lucide-react";

const data = [
  {
    name: "Work",
    size: 1200,
    children: [
      { name: "Coding", size: 700, fill: "hsl(var(--chart-1))" },
      { name: "Meetings", size: 300, fill: "hsl(var(--chart-2))" },
      { name: "Email", size: 200, fill: "hsl(var(--chart-3))" },
    ],
    fill: "hsl(var(--primary))",
  },
  {
    name: "Personal",
    size: 800,
    children: [
      { name: "Browsing", size: 400, fill: "hsl(var(--chart-4))" },
      { name: "Social Media", size: 250, fill: "hsl(var(--chart-5))" },
      { name: "Learning", size: 150, fill: "hsl(var(--accent))" },
    ],
    fill: "hsl(var(--secondary))",
  },
  {
    name: "Utilities",
    size: 300,
    children: [
        { name: "System Settings", size: 100, fill: "hsl(var(--muted-foreground))" },
        { name: "File Explorer", size: 200, fill: "hsl(var(--border))" },
    ],
    fill: "hsl(var(--muted))",
  }
];

const chartConfig = {
  // Define colors for categories if needed, or rely on data `fill` properties
} satisfies ChartConfig;

// Custom Tooltip for Treemap
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Access the full data object
    return (
      <div className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-md shadow-lg border border-border">
        <p className="font-semibold">{`${data.name}`}</p>
        <p className="text-sm">{`Time Spent: ${data.value || data.size} units`}</p> {/* value is often used, but size is in our data */}
      </div>
    );
  }
  return null;
};

// Custom content for Treemap cells to render labels
const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, index, name, value } = props;
  // Only show label for larger boxes or top-level categories
  const showLabel = (width * height > 5000 && width > 50 && height > 20) || depth === 1;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth === 1 ? props.root.children[index].fill : props.fill, // Use fill from data
          stroke: 'hsl(var(--background))', // Use background for stroke for clear separation
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {showLabel && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="hsl(var(--primary-foreground))" // Use primary-foreground for good contrast on colored boxes
          fontSize={14}
          fontWeight="bold"
        >
          {name}
        </text>
      )}
      {showLabel && depth > 1 && (
         <text
          x={x + width / 2}
          y={y + height / 2 + 24}
          textAnchor="middle"
          fill="hsl(var(--primary-foreground))"
          fontSize={10}
        >
          {value} units
        </text>
      )}
    </g>
  );
};


export function CategoryVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="h-5 w-5 mr-2 text-primary" />
          Activity Categories
        </CardTitle>
        <CardDescription>Hierarchical view of time spent in different categories.</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsTreemap
              data={data}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="hsl(var(--card))" // Use card background for stroke
              fill="hsl(var(--accent))" // Default fill if not specified in data
              content={<CustomizedContent />}
              isAnimationActive={true}
              animationDuration={300}
              animationEasing="ease-out"
            >
              <RechartsTooltip content={<CustomTooltip />} />
            </RechartsTreemap>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
