
"use client";

import * as React from "react";
import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Tooltip as RechartsTooltip, Cell, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { PieChart as PieChartIcon } from "lucide-react";

const dataOuterRing = [
  { name: "Work", value: 600, fill: "hsl(var(--chart-1))" },
  { name: "System Tools", value: 200, fill: "hsl(var(--chart-2))" },
  { name: "Media", value: 100, fill: "hsl(var(--chart-3))" },
  { name: "Uncategorized", value: 100, fill: "hsl(var(--chart-4))" },
];

const dataInnerRing = [
  // Subcategories of Work
  { name: "Dev Tools (Work)", value: 300, fill: "hsl(var(--chart-1))", fillOpacity: 0.8 },
  { name: "Browsers (Work)", value: 200, fill: "hsl(var(--chart-1))", fillOpacity: 0.65 },
  { name: "Meetings (Work)", value: 100, fill: "hsl(var(--chart-1))", fillOpacity: 0.5 },
  // Subcategories of System Tools
  { name: "Sys Utilities (Sys)", value: 200, fill: "hsl(var(--chart-2))", fillOpacity: 0.8 },
  // Subcategories of Media
  { name: "Streaming (Media)", value: 100, fill: "hsl(var(--chart-3))", fillOpacity: 0.8 },
  // Uncategorized
  { name: "Details (Uncat.)", value: 100, fill: "hsl(var(--chart-4))", fillOpacity: 0.8 },
];

// Combine data for a unified legend if desired, or manage legends separately
const chartConfig = [
    ...dataOuterRing,
    // ...dataInnerRing // Add inner ring data to config if its labels are needed in a complex legend
].reduce((acc, cur) => {
    acc[cur.name] = {label: cur.name, color: cur.fill};
    return acc;
}, {} as ChartConfig);


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-md shadow-lg border border-border">
        <p className="font-semibold">{`${payload[0].name}`}</p> {/* Use payload[0].name for correct legend name */}
        <p className="text-sm">{`Time Spent: ${payload[0].value} units`}</p>
      </div>
    );
  }
  return null;
};

export function CategorySunburstChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
          Category Sunburst
        </CardTitle>
        <CardDescription>Time distribution across activity categories.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconSize={10} />
              <Pie
                data={dataOuterRing}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%" 
                innerRadius="60%"
                labelLine={false}
                // label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} // Example label
              >
                {dataOuterRing.map((entry, index) => (
                  <Cell key={`cell-outer-${index}`} fill={entry.fill} stroke="hsl(var(--background))" strokeWidth={2}/>
                ))}
              </Pie>
              <Pie
                data={dataInnerRing}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="55%"
                innerRadius="35%"
                labelLine={false}
                // label={({ name }) => name} // Example label for inner ring
              >
                 {dataInnerRing.map((entry, index) => (
                  <Cell key={`cell-inner-${index}`} fill={entry.fill} style={{fillOpacity: entry.fillOpacity || 1}} stroke="hsl(var(--background))" strokeWidth={2}/>
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
