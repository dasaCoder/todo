import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../../types";
import { TodoState } from "../types";

const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TodoItem>) => {
      console.log("addItem dispatched");
      state.list.push(action.payload);
    },
  },
});

export const { addItem } = todoSlice.actions;

export default todoSlice.reducer;
