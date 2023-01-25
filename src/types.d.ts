export class TodoItem {
  id?: string;
  task!: string;
  date?: string;
  isDone: boolean = false;
  userId: string;
}

export class User {
  uid: string;
  email: string | null;
}
