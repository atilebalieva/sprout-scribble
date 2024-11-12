"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "./auth-card";
import { RegisterSchema } from "@/types/register-schema";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { emailRegister } from "@/server/actions/email-register";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(emailRegister, {
    onSuccess(data) {
      console.log("response data:", data);
      if (data.error) setError(data.error);
      if (data.success) setSuccess(data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      backButtonHref="auth/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" type="text" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email@gmail.com" type="email" autoComplete="email" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="***********" type="password" autoComplete="password" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button size={"sm"} variant={"link"} asChild>
            <Link href="auth/reset">Forgot your password</Link>
          </Button>
          <br />
          <Button type={"submit"} className={cn("w-full", status === "executing" ? "animate-pulse" : "")}>
            {"Register"}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
