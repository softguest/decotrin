import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user"
import {db} from "@/lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn, 
    signOut 
} = NextAuth({
        callbacks: {
            async session(params) {
                const { session } = params;

                if ('token' in params && params.token && session.user) {
                session.user.id = params.token.sub!;
                session.user.role = params.token.role as UserRole;
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
            }
            },

            adapter: PrismaAdapter(db),
            session: { strategy: "jwt"},
        ...authConfig,
})

