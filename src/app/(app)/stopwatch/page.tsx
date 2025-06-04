
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const formatTime = (timeMs: number): string => {
  const totalCentiseconds = Math.floor(timeMs / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
};

interface Lap {
  lapNumber: number;
  time: number;
  lapDuration?: number; 
}

export default function StopwatchPage() {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0); 
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      timerIntervalRef.current = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTimeSinceStart = currentTime - startTimeRef.current;
        setTime(accumulatedTimeRef.current + elapsedTimeSinceStart);
      }, 10); // Update every 10ms for centiseconds
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning]);

  const handlePrimaryButtonClick = () => { // Start/Pause/Resume
    if (isRunning) { // Pausing
      accumulatedTimeRef.current = time;
      setIsRunning(false);
    } else { // Starting or Resuming
      // accumulatedTimeRef already holds the paused time or is 0 if fresh start.
      // startTimeRef will be set in the useEffect when isRunning becomes true.
      setIsRunning(true);
    }
  };

  const handleSecondaryButtonClick = () => { // Lap/Reset
    if (isRunning) { // Lap
      setLaps((prevLaps) => [...prevLaps, { lapNumber: prevLaps.length + 1, time: time }]);
    } else { // Reset
      setIsRunning(false);
      setTime(0);
      setLaps([]);
      accumulatedTimeRef.current = 0;
    }
  };

  const primaryButtonText = isRunning ? 'Pause' : (time > 0 ? 'Resume' : 'Start');
  const secondaryButtonText = isRunning ? 'Lap' : 'Reset';

  const processedLaps = laps.map((lap, index, arr) => {
    const prevLapTime = index > 0 ? arr[index - 1].time : 0;
    const lapDuration = lap.time - prevLapTime;
    return { ...lap, lapDuration };
  }).slice().reverse();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mb-6 text-center">
        <h1 className="text-3xl font-semibold text-foreground">Stopwatch</h1>
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="text-center mb-8">
            <div className="text-7xl font-mono text-foreground tracking-tight tabular-nums">
              {formatTime(time)}
            </div>
          </div>
          <div className="flex justify-around mb-6">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryButtonClick}
              disabled={!isRunning && time === 0} // Reset disabled if pristine
              className="w-32"
            >
              {secondaryButtonText}
            </Button>
            <Button
              variant={isRunning ? "destructive" : "default"}
              size="lg"
              onClick={handlePrimaryButtonClick}
              className="w-32"
            >
              {primaryButtonText}
            </Button>
          </div>
          {laps.length > 0 && (
            <ScrollArea className="h-[240px] w-full rounded-md border p-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Lap</TableHead>
                    <TableHead className="w-1/2 text-right">Lap Time</TableHead>
                    <TableHead className="w-1/4 text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedLaps.map((lap) => (
                    <TableRow key={lap.lapNumber}>
                      <TableCell className="font-medium">{lap.lapNumber}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatTime(lap.lapDuration || 0)}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatTime(lap.time)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

