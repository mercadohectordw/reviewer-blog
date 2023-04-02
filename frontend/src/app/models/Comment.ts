import { User } from "./User";
import { Post } from "./Post";

export class Comment{
  _id?: string;
  author?: User;
  post?: Post;
  parentComment?: string;
  replies?: Comment[]; 
  content!: string;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
}