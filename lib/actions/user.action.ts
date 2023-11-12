"use server";

import Users from "@/model/userModel";
import { connectMongoDb } from "@/lib/dbConnect";

interface login {
 email: string;
 password: string;
}

interface signup {
 firstName: string;
 lastName: string;
 email: string;
 password: string;
}

export async function checkUser({ email, password }: login) {
 try {
  connectMongoDb();

  const usr = await Users.findOne({ email: email, password: password });

  return usr;
 } catch (error: any) {
  throw new Error(`Failed to fetch user: ${error.message}`);
 }
}

export async function createUser({
 firstName,
 lastName,
 email,
 password,
}: signup) {
 try {
  connectMongoDb();

  const res = await Users.create({
   firstName,
   lastName,
   email,
   password,
  });
  return res;
 } catch (error: any) {
  throw new Error(`Failed to create user: ${error.message}`);
 }
}

export async function getUsers() {
 try {
  connectMongoDb();

  const res = await Users.find();

  return res;
 } catch (error: any) {
  throw new Error(`Failed to find user: ${error.message}`);
 }
}
