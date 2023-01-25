import { useEffect } from "react";
import "./App.css";
import { Grid, List } from "@mui/material";
import AddItemField from "./AddItemField/AddItemField";
import { TodoItem, User } from "./types";
import TodoListItem from "./TodoListItem/TodoListItem";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHelpers";
import { fetchTodos } from "./redux-store/slices/todoSlice";

function App() {
  const dispatch = useAppDispatch();

  const todoList: TodoItem[] = useAppSelector((state) => state.todo.list);
  const user: User | undefined = useAppSelector(
    (state) => state.auth.user as User
  );

  useEffect(() => {
    if (user) dispatch(fetchTodos(user.uid));
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
