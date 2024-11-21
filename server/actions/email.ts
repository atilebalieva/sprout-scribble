"use server";

import getBaseUrl from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();

export const sendTwoFactorTokenByEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Sproud and Scribble - Your two Factor Varification ",
    html: `<p>Your Confirmation Code: ${token}</p>`,
  });

  if (error) console.log(error);
  if (data) return data;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Sproud and Scribble - confirmation Email",
    html: `<p>Click to <a href="${confirmLink}">Confirm your email</a></p>`,
  });

  if (error) console.log(error);
  if (data) return data;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Sproud and Scribble - reset your password",
    html: `<p>Click to <a href="${confirmLink}">reset your password</a></p>`,
  });

  if (error) console.log(error);
  if (data) return data;
};
