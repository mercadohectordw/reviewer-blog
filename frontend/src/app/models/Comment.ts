import { User } from "./User";
import { Post } from "./Post";

export class Comment{
  _id?: string;
  autor?: User;
  post!: Post | string;
  comment?: Comment | string;
  content!: string;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
}