"use server";

import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // TODO: validate login
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // Redirect to dashboard on successful login
  redirect("/dashboard");
}
