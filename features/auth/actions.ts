"use client";

import { authClient } from "@/lib/auth-client";
import { SignInValues, SignUpValues } from "./schema";

export async function signUp(values: SignUpValues) {
  return await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
  });
}

export async function signIn(values: SignInValues) {
  return await authClient.signIn.email({
    email: values.email,
    password: values.password,
  });
}

export async function signOut() {
  return await authClient.signOut();
}