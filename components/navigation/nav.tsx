import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "../ui/button";
import { FaSignInAlt } from "react-icons/fa";
import CartDrawer from "../cart/card-drawer";

export default async function Nav() {
  const session = await auth();
  console.log(session);

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between items-center md:gap-8 gap-4 ">
          <li className="flex flex-1">
            <Link href={"/"} aria-label="logo">
              <Logo />
            </Link>
          </li>
          <li className="relative flex items-center hover:bg-muted">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button>
                <Link href="/auth/login" className="flex gap-2 items-center">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton expires={session?.expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
