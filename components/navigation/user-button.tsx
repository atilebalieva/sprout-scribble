"use client";

import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Suspense } from "react";

export const UserButton = ({ user }: Session) => {
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <Suspense fallback={<AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>}>
              {user?.image && user.name && (
                <AvatarImage src={user.image} alt={user.name}>
                  <Image src={user.image} alt={user.name} />
                </AvatarImage>
              )}
            </Suspense>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
