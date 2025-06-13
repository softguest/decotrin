import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    customField:    string,
    role:           UserRole,
    Location:       string,
    address:        string,
    telephone:      string,
    bio:            string,
    profession:     string

}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;  
    }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
    interface JWT {
        role?: string;
    }
}


