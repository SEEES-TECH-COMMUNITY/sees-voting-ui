import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        authorization: {
          params: {
            max_age: parseInt(process.env.NEXT_PUBLIC_STORAGE_TIME || ""),
          },
        },
      }),
    ],
    secret: process.env.SECRET,
    pages: {
      signIn: "/login",
      error: "/login",
    },
    callbacks: {
      signIn: async (user) => {
        // return false;
        // this only runs when i call signIn on the client side
        if (!user.account?.id_token) {
          return "/login?error=You are not authorized to login on this platform";
        }
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/google/login`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              token: user.account?.id_token,
            }),
          }
        );
        const responseJson = await response.json();
        if (!responseJson?.success) {
          return `/?error=${
            responseJson.message ||
            "You are not authorized to login on this platform ensure you sign In with your student email"
          }`;
        }
        const cookies = response.headers.getSetCookie();
        res.setHeader("Set-Cookie", cookies);
        return responseJson?.success ?? false;
      },
      async jwt({ token, account }) {
        return { ...token, token: account?.id_token || token?.token };
      },
      async session(session) {
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", `Bearer ${session?.token?.token}`);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/students/me`,
          {
            headers,
          }
        );
        const responseJson = await response.json();
        console.log(responseJson);
        return {
          ...responseJson,
          token: session?.token?.token,
        };
      },
    },
  };
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
