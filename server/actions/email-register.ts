"use server";

import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/types/register-schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

const action = createSafeActionClient();

export const emailRegister = action(RegisterSchema, async ({ email, name, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(email);
      await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);

      return { success: "Email confirmation resent" };
    }

    return { error: "Email already in use" };
  }

  await db.insert(users).values({
    email,
    name,
    password: hashedPassword,
  });

  const verificationToken = await generateEmailVerificationToken(email);

  await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);

  return { success: "Confirmation Email Sent" };
});
