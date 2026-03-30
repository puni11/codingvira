"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail} from "lucide-react";
import InputGroup from "@/component/ui/InputGroup";
import Button from "@/component/ui/AnimateButton";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    const result = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.ok) {
      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 600);
    } else {
      setStatus("error");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-['Inter',sans-serif]">
      <div className="w-full max-w-[400px] p-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-black text-white mb-4">
              C
            </div>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your cloud</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputGroup
              icon={<Mail size={16} />}
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputGroup
              icon={<Lock size={16} />}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button status={status} text="Sign in" />
          </form>

          <p className="text-xs text-gray-500 mt-8 text-center">
            Don&apos;t have an account?{" "}
            <span onClick={() => router.push("/register")} className="text-black font-semibold cursor-pointer">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */




