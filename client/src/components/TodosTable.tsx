"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ITask } from "@/interfaces";
import { SortAscIcon } from "lucide-react";
import TabelActionButtons from "./TabelActionButtons";
import { useState } from "react";

const TodosTable = ({ todos }: { todos: ITask[] }) => {
  const [sorted, setSorted] = useState(false);

  let sortedTodos = [];
  if (sorted) {
    sortedTodos = todos
      ? [...todos].sort((a, b) => a.category.localeCompare(b.category))
      : [];
  } else {
    sortedTodos = todos
      ? [...todos].sort((a, b) => b.category.localeCompare(a.category))
      : [];
  }
  return (
    <Table className="overflow-scroll">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>description</TableHead>
          <TableHead
            onClick={() => setSorted((e) => !e)}
            className="flex items-center space-x-1 hover:cursor-pointer"
          >
            <span>category</span>
            <SortAscIcon />
          </TableHead>
          <TableHead>status</TableHead>
          <TableHead>dueDate</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTodos.map((todo) => (
          <TableRow key={todo._id}>
            <TableCell
              className={`font-medium ${
                todo.status === "DONE" ? "line-through" : ""
              }`}
            >
              {todo.title}
            </TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>{todo.category}</TableCell>
            <TableCell>{todo.status}</TableCell>
            <TableCell>{todo.dueDate}</TableCell>

            <TableCell className="text-right flex items-center space-x-2 ml-auto w-fit">
              <TabelActionButtons todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TodosTable;
