"use client";

import { IPriority, ITodo } from "../../interfaces";
import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";

import { Button } from "./ui/button";
import EditTodoForm from "./EditTodoForm";
import Spinner from "./Spinner";
import { deleteTodoAction } from "../../actions/todo.actions";

const TabelActionButtons = ({ todo }: { todo: ITodo }) => {
  const [isPending, setIsPending] = useState(false);

  const deleteTodo = async (id: string) => {
    try {
      setIsPending(true);
      await deleteTodoAction(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <EditTodoForm todo={todo} />
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={() => deleteTodo(todo.id)}
      >
        {isPending ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
};

export default TabelActionButtons;
