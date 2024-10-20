import AuthProvider from "@src/components/atoms/AuthProvider";
import { Toaster } from "@src/components/ui/toaster";
import "@src/styles/globals.css";
import store from "@src/utils/services/store";
import { Session } from "next-auth";

import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Provider } from "react-redux";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <AuthProvider />
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
