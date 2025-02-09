"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gold-400">
          Password
        </Label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"} // Toggles between text and password
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle the state
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-400 hover:text-gold-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
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
      .  Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-gold-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
