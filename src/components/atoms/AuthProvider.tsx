
import { saveToken } from "@src/utils/function/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";



const AuthProvider: React.FC = () => {
  const { status, data } = useSession();
  const { pathname, push } = useRouter();
  const unProtectedRoutes = ["/login", "/admin/result"];

  React.useEffect(() => {
    if (
      status === "unauthenticated" ||
      (status === "authenticated" && !data.id)
    ) {
      if (!unProtectedRoutes.includes(pathname)) {
        push("/login");
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
