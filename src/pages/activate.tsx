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
  const { push, query, asPath } = useRouter();
  const toast = useToast();
  const [formFilled, setFormFilled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    "mat-number": "",
    password: "",
  });
  const inputSchema = z.object({
    "mat-number": z.string().min(8),
    password: z.string().min(8),
  });
  React.useEffect(() => {
    try {
      inputSchema.parse(formValues);
      setFormFilled(true);
    } catch (e) {
      setFormFilled(false);
    }
  }, [formValues, inputSchema]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (hash: string) => {
    let visitorId: string;
    setIsLoading(true);
    try {
      const fpPromise = FingerprintJSPro.load({
        apiKey: "2gjKwmDkg5er65lGEHYf",
        region: "eu",
      });

      visitorId = await fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          return result.visitorId;
        });
    } catch (error) {
      const fpPromise = FingerprintJS.load();
      visitorId = await fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          return result.visitorId;
        });
    }
    const result = await signIn("hash-credentials", {
      hash,
      fingerprint: visitorId,
      redirect: false,
      callbackUrl: asPath,
    });
    console.log({ result });
    if (result?.error) {
      toast.toast({
        title: "Error",
        description: result?.error || "Invalid Credentials",
        variant: "destructive",
      });
    } else if (result?.ok) {
      push("/");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const session = Array.isArray(query.session)
      ? query.session[0]
      : query.session;
    if (session) {
      handleSubmit(session);
    }
  }, [query.session]);
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
