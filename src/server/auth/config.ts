import type { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";

import { providers } from "./providers";

const ALLOWED_EMAILS = [
  "anodevfr@gmail.com",
  "ledjant@gmail.com",
  "meysen.michael@gmail.com",
];

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers,
  adapter: PrismaAdapter(db),
  pages: {
    newUser: "/?welcome=true",
    signOut: "/",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    async signIn({ account, user }) {
      if (user.email) {
        if (!ALLOWED_EMAILS.includes(user.email)) {
          return false;
        }
      }

      if (account) {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          return true;
        }

        // Update account with new tokens and scopes if they've changed
        await db.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          data: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            token_type: account.token_type,
            expires_at: account.expires_at,
          },
        });
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
