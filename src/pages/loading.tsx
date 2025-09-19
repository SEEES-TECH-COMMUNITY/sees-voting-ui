/* eslint-disable @typescript-eslint/no-unused-vars */
import localFont from "next/font/local";
import z from "zod";
import FingerprintJSPro from "@fingerprintjs/fingerprintjs-pro";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useToast } from "@src/components/ui/use-toast";

import { Label } from "@src/components/ui/Label";
import { PasswordInput } from "@src/components/ui/PasswordInput";
import { AltInput } from "@src/components/ui/AltInput";
import Logo from "@src/components/icon/Logo.icon";

import { VariantButton } from "@src/components/ui/button-with-variant";
import Spinner from "@src/components/ui/Spinner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid place-content-center min-h-screen w-full`}
    >
      <div className="h-fit flex flex-col items-center">
        <Logo className="h-6 w-auto" />
        <div className="text-center mt-6 flex flex-col space-y-3">
          <h1 className="text-3xl font-semibold">Signing you in to Vote</h1>
          <p className="text-grey-550 text-base max-w-80">
            Access your account to participate in the voting process. Your voice
            matters!
          </p>
        </div>
        <div className="w-full space-y-6">
          <div className="flex flex-col w-full space-y-4 mt-8 h-full items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
}
