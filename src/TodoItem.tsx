import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { TodoItem } from "./types";

const TodoItemComponent = (props: { todoItem: TodoItem }) => {
  const todoItem = props.todoItem;

  const handleMarkAsDone = (id: string) => {
    console.log("done");
  };

  return (
    <ListItem className="todo-list-item">
      <ListItemButton
        role={undefined}
        onClick={() => handleMarkAsDone(todoItem.id)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todoItem.isDone}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": todoItem.id }}
          />
        </ListItemIcon>
        <ListItemText id={todoItem.id} primary={todoItem.task} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItemComponent;
