
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Activity } from "lucide-react";

// Placeholder data for hourly stacked bar chart
const hourlyActivityData = [
  { hour: "04", "BLACKBOXAI.exe": 10, "Code.exe": 20, "chrome.exe": 15, "msedge.exe": 5, "Other": 3 },
  { hour: "06", "BLACKBOXAI.exe": 5, "Code.exe": 25, "chrome.exe": 10, "Other": 5 },
  { hour: "08", "Code.exe": 30, "chrome.exe": 20, "Slack.exe": 10, "Other": 2 },
  { hour: "10", "BLACKBOXAI.exe": 15, "Code.exe": 35, "msedge.exe": 10, "Other": 4 },
  { hour: "12", "chrome.exe": 25, "Slack.exe": 15, "Other": 10 },
  { hour: "14", "Code.exe": 40, "BLACKBOXAI.exe": 10, "Other": 7 },
  { hour: "16", "chrome.exe": 30, "msedge.exe": 20, "Other": 3 },
  { hour: "18", "Code.exe": 20, "Slack.exe": 25, "BLACKBOXAI.exe": 5, "Other": 8 },
  { hour: "20", "chrome.exe": 20, "Other": 15 },
  { hour: "22", "BLACKBOXAI.exe": 10, "Code.exe": 10, "Other": 5 },
];

const appKeys = Array.from(
  hourlyActivityData.reduce((acc, curr) => {
    Object.keys(curr).forEach(key => key !== 'hour' && acc.add(key));
    return acc;
  }, new Set<string>())
);

const appColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted))",
];

const chartConfig = appKeys.reduce((config, key, index) => {
  config[key] = {
    label: key.replace(".exe", "").replace(/([A-Z])/g, ' $1').trim(), // Add space before caps for readability
    color: appColors[index % appColors.length],
  };
  return config;
}, {} as ChartConfig);


export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Activity Timeline
        </CardTitle>
        <CardDescription>Hourly user activity breakdown by application (times in minutes).</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyActivityData} accessibilityLayer barCategoryGap="10%">
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis 
                tickFormatter={(value) => `${value}m`} 
                label={{ value: 'Time (minutes)', angle: -90, position: 'insideLeft', offset: 0, style: {textAnchor: 'middle'} }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent indicator="dot" />} 
              />
              <Legend verticalAlign="top" height={36} />
              {appKeys.map((key) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  stackId="a" 
                  fill={`var(--color-${key})`} 
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
