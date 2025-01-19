import { AnimatedBackground } from "../../components/animated-background";
import SignupForm from "./signup-form";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative w-full max-w-md z-10">
        <div className="bg-black/50 backdrop-blur-md rounded-lg shadow-xl p-8 border border-gold-400/30">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Signup
          </h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
