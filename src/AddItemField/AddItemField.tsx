import React from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHelpers";
import { addItem } from "../redux-store/slices/todoSlice";

const AddItemField = () => {
  const [task, setTask] = useState("");
  const [taskErr, setTaskErr] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    if (task === "") {
      setTaskErr(true);
      return;
    }
    dispatch(
      addItem({ id: `${Math.random()}`, task, isDone: false, date: new Date() })
    );
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
      />
    </Grid>
  );
};

export default AddItemField;
