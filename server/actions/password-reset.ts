"use server";

import { ResetSchema } from "@/types/reset-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generatePasswordResetToken } from "./tokens";
import { sendPasswordResetEmail } from "./email";

const action = createSafeActionClient();

export const resetPassword = action(ResetSchema, async ({ email }) => {
  //aisal.uson
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  }); //true

  if (!existingUser) return { error: "User not Found" };

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken) return { error: "Token not generated" };

  await sendPasswordResetEmail(passwordResetToken[0].email, passwordResetToken[0].token);

  return { success: "Reset email sent" };
});
