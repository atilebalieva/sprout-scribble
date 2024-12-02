"use client";

import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

export const UserButton = ({ user }: Session) => {
  const [checked, setChecked] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }

  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar className="w-7 h-7">
            {user.image ? (
              <Image src={user.image} alt={user.name} fill={true} />
            ) : (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">{user.name?.charAt(0)}</div>
              </AvatarFallback>
            )}
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
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer"
            onClick={() => router.push("/dashboard/orders")}
          >
            <TruckIcon size={14} className="group-hover:translate-x-1  duration-300 mr-1" />
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Settings size={14} className="group-hover:rotate-180 duration-300 easy-in-out mr-3" /> Settings
          </DropdownMenuItem>
          {theme ? (
            <DropdownMenuItem className="group py-2 font-medium cursor-pointer">
              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <div className="relative flex mr-3 ">
                  <Sun
                    className="group-hover:text-yellow-600 group-hover:rotate-180 absolute
                duration-300
                easy-in-out
                transition-all
                dark:scale-0 scale-100"
                  />
                  <Moon className="group-hover:text-blue-400 dark:scale-100 scale-0" />
                </div>
                <p className="dark:text-blue-400 text-secondary-forground/75 text-xs font-bold text-yellow-400">
                  {theme[0].toUpperCase() + theme?.slice(1)}Mode
                </p>
                <Switch
                  className="scale-75"
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    if (e) setTheme("dark");
                    if (!e) setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            className="group py-2 focus:bg-destructive/15 font-medium cursor-pointers"
            onClick={() => signOut()}
          >
            <LogOut size={14} className="group-hover:rotate-180 transition-all duration-300 easy-in-out mr-3" /> Sign
            out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
