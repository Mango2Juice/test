export interface Task {
  id: string;
  title: string;
  time: string; // HH:MM
  date: string; // YYYY-MM-DD
  completed: boolean;
  reminder: boolean;
}
