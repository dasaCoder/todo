import "./App.css";
import { Grid, List } from "@mui/material";
import AddItemField from "./AddItemField";
import { TodoItem } from "./types";
import TodoItemComponent from "./TodoItem";
import React from "react";
import { useAppSelector } from "./hooks/reduxHelpers";

function App() {
  const todoList: TodoItem[] = useAppSelector((state) => state.todo.list);

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
