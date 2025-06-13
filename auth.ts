import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.customField = "go get me the inform";
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
});

export const { auth, signIn, signOut } = handler;
export const { GET, POST } = handler.handlers;
