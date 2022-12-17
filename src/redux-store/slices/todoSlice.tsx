import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TODO_ITEMS } from "../../constants";
import { TodoItem } from "../../types";
import { TodoState } from "../types";

const getAllTodos = (): TodoItem[] => {
  const todos = localStorage.getItem(TODO_ITEMS);
  const items: TodoItem[] = todos ? JSON.parse(todos) : [];
  return items;
};

const initialState: TodoState = {
  list: getAllTodos(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TodoItem>) => {
      console.log("addItem dispatched");
      state.list.push(action.payload);
      localStorage.setItem(TODO_ITEMS, JSON.stringify(state.list));
    },
    markAsDone: (state, action: PayloadAction<{ id: string }>) => {
      console.log("markAsDone dispatched");
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].isDone = true;
      localStorage.setItem(TODO_ITEMS, JSON.stringify(state.list));
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      console.log("removeItem dispatched");
      state.list = state.list.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(TODO_ITEMS, JSON.stringify(state.list));
    },
  },
});

export const { addItem, markAsDone, removeItem } = todoSlice.actions;

export default todoSlice.reducer;
