import React from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddItemField = () => {
  const handleAddItem = () => {};

  return (
    <Grid
      container
      className="todo-container"
      justifyContent="center"
      spacing={3}
    >
      <TextField
        variant="outlined"
        placeholder="I need to ...."
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleAddItem}>
              <Add />
            </IconButton>
          ),
        }}
      />
    </Grid>
  );
};

export default AddItemField;
