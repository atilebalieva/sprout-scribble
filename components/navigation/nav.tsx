import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "../ui/button";
import { FaSignInAlt } from "react-icons/fa";

export default async function Nav() {
  const session = await auth();
  console.log(session);

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between items-center">
          <Link href={"/"} aria-label="logo">
            <Logo />
          </Link>
          {!session ? (
            <li>
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
