"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { signUp } from "@/app/api/actions/auth";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [civilId, setCivilId] = useState("");
  const [role, setRole] = useState<"BANKER" | "BUSINESS_OWNER" | "ADMIN">(
    "BANKER"
  );
  const [bank, setBank] = useState<
    | "NOT_BANK"
    | "BOUBYAN_BANK"
    | "KUWAIT_INTERNATIONAL_BANK"
    | "KUWAIT_FINANCE_HOUSE"
    | "WARBA_BANK"
  >("BOUBYAN_BANK");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (role !== "BANKER") {
      setBank("NOT_BANK");
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const signUpData = {
      firstName,
      lastName,
      username,
      email,
      password,
      civilId,
      mobileNumber,
      role,
      bank,
    };

    try {
      const response = await signUp(signUpData); // Call signUp function
      alert(response.message); // Notify user of success
      router.push("/login"); // Redirect to dashboard
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(bank);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-gold-400">
          First Name
        </Label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-gold-400">
          Last Name
        </Label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-gold-400">
          Username
        </Label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Label htmlFor="mobileNumber" className="text-gold-400">
          Mobile Number
        </Label>
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full pl-10 px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          />
        </div>
      </div>

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
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-gold-400">
          Role
        </Label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "BANKER" | "BUSINESS_OWNER" | "ADMIN")
          }
          className="w-full px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
        >
          <option value="BANKER">Banker</option>
          <option value="BUSINESS_OWNER">Business Owner</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {role === "BANKER" && (
        <div className="space-y-2">
          <Label htmlFor="bank" className="text-gold-400">
            Bank
          </Label>
          <select
            id="bank"
            name="bank"
            value={bank}
            onChange={(e) =>
              setBank(
                e.target.value as
                  | "NOT_BANK"
                  | "BOUBYAN_BANK"
                  | "KUWAIT_INTERNATIONAL_BANK"
                  | "KUWAIT_FINANCE_HOUSE"
                  | "WARBA_BANK"
              )
            }
            className="w-full px-3 py-2 bg-black/50 border border-gold-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
          >
            <option value="BOUBYAN_BANK">Boubyan Bank</option>
            <option value="KUWAIT_INTERNATIONAL_BANK">
              Kuwait International Bank
            </option>
            <option value="KUWAIT_FINANCE_HOUSE">Kuwait Finance House</option>
            <option value="WARBA_BANK">Warba Bank</option>
          </select>
        </div>
      )}

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
