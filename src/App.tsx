import "./App.css";
import { Grid, List } from "@mui/material";
import AddItemField from "./AddItemField";
import { TodoItem } from "./classes/TodoItem";
import TodoItemComponent from "./TodoItem";
import React from "react";

function App() {
  const todoList: TodoItem[] = [
    { id: "1", task: "Research cover letter", isDone: false },
    { id: "2", task: "Todo app", isDone: false },
    { id: "3", task: "Hang all the curtains", isDone: false },
  ];

  return (
    <Grid container className="App">
      <AddItemField />

      <Grid
        container
        className="todo-container"
        justifyContent="center"
        spacing={3}
      >
        <List>
          {todoList.map((todoItem) => (
            <TodoItemComponent todoItem={todoItem} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
