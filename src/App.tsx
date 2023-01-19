import "./App.css";
import { Grid, List } from "@mui/material";
import AddItemField from "./AddItemField/AddItemField";
import { TodoItem } from "./types";
import TodoListItem from "./TodoListItem/TodoListItem";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHelpers";
import { fetchTodos } from "./redux-store/slices/todoSlice";

function App() {
  const dispatch = useAppDispatch();

  const todoList: TodoItem[] = useAppSelector((state) => state.todo.list);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Grid container className="App">
      <AddItemField />

      <Grid container className="todo-container" justifyContent="center">
        <List style={{ width: "inherit" }}>
          {todoList.map((todoItem) => (
            <TodoListItem key={todoItem.id} todoItem={todoItem} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
