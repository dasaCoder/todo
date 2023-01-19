import { Delete, Done } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../hooks/reduxHelpers";
import { TodoItem } from "../types";
import {
  deleteTodoItem,
  updateTodoItem,
} from "../redux-store/slices/todoSlice";

const TodoListItem = (props: { todoItem: TodoItem }) => {
  const todoItem = props.todoItem;
  const dispatch = useAppDispatch();

  const handleMarkAsDone = () => {
    dispatch(updateTodoItem({ ...todoItem, isDone: true }));
  };

  const handleDeleteItem = (id: string) => {
    dispatch(deleteTodoItem(id));
  };

  return (
    <ListItem
      className={`todo-list-item ${todoItem.isDone ? "completed-task" : ""}`}
      secondaryAction={
        <>
          {!todoItem.isDone && (
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={() => handleMarkAsDone()}
            >
              <Done fontSize="small" />
            </IconButton>
          )}

          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => handleDeleteItem(todoItem.id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </>
      }
    >
      <ListItemButton role={undefined} onClick={() => handleMarkAsDone()} dense>
        <ListItemText id={todoItem.id} primary={todoItem.task} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;
