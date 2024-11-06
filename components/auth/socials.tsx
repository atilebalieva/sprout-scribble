"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Socials = () => {
  return (
    <div>
      <Button onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}>Sign in with Google</Button>
      <Button onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}>Sign in with Github</Button>
    </div>
  );
};
