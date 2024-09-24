import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: true,
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // @ts-ignore
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials!.email,
              password: credentials!.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            return {
              id: data.userId,
              error: data.error,
              email: credentials.email,
              role: "",
              token: "",
            };
          }

          const useCookies = cookies();
          useCookies.set("Sid", data.token, { maxAge: 5 * 60 * 60 });

          return {
            id: data.userId,
            email: data.email,
            role: data.role,
            token: data.token,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login-social`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: profile?.name,
                email: profile?.email,
                role: "CUSTOMER",
                profilePicture: profile?.picture,
              }),
            },
          );

          const data = await response.json();
          user.email = data.email;
          // @ts-ignore
          user.token = data.token;
          // @ts-ignore
          user.role = data.role;

          const useCookies = cookies();
          useCookies.set("Sid", data.token, { maxAge: 5 * 60 * 60 });
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      // @ts-ignore
      if (user.error === "User with this email not found") {
        return "/login?error=email_not_found";
        // @ts-ignore
      } else if (user.error === "Email has not been verified") {
        return "/login?error=account_not_verified";
        // @ts-ignore
      } else if (user.error === "Invalid credentials") {
        return "/login?error=invalid_email_or_password";
      }

      return true;
    },
    async jwt({ token, user }) {
      // @ts-ignore
      token.sub = user.email;
      // @ts-ignore
      token.role = user.role;
      // @ts-ignore
      token.token = user.token;

      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 5 * 60 * 60 },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
