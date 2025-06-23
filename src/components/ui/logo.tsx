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
        src="/logo/logo.jpg"
        alt="m-IA-ou"
        width={100}
        height={100}
        className={cn(className, "dark:hidden")}
      />
      <Image
        src="/logo/logo.jpg"
        alt="m-IA-ou"
        width={100}
        height={100}
        className={cn(className, "hidden dark:block")}
      />
    </>
  );
};
