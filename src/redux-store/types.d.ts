import { TodoItem, User } from "../types";

export class TodoState {
  list: TodoItem[];
}

export class AuthState {
  user: User | undefined;
}
