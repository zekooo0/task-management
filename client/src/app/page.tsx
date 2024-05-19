// import AddTodoForm from "@/components/AddTodoForm";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import TodosTable from "@/components/TodosTable";

export default async function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen container">
      <div>
        <div className="mb-5 ml-auto w-fit">
          {/* <AddTodoForm userId={userId} /> */}
        </div>
        {/* <TodosTable todos={todos} /> */}
      </div>
      <div className="flex flex-col items-center space-y-10 py-10 container">
        <Separator />
        <Footer />
      </div>
    </main>
  );
}
