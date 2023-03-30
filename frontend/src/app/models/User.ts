export class User{
  _id?: string;
  username?: string;
  name?: string;
  email!: string;
  password?: string;
  imageUrl?: string;
  bio?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}