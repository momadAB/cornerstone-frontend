"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gold-400">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gold-400">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gold-400 hover:bg-gold-500 text-black font-bold py-2 px-4 rounded-md transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <p className="text-center text-sm text-white/80 mt-4">
        Don't have an account?{" "}
        <Link href="/signup" className="text-gold-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
