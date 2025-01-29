"use client";

import { useState } from "react";
import { login } from "@/app/api/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaIdCard, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { deleteToken } from "@/lib/token";

export default function LoginForm() {
  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteToken();
    setIsLoading(true);
    setError("");

    try {
      const result = await login({ civilId, password });
      console.log(result);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Invalid Civil ID or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="civilId" className="text-gold-400">
          Civil ID
        </Label>
        <div className="relative">
          <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="civilId"
            name="civilId"
            type="text"
            required
            value={civilId}
            onChange={(e) => setCivilId(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
            pattern="\d{12}"
            maxLength={12}
            placeholder="Enter your 12-digit Civil ID"
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
        Don't have an account?{" "}
        <Link href="/signup" className="text-gold-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
