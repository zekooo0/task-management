"use client";

import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";

import { Button } from "./ui/button";
import EditTodoForm from "./EditTodoForm";
import { ITask } from "@/interfaces";
import Spinner from "./Spinner";
import { deleteTask } from "@/app/actions/tasks";

const TabelActionButtons = ({ todo }: { todo: ITask }) => {
  const [isPending, setIsPending] = useState(false);

  const deleteTodo = async () => {
    try {
      setIsPending(true);
      await deleteTask(todo._id as string);
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
        onClick={() => deleteTodo()}
      >
        {isPending ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
};

export default TabelActionButtons;
