import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";


interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Image
        src="/logo/light.svg"
        alt="m-IA-ou"
        width={100}
        height={100}
        className={cn(className, "dark:hidden")}
      />
      <Image
        src="/logo/dark.svg"
        alt="m-IA-ou"
        width={100}
        height={100}
        className={cn(className, "hidden dark:block")}
      />
    </>
  );
};
