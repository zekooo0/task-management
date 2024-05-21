import AddTodoForm from "@/components/AddTodoForm";
import Footer from "@/components/Footer";
import TodosTable from "@/components/TodosTable";
import { getTasks } from "./actions/tasks";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="flex flex-col justify-between min-h-screen container">
      <div>
        <div className="mb-5 ml-auto w-fit">
          {/* <AddTodoForm userId={userId} /> */}
        </div>
        <TodosTable todos={tasks} />
      </div>
      <div className="flex flex-col items-center space-y-10 py-10 container">
        <Footer />
      </div>
    </main>
  );
}
