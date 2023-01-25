import React from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHelpers";
import { addTodo } from "../redux-store/slices/todoSlice";
import { User } from "../types";

const AddItemField = () => {
  const [task, setTask] = useState("");
  const [taskErr, setTaskErr] = useState(false);
  const dispatch = useAppDispatch();
  const user: User | undefined = useAppSelector(
    (state) => state.auth.user as User
  );

  const handleAddItem = () => {
    if (task === "") {
      setTaskErr(true);
      return;
    }
    dispatch(
      addTodo({
        task,
        isDone: false,
        date: new Date().toISOString(),
        userId: user?.uid,
      })
    );
    setTask("");
  };

  return (
    <Grid container className="todo-container" justifyContent="center">
      <TextField
        fullWidth
        required
        error={taskErr}
        variant="outlined"
        placeholder="I need to ...."
        value={task}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleAddItem}>
              <Add />
            </IconButton>
          ),
        }}
        onChange={(e) => {
          const val = e.target.value;

          if (val === "") {
            setTaskErr(true);
          } else {
            setTaskErr(false);
          }
          setTask(val);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddItem();
          }
        }}
      />
    </Grid>
  );
};

export default AddItemField;
