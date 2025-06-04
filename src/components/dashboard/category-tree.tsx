
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListTree, ChevronRight, ChevronDown } from "lucide-react";
import React, { useState } from 'react';

interface CategoryTreeNode {
  name: string;
  time: string;
  children?: CategoryTreeNode[];
}

const categoryTreeData: CategoryTreeNode[] = [
  {
    name: "Work",
    time: "12h 15m 22s",
    children: [
      { 
        name: "Development Tools", 
        time: "8h 43m", 
        children: [
          { name: "AI Code Editing Tools", time: "4h 48s" },
          { name: "Core Programming", time: "3h 54m" },
        ]
      },
      { name: "Browsers", time: "3h 49m" },
      { name: "Meetings", time: "1h 20m" },
    ],
  },
  {
    name: "System Tools",
    time: "1h 2m 0s",
    children: [
      { name: "System Utilities", time: "1h 2m" },
    ],
  },
  {
    name: "Media",
    time: "55m 0s",
    children: [
      { name: "Streaming", time: "55m" },
    ],
  },
  { name: "Uncategorized", time: "45m 4s" },
];

const CategoryNode: React.FC<{ node: CategoryTreeNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(level < 1); // Open top-level by default, can be adjusted

  return (
    <li style={{ paddingLeft: level > 0 ? `${level * 0.5}rem` : '0rem' }} className="list-none">
      <div 
        className="flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={() => node.children && setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {node.children ? (
            isOpen ? <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground shrink-0" /> : <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground shrink-0" />
          ) : (
            <span className="w-5 mr-1 shrink-0"></span> 
          )}
          <span className="font-medium text-sm">{node.name}</span>
        </div>
        <span className="text-sm text-muted-foreground ml-2 shrink-0">{node.time}</span>
      </div>
      {isOpen && node.children && (
        <ul className="pt-1" style={{ paddingLeft: `1rem` }}> {/* Indent children */}
          {node.children.map((child, index) => (
            <CategoryNode key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export function CategoryTree() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ListTree className="h-5 w-5 mr-2 text-primary" />
          Category Tree
        </CardTitle>
        <CardDescription>Hierarchical view of time spent in categories.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <ul className="space-y-1">
          {categoryTreeData.map((node, index) => (
            <CategoryNode key={index} node={node} level={0} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
