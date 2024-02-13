import React from "react";
import Todo from "./Todo";

export default function Todolist({ todos, toggle, deleteTodo }) {
  return todos.map((todo) => {
    return (
      <Todo key={todo.id} todo={todo} toggle={toggle} deleteTodo={deleteTodo} />
    );
  });
}
