import "./App.css";
import { Grid, List } from "@mui/material";
import AddItemField from "./AddItemField/AddItemField";
import { TodoItem } from "./types";
import TodoListItem from "./TodoListItem/TodoListItem";
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
            <TodoListItem todoItem={todoItem} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
