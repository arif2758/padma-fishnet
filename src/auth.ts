// src/auth.ts
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";

import dbConnect from "./db/dbConnect";


import clientPromise from "./lib/client";
import { IUser, UserCollectionModel } from "./models/usermodel";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "mest-school",
  }) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, 
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.mobile || !credentials?.password) {
            return null;
          }

          const { mobile, password } = credentials;
          
          await dbConnect();
          const user = await UserCollectionModel.findOne({ mobile }) as IUser | null;

          if (!user) {
            return null;
          }

          const isMatch = await bcrypt.compare(
            password.toString(), 
            user.password.toString()
          );
          
          if (!isMatch) {
            return null;
          }

          return {
            id: user.userId,
            mobile: user.mobile,
            name: user.userName,
            role: user.role
          };

        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],



  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  trustHost: true,
});
