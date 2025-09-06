import localFont from "next/font/local";
import z from "zod";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useToast } from "@src/components/ui/use-toast";

import { Label } from "@src/components/ui/Label";
import { PasswordInput } from "@src/components/ui/PasswordInput";
import { AltInput } from "@src/components/ui/AltInput";
import Logo from "@src/components/icon/Logo.icon";

import { VariantButton } from "@src/components/ui/button-with-variant";

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
  const { query } = useRouter();
  const toast = useToast();
  const [formFilled, setFormFilled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  console.log({ isLoading, error });
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setFormFilled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);
  React.useEffect(() => {
    if (query.error && query.error !== "undefined") {
      toast.toast({
        title: "Error",
        description: query.error || "An error occurred",
        variant: "destructive",
      });
    }
  }, [query.error]);

  React.useEffect(() => {
    // Get the visitorId when you need it.
  }, []);
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // signIn("auth-credentials", {});
    // setError(true);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const fpPromise = FingerprintJS.load({
      apiKey: "2gjKwmDkg5er65lGEHYf",
      region: "eu",
    });

    // Get the visitorId when you need it.
    const visitor = await fpPromise.then((fp) => fp.get());
    console.log(visitor);
    signIn("auth-credentials", {
      "mat-number": formValues["mat-number"],
      password: formValues.password,
      fingerprint: visitor.visitorId,
      redirect: false,
    })
      .then(console.log)
      .catch(console.error);
  };
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid place-content-center min-h-screen w-full`}
    >
      <form
        onSubmit={handleSubmit}
        className="h-fit flex flex-col items-center"
      >
        <Logo className="h-6 w-auto" />
        <div className="text-center mt-6 flex flex-col space-y-3">
          <h1 className="text-3xl font-semibold">Sign in to Vote</h1>
          <p className="text-grey-550 text-base max-w-80">
            Access your account to participate in the voting process. Your voice
            matters!
          </p>
        </div>
        <div className="w-full space-y-6">
          <div className="flex flex-col w-full space-y-4 mt-8">
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex justify-between items-center">
                <Label htmlFor="email">Mat Number</Label>
              </div>
              <AltInput
                type="text"
                placeholder="Enter your Mat Number"
                id="mat-number"
                name="mat-number"
                value={formValues["mat-number"]}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <PasswordInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <VariantButton
            variant={"default"}
            className="w-full"
            disabled={!formFilled}
            onClick={handleClick}
            type="submit"
          >
            Sign in
          </VariantButton>
        </div>
      </form>
    </div>
  );
}
