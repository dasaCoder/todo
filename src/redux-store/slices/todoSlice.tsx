import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  where,
} from "firebase/firestore";

const DB = getFirestore(firebaseApp);
const COLLECTION = collection(DB, "todos");

const initialState: TodoState = {
  list: [],
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (userId: string) => {
    try {
      console.log("todos/fetch::invoked");
      const querySnapshots = await getDocs(
        query(
          COLLECTION,
          where("userId", "==", userId),
          orderBy("date", "desc")
        )
      );
      const newData: TodoItem[] = querySnapshots.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as TodoItem)
      );
      console.log(newData);
      return newData;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoItem: TodoItem) => {
    try {
      const res = await addDoc(COLLECTION, todoItem);
      console.log("todos/add:: item added", res.id);
      return todoItem;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const updateTodoItem = createAsyncThunk(
  "todos/update",
  async (todoItem: TodoItem) => {
    try {
      console.log("todos/update:: item ready to update", todoItem);
      const updateRef = doc(DB, "todos", todoItem.id || "");
      const res = await updateDoc(updateRef, { ...todoItem });
      console.log("todos/update:: item updated", res);
      return todoItem;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const deleteTodoItem = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    try {
      const deleteRef = doc(COLLECTION, id);
      await deleteDoc(deleteRef);
      return { id };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      if (action.payload) state.list.unshift(action.payload);
    });
    builder.addCase(updateTodoItem.fulfilled, (state, action) => {
      if (!action.payload) return;

      const index = state.list.findIndex(
        (item) => item.id === action.payload!.id
      );
      state.list[index].isDone = true;
    });
    builder.addCase(deleteTodoItem.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload!.id);
    });
  },
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
