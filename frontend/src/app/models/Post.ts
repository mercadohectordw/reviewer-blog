import { User } from "./User";

export class Post{
  _id?: string;
  title!: string;
  imageUrl?: string;
  content?: string;
  autor?: User | string;
  tags?: string[];
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
}