import { cn } from "@src/utils/function/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#d2d2d3]", className)}
      {...props}
    />
  );
}

export { Skeleton };
