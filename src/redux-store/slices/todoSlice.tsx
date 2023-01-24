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
    console.log("todos/fetch::invoked");
    const querySnapshots = await getDocs(
      query(COLLECTION, where(userId, "==", userId), orderBy("date", "desc"))
    );
    const newData: TodoItem[] = querySnapshots.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as TodoItem)
    );
    return newData;
  }
);

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
  reducers: {},
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
