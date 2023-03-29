export class User{
  _id?: string;
  username?: string;
  name?: string;
  email!: string;
  password?: string;
  imageUrl?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}