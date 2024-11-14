"use server";

import { NewPasswordSchema } from "@/types/new-password-schema";
import { createSafeActionClient } from "next-safe-action";
import { getPasswordResetTokenByToken } from "./tokens";
import { passwordResetTokens, users } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const action = createSafeActionClient();

export const newPassword = action(NewPasswordSchema, async ({ password, token }) => {
  if (!token) return { error: "Missing Token" };

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!token) return { error: "Token not found" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has inxpired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });

  if (!existingUser) return { error: "User not found" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, existingUser.id));

    await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id));
  });

  return { success: "Password updated" };
});
