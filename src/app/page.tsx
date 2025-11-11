"use client";

import { useState, useMemo, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { type Task } from "@/lib/types";
import PlannerHeader from "@/components/verdant-planner/planner-header";
import DayOverview from "@/components/verdant-planner/day-overview";
import { useToast } from "@/hooks/use-toast";

const getInitialTasks = (): Task[] => {
    if (typeof window === 'undefined') return [];
    const today = format(new Date(), "yyyy-MM-dd");
    return [
      { id: "1", title: "Morning meditation", time: "07:00", date: today, completed: true, reminder: false },
      { id: "2", title: "Team standup meeting", time: "09:00", date: today, completed: false, reminder: true },
      { id: "3", title: "Work on Project A", time: "09:30", date: today, completed: false, reminder: false },
      { id: "4", title: "Lunch break", time: "12:30", date: today, completed: false, reminder: false },
      { id: "5", title: "Design review", time: "14:00", date: today, completed: false, reminder: true },
      { id: "6", title: "Evening workout", time: "18:00", date: today, completed: false, reminder: false },
    ];
}


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    setTasks(getInitialTasks());
  }, []);

  const handleAddTask = (task: Omit<Task, "id" | "date" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      date: format(selectedDate, "yyyy-MM-dd"),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    toast({
      title: "Task Added",
      description: `"${newTask.title}" has been added to your schedule.`,
    });
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (taskToDelete) {
        toast({
            title: "Task Removed",
            description: `"${taskToDelete.title}" has been removed.`,
            variant: "destructive",
        });
    }
  };

  const handleSetReminder = (taskId: string, reminder: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (reminder) {
          toast({
            title: `Reminder set for "${task.title}"`,
            description: `We'll remind you at ${task.time}.`,
          });
        }
        return { ...task, reminder };
      }
      return task;
    }));
  };

  const tasksForSelectedDate = useMemo(() => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    return tasks
      .filter((task) => task.date === formattedDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [tasks, selectedDate]);
  
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = format(now, 'HH:mm');
      const today = format(now, 'yyyy-MM-dd');

      tasksForSelectedDate.forEach(task => {
        if (task.reminder && !task.completed && task.time === currentTime && task.date === today) {
          toast({
            title: 'Task Reminder',
            description: `It's time for: ${task.title}`,
          });
          handleSetReminder(task.id, false); 
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000);
    return () => clearInterval(intervalId);
  }, [tasksForSelectedDate, toast]);


  const handleDateChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedDate((prev) => subDays(prev, 1));
    } else {
      setSelectedDate((prev) => addDays(prev, 1));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <PlannerHeader onAddTask={handleAddTask} />
        <DayOverview
          selectedDate={selectedDate}
          tasks={tasksForSelectedDate}
          onDateChange={handleDateChange}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onSetReminder={handleSetReminder}
        />
      </main>
    </div>
  );
}
