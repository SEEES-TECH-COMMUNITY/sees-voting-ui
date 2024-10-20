/* eslint-disable @typescript-eslint/no-empty-interface */


import { cn } from "@src/utils/function/utils";
import React, { ReactNode, type ButtonHTMLAttributes, type FC } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button: FC<IButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        `w-full rounded-lg border border-transparent bg-blue-600 py-3 pl-10 pr-12 text-xs font-bold text-white placeholder-opacity-70 focus:border-blue-500 focus:outline-none focus:ring-blue-500 `,
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;

