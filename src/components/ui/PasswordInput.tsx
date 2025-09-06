import * as React from "react";
import { twMerge } from "tailwind-merge";

import { EyeClosedIcon, EyeIcon } from "../icon";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [view, setView] = React.useState(false);
    return (
      <span className="h-fit relative w-full">
        <input
          type={view ? "text" : "password"}
          className={twMerge(
            "flex h-10 w-full rounded-2md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-550 placeholder:font-normal font-medium text-dark-blue-800 focus:outline-0 focus:shadow-[0px_0px_0px_4px_#C9DDFE,0px_1px_2px_0px_#C9DDFE0C]  transition-all duration-500 ease-in disabled:cursor-not-allowed disabled:text-grey-500 disabled:bg-grey-75",
            className
          )}
          ref={ref}
          {...props}
        />
        <span
          data-test="view-trigger"
          className="absolute inset-y-0 right-0 flex items-center"
        >
          {view ? (
            <EyeClosedIcon
              onClick={() => {
                setView((prev) => !prev);
              }}
              className="h-5 w-5 mr-3 cursor-pointer"
            />
          ) : (
            <EyeIcon
              onClick={() => {
                setView((prev) => !prev);
              }}
              className="h-5 w-5 mr-3 cursor-pointer"
            />
          )}
        </span>
      </span>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
