"use client";

import { AuthCard } from "./auth-card";

export const LoginForm = () => {
  return (
    <AuthCard cardTitle="Welcome back!" backButtonHref="auth/register" backButtonLabel="Create new Account" showSocial>
      <div>Loginform</div>
    </AuthCard>
  );
};
