"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Loader2, Check } from "lucide-react";
import Input from "@/component/ui/InputGroup";
import Button from "@/component/ui/AnimateButton";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setError(data.message || "Something went wrong");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/login"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-[400px] p-6">
        <div className="bg-white border rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-center text-zinc-950">Create account</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Start using the cloud
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input icon={<User size={16} />} placeholder="Full name"
              value={form.name}
              type="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              
            />

            <Input icon={<Mail size={16} />} placeholder="Email"
              value={form.email}
              type="email"
              required
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />

            <Input icon={<Lock size={16} />} type="password" placeholder="Password"
              value={form.password}
                required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
            <Button status={status} text="Create account" />
          </form>

          <p className="text-xs text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <span onClick={() => router.push("/login")} className="text-black cursor-pointer font-semibold">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
