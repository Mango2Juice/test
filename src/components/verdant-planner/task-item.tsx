"use client";

import { Bell, BellOff, Trash2, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onSetReminder: (taskId: string, reminder: boolean) => void;
}

export default function TaskItem({ task, onToggleComplete, onDeleteTask, onSetReminder }: TaskItemProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg bg-card border transition-all duration-300",
        task.completed ? "bg-secondary/50 border-transparent" : "hover:bg-secondary/30"
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleComplete(task.id)}
        className="h-6 w-6 rounded-full"
        aria-labelledby={`task-label-${task.id}`}
      />
      <div className="flex-1">
        <label
          id={`task-label-${task.id}`}
          htmlFor={`task-${task.id}`}
          className={cn(
            "font-medium cursor-pointer transition-colors",
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}
        >
          {task.title}
        </label>
        <p className={cn(
            "text-sm flex items-center gap-1.5",
            task.completed ? "text-muted-foreground/80" : "text-muted-foreground"
        )}>
          <Clock className="h-3.5 w-3.5" />
          {task.time}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSetReminder(task.id, !task.reminder)}
        className="text-muted-foreground hover:text-accent-foreground"
        aria-label={task.reminder ? "Disable reminder" : "Enable reminder"}
      >
        {task.reminder ? <Bell className="h-5 w-5 text-accent" /> : <BellOff className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(task.id)}
        className="text-muted-foreground hover:text-destructive"
        aria-label="Delete task"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </li>
  );
}
