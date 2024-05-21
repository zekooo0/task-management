import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import TabelActionButtons from "./TabelActionButtons";

const TodosTable = ({ todos }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>description</TableHead>
          <TableHead>category</TableHead>
          <TableHead>status</TableHead>
          <TableHead>dueDate</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo._id}>
            <TableCell
              className={`font-medium ${todo.completed ? "line-through" : ""}`}
            >
              {todo.title}
            </TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>{todo.category}</TableCell>
            <TableCell>{todo.status}</TableCell>
            <TableCell>{todo.dueDate}</TableCell>

            <TableCell className="text-right flex items-center space-x-2 ml-auto w-fit">
              {/* <TabelActionButtons todo={todo} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TodosTable;
