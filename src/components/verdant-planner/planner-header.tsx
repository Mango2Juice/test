"use client";
import { useState } from "react";
import { Leaf, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddTaskForm from "./add-task-form";
import { type Task } from "@/lib/types";

interface PlannerHeaderProps {
  onAddTask: (task: Omit<Task, "id" | "date" | "completed">) => void;
}

export default function PlannerHeader({ onAddTask }: PlannerHeaderProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleTaskAdded = (task: Omit<Task, "id" | "date" | "completed">) => {
    onAddTask(task);
    setSheetOpen(false);
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Leaf className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
          Verdant Planner
        </h1>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new task</SheetTitle>
            <SheetDescription>
              What do you need to get done? Fill out the details below.
            </SheetDescription>
          </SheetHeader>
          <AddTaskForm onSave={handleTaskAdded} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
