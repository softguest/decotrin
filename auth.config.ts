import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/Credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import type { NextAuthConfig } from "next-auth"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,   
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,   
        }),
        FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        authorization: {
            params: {
            scope: "pages_manage_posts,pages_read_engagement,publish_to_groups,pages_show_list",
            },
        },
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        }),
        LinkedInProvider({
          clientId: process.env.LINKEDIN_CLIENT_ID!,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
          authorization: {
          params: {
            scope: "r_liteprofile r_emailaddress w_member_social",
          },
        },
      }),
        Credentials({
            async authorize(credentails) {
                const validatedFields = LoginSchema.safeParse(credentails);

                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email)
                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password, 
                        user.password,
                    );

                    if(passwordsMatch) return user;
                }
                return null;
            }
        })
    ],

//     callbacks: {
//     session: async ({ session, user }) => {
//       session.user.id = user.id;
//       return session;
//     },
//   },

} satisfies NextAuthConfig