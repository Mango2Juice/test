"use client";

import { useMemo } from "react";
import { format, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TaskList from "./task-list";
import { type Task } from "@/lib/types";

interface DayOverviewProps {
  selectedDate: Date;
  tasks: Task[];
  onDateChange: (direction: "prev" | "next") => void;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onSetReminder: (taskId: string, reminder: boolean) => void;
}

export default function DayOverview({
  selectedDate,
  tasks,
  onDateChange,
  onToggleComplete,
  onDeleteTask,
  onSetReminder,
}: DayOverviewProps) {
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  const dateLabel = useMemo(() => {
    return isToday(selectedDate)
      ? "Today's Schedule"
      : format(selectedDate, "EEEE, MMMM d");
  }, [selectedDate]);

  return (
    <Card className="w-full shadow-lg border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => onDateChange("prev")} aria-label="Previous day">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <CardTitle className="text-2xl font-headline">{dateLabel}</CardTitle>
            <CardDescription>{format(selectedDate, "yyyy")}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDateChange("next")} aria-label="Next day">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{completedTasks} / {tasks.length}</span>
          </div>
          <Progress value={progress} className="h-2 [&>div]:bg-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={tasks}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onSetReminder={onSetReminder}
        />
      </CardContent>
    </Card>
  );
}
