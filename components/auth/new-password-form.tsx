"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "./auth-card";
import * as z from "zod";
import { NewPasswordSchema } from "@/types/new-password-schema";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newPassword } from "@/server/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { token: "", password: "" },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(newPassword, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute({ password: values.password, token });
  };

  return (
    <AuthCard cardTitle="Enter a new password" backButtonHref="/auth/login" backButtonLabel="Back to login" showSocial>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <br />
          <Button type={"submit"} className={cn("w-full", status === "executing" ? "animate-pulse" : "")}>
            {"Reset the password"}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  );
};
