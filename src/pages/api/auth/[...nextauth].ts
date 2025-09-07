import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        id: "auth-credentials",
        credentials: {
          "mat-number": { label: "Mat Number", type: "text" },
          password: { label: "Password", type: "password" },
          fingerprint: { label: "Fingerprint", type: "text" },
        },
        async authorize(credentials) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                mat_number: credentials?.["mat-number"],
                password: credentials?.password,
                finger_print: credentials?.fingerprint,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const responseJson = await response.json();
          if (!responseJson?.success) {
            return null;
          }
          const cookies = response.headers.getSetCookie();
          res.setHeader("Set-Cookie", cookies);
          return responseJson.success;
        },
      }),
    ],
    secret: process.env.SECRET,
    pages: {
      signIn: "/login",
      error: "/login",
    },
    callbacks: {
      async session() {
        const headers = new Headers();
        headers.set("Cookie", req.headers?.cookie || "");
        headers.set("Content-Type", "application/json");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/students/me`,
          {
            headers,
          }
        );
        const responseJson = await response.json();
        return responseJson;
      },
    },
  };
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
