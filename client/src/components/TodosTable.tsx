"use client";

import { IPriority, ITodo } from "../../interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { CircleCheck } from "lucide-react";
import TabelActionButtons from "./TabelActionButtons";
import { updateTodoStatusAction } from "../../actions/todo.actions";
import { useState } from "react";

const TodosTable = ({ todos }: { todos: ITodo[] }) => {
  const todosFinished = todos.filter((todo) => todo.completed !== false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  const onStatusChange = async (todo: ITodo) => {
    try {
      setSoundPlayed(true);
      if (!todo.completed && !soundPlayed) {
        const audio = new Audio("/audio/todo-ring.mp3");
        audio.play();
      }
      await updateTodoStatusAction({ id: todo.id, status: !todo.completed });
    } catch (err) {
      console.log(err);
    } finally {
      setSoundPlayed(false);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell
              className={`font-medium ${todo.completed ? "line-through" : ""}`}
            >
              {todo.title}
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  todo.priority === "high"
                    ? "bg-red-700"
                    : todo.priority === "medium"
                    ? "bg-yellow-700"
                    : "bg-lime-700"
                }  w-20 flex items-center justify-center hover:cursor-default `}
              >
                <p className="text-white">{todo.priority}</p>
              </Badge>
            </TableCell>
            <TableCell onClick={() => onStatusChange(todo)}>
              <Checkbox
                checked={todo.completed}
                disabled={soundPlayed}
                className="w-5 h-5"
              />
            </TableCell>
            <TableCell className="text-right flex items-center space-x-2 ml-auto w-fit">
              <TabelActionButtons todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Todos Finished</TableCell>
          <TableCell colSpan={3} className="text-lg">
            {todos.length > 0 &&
              (todosFinished.length / todos.length === 1 ? (
                <CircleCheck className="text-green-600" />
              ) : (
                `${todosFinished.length} / ${todos.length}`
              ))}
            {todos.length === 0 && "You have no todos yet!"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default TodosTable;
