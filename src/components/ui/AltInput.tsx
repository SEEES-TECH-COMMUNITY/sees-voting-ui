import * as React from "react";

import { twMerge } from "tailwind-merge";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const AltInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "flex h-10 w-full rounded-2md border border-zinc-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-550 placeholder:font-normal font-medium text-dark-blue-800 focus:outline-0 focus:shadow-[0px_0px_0px_4px_#C9DDFE,0px_1px_2px_0px_#C9DDFE0C]  transition-all duration-500 ease-in disabled:cursor-not-allowed disabled:text-grey-500 disabled:bg-grey-75",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AltInput.displayName = "Input";

export { AltInput };
