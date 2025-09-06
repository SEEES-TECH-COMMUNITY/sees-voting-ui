import Image from "next/image";
import React, { type FC } from "react";

interface ILogo extends React.SVGAttributes<SVGElement> {
  className?: string;
}

const Logo: FC<ILogo> = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="SEEES Logo"
        width={500}
        height={500}
        className=" my-auto h-10 w-auto break-words rounded-full"
        priority
      />
      <h1 className="my-auto ml-1 flex min-w-fit flex-wrap break-words text-2xl font-semibold text-blue-600">
        SEEES UNIBEN
      </h1>
    </div>
  );
};
export default Logo;
