import { connectMongoDb } from "@/lib/dbConnect";
import Users from "@/model/userModel";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
 providers: [
  CredentialsProvider({
   name: "Credentials",
   credentials: {
    email: {
     label: "Email",
     type: "text",
     placeholder: "Email",
    },
    password: {
     label: "Password",
     type: "password",
     placeholder: "Password",
    },
   },
   // @ts-ignore
   async authorize(credentials) {
    try {
     await connectMongoDb();
     const email = credentials?.email;
     const password = credentials?.password;
     const user = await Users.findOne({ email, password });
     if (user) {
      return user;
     } else {
      return null;
     }
    } catch (error) {
     return null;
    }
   },
  }),
 ],
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    token.role = user.role;
    token.name = user.firstName + " " + user.lastName;
   }
   return token;
  },
  session({ session, token }) {
   if (token && session.user) {
    session.user.role = token.role;
    session.user.name = token.name;
   }
   return session;
  },
 },
 pages: {
  signIn: "/sign-in",
 },
 session: {
  strategy: "jwt",
 },
 secret: process.env.NEXTAUTH_SECRET,
};
