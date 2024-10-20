import { ISODateString } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    statusCode: number;
    full_name: string;
    mat_number: string;
    level: string;
    token: string;
    expires: ISODateString;
  }
}
