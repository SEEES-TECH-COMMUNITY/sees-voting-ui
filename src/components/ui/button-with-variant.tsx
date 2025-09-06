import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl lg:text-base text-xs text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300  group font-medium transition-colors relative duration-700 ease-in shadow-mild disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "overflow-hidden bg-blue-main text-white hover:bg-white border border-transparent hover:border-blue-main hover:text-blue-main disabled:opacity-100 disabled:bg-blue-100",
        destructive:
          "bg-error-main border border-error-main hover:text-error-300 hover:bg-white text-white",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
        secondary: "bg-grey-50 text-grey-700 hover:bg-grey-100",
        ghost:
          "bg-white border-grey-375 border text-grey-650 hover:bg-grey-125 data-[state=active]:bg-grey-125 data-true:bg-grey-125",
        link: "text-error-main underline-offset-4 hover:underline shadow-none bg-transparent",
        text: "text-grey-header-text underline-offset-4 hover:underline underline-grey-header-text shadow-none bg-transparent",
        none: "",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const VariantButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
VariantButton.displayName = "VariantButton";

export { VariantButton, buttonVariants };
