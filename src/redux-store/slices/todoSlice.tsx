import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TODO_ITEMS } from "../../constants";
import { TodoItem } from "../../types";
import { TodoState } from "../types";
import firebaseApp from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { WritableDraft } from "immer/dist/internal";
import { create } from "domain";

const DB = getFirestore(firebaseApp);
const COLLECTION = collection(DB, "todos");

const getAllTodos = (): TodoItem[] => {
  const todos = localStorage.getItem(TODO_ITEMS);
  const items: TodoItem[] = todos ? JSON.parse(todos) : [];
  return items;
};

const initialState: TodoState = {
  list: [],
};

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const querySnapshots = await getDocs(
    query(COLLECTION, orderBy("date", "desc"))
  );
  const newData: TodoItem[] = querySnapshots.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as TodoItem)
  );
  return newData;
});

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoItem: TodoItem) => {
    await addDoc(COLLECTION, todoItem);
    console.log("todos/add:: item added", todoItem);
    return todoItem;
  }
);

export const updateTodoItem = createAsyncThunk(
  "todos/update",
  async (todoItem: TodoItem) => {
    const updateRef = doc(DB, "todos", todoItem.id);
    await updateDoc(updateRef, { ...todoItem });
    return todoItem;
  }
);

export const deleteTodoItem = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    const deleteRef = doc(COLLECTION, id);
    await deleteDoc(deleteRef);
    return { id };
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      console.log("removeItem dispatched");
      state.list = state.list.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(TODO_ITEMS, JSON.stringify(state.list));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.list.unshift(action.payload);
    });
    builder.addCase(updateTodoItem.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].isDone = true;
    });
    builder.addCase(deleteTodoItem.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    });
  },
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
