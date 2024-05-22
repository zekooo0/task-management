export interface ITask {
  _id?: string;
  title: string;
  description: string;
  category: "PERSONAL" | "WORK" | "SHOPPING";
  status: "OPEN" | "IN_PROGRESS" | "DONE";
  dueDate: string;
}
