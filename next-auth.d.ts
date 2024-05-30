import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountType: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    accountType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accountType: string;
  }
}
