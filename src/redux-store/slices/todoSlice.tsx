import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../../types";
import { TodoState } from "../types";

const initialState: TodoState = {
  list: [
    { id: "1", task: "Research cover letter", isDone: false },
    { id: "2", task: "Todo app", isDone: false },
    { id: "3", task: "Hang all the curtains", isDone: false },
  ],
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
