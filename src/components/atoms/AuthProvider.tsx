
import { saveToken } from "@src/utils/function/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

export interface IAuthProviderProps {}

const AuthProvider: React.FC<IAuthProviderProps> = (props) => {
  const { status, data } = useSession();
  const { pathname, asPath, push, query } = useRouter();
  React.useEffect(() => {
    const unProtectedRoutes = ["/login"];
    if (
      status === "unauthenticated" ||
      (status === "authenticated" && !data.id)
      || data?.statusCode === 500
    ) {
      if (!unProtectedRoutes.includes(pathname)) {
        push({
          pathname: "/login",
          query: {
            redirect: asPath,
            error:
              "Your session has expired you need to login again to access this page",
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, pathname]);
  React.useEffect(() => {
    if (data?.token) {
      saveToken(data?.token)
    }
  }, [data]);
  return null;
};
export default AuthProvider;
