// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
 user = "user",
 admin = "admin",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
 role?: Role;
}
declare module "next-auth" {
 interface User extends IUser {
  _id: string;
  firstName: string;
  lastName: string;
 }
 interface Session {
  user?: User;
 }
}
declare module "next-auth/jwt" {
 interface JWT extends IUser {}
}
