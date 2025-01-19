"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Replace with your signup logic
    try {
      // Simulate API call
      console.log({ name, email, password });
      router.push("/welcome"); // Redirect to a welcome or dashboard page after successful signup
    } catch (err) {
      setError("Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gold-400">
          Name
        </Label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
        </div>
      </div>

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
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-400 hover:text-gold-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-gold-400">
          Confirm Password
        </Label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-400 hover:text-gold-500 focus:outline-none"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gold-400 hover:bg-gold-500 text-black font-bold py-2 px-4 rounded-md transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <p className="text-center text-sm text-white/80 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-gold-400 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
