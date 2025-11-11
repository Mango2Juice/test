"use client";

import { FilePlus2 } from "lucide-react";
import TaskItem from "./task-item";
import { type Task } from "@/lib/types";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId:string) => void;
  onSetReminder: (taskId: string, reminder: boolean) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDeleteTask, onSetReminder }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <FilePlus2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">No tasks scheduled</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a task to get your day organized.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onSetReminder={onSetReminder}
        />
      ))}
    </ul>
  );
}
