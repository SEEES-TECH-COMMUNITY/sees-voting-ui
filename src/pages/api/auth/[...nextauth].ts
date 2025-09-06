import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        authorization: {
          params: {
            max_age: parseInt(process.env.NEXT_PUBLIC_STORAGE_TIME || ""),
          },
        },
      }),
      CredentialsProvider({
        id: "auth-credentials",
        credentials: {
          "mat-number": { label: "Mat Number", type: "text" },
          password: { label: "Password", type: "password" },
          fingerprint: { label: "Fingerprint", type: "text" },
        },
        async authorize(credentials, req) {
          console.log({ credentials });
          // Add logic here to look up the user from the credentials supplied
          const user = {
            id: "1",
            name: "J Smith",
            email: "jsmith@example.com",
          };

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
      }),
    ],
    secret: process.env.SECRET,
    pages: {
      signIn: "/login",
      error: "/login",
    },
  };
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
