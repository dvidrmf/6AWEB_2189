export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
