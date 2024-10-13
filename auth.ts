import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: false,
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
              error: data.error,
              email: credentials.email,
              name: "",
              role: "",
              token: "",
              picture: "",
              referralCode: "",
              isVerified: "",
            };
          }

          const useCookies = cookies();
          useCookies.set("Sid", data.token, { maxAge: 5 * 60 * 60 });

          return {
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token,
            picture: data.profilePicture,
            referralCode: data.referralCode,
            isVerified: data.isVerified,
          };
        } catch (error) {
          /* eslint-disable-next-line no-console */
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
              }),
            },
          );

          const data = await response.json();

          user.email = data.email;

          // @ts-ignore
          user.token = data.token;

          // @ts-ignore
          user.role = data.role;
          // @ts-ignore
          user.picture = profile?.picture;
          // @ts-ignore
          user.referralCode = data.referralCode;
          // @ts-ignore
          user.isVerified = data.isVerified;

          const useCookies = cookies();
          useCookies.set("Sid", data.token, { maxAge: 5 * 60 * 60 });
        } catch (error) {
          /* eslint-disable-next-line no-console */
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

    async jwt({ token, user, account }) {
      if (user) {
        // @ts-ignore
        token.sub = user.email;
        // @ts-ignore
        token.role = user.role;
        // @ts-ignore
        token.token = user.token;
        // @ts-ignore
        token.picture = user.picture;
        token.provider = account?.provider;
        // @ts-ignore
        token.referralCode = user.referralCode;
        // @ts-ignore
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.role) {
        // @ts-ignore
        session.user.role = token.role;
      }
      if (token.picture) {
        // @ts-ignore
        session.user.picture = token.picture;
      }
      if (token.token) {
        // @ts-ignore
        session.token = token.token;
        // @ts-ignore
        session.provider = token.provider;
      }
      if (token.referralCode) {
        // @ts-ignore
        session.user.referralCode = token.referralCode;
      } else {
        // @ts-ignore
        session.user.referralCode = null;
      }

      if (token.isVerified) {
        // @ts-ignore
        session.user.isVerified = token.isVerified;
      }

      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 5 * 60 * 60 },
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 5 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
