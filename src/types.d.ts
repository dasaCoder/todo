export class TodoItem {
  id!: string;
  task!: string;
  date?: Date;
  isDone: boolean = false;
}
