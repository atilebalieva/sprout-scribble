"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export const UserButton = ({ user }: Session) => {
  console.log(user);
  return (
    <div>
      <h1>{user?.email}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
