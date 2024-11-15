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
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserButton = ({ user }: Session) => {
  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image ? (
              <Image src={user.image} alt={user.name} fill={true} />
            ) : (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">{user.name?.charAt(0)}</div>
              </AvatarFallback>
            )}
            {/* <Suspense fallback={<AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>}>
              {user?.image && user.name && (
                <AvatarImage src={user.image} alt={user.name}>
                  <Image src={user.image} alt={user.name} />
                </AvatarImage>
              )}
            </Suspense> */}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6">
          <div className="mb-4 p-4 flex flex-col items-center justify-center gap-1 rounded-lg bg-primary/25">
            {user.image ? (
              <Image src={user.image} alt={user.name!} className="rounded-full" width={36} height={36} />
            ) : (
              <div className="font-bold rounded-full bg-white p-3 w-9">{user.name?.charAt(0)}</div>
            )}
            <p className="font-bold text-xs">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">{user.email}</span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group py-2 font-medium cursor-pointer transition-all duration-500">
            <TruckIcon size={14} className="group-hover:translate-x-1 transition-all duration-300 mr-1" />
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer transition-all duration-500"
            onClick={() => signOut()}
          >
            <Settings size={14} className="group-hover:rotate-180 transition-all duration-300 easy-in-out mr-3" />{" "}
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <div className="flex items-center ">
              <Sun className="group-hover:translate-x-1 transition-all duration-300 " />
              <Moon className="group-hover:translate-x-1 transition-all duration-300 " />
              <p>
                Theme<span>theme</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group py-2 focus:bg-destructive/15 font-medium cursor-pointer transition-all duration-500"
            onClick={() => signOut()}
          >
            <LogOut size={14} className="group-hover:rotate-180 transition-all duration-300 easy-in-out mr-3" /> Sign
            out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
