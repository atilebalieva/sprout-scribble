"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export const BackButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Button className="flex gap-4 w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};
