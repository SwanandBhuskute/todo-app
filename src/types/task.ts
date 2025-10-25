export type Priority = "Low" | "Medium" | "High";
export type Status = "Backlog" | "Todo" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  startDate?: string; // ISO YYYY-MM-DD
  endDate?: string;   // ISO YYYY-MM-DD
  priority: Priority;
  status: Status;
  createdAt: string; // ISO
}
