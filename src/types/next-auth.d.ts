// src/types/next-auth.d.ts

import { UserRole } from "./enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      mobile: string;
      name: string;
      role: UserRole;
      
    };
  }

  interface User {
    id: string;
    mobile: string;
    name: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    mobile: string;
    name: string;
    role: UserRole;
  }
}

declare module "@auth/core/adapters" {
  export * from "next-auth/adapters";
}
