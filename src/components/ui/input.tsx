
import * as React from "react";
import { twMerge } from "tailwind-merge";



export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(`text-bold h-fit w-full rounded-lg border-2 border-transparent bg-grey-600 py-3 pl-10 pr-12 font-sans text-xs text-blue-placeholder-600 placeholder-blue-placeholder-600 placeholder-opacity-70 transition-colors duration-300 ease-in focus:border-blue-500 focus:outline-none focus:ring-blue-500 data-true:border-red-500/75`, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
