import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./settings-card";

export default async function Settings() {
  const session = await auth();
  console.log(session);

  if (!session) redirect("/");
  if (session) return <SettingsCard session={session} />;
}
