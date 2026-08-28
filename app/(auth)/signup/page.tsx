"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to create account.");
        return;
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!signInRes || signInRes.error) {
        toast.error("Account created, but sign in failed.");
        router.push("/login");
        return;
      }
      toast.success("Account created!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple/15 blur-[100px]" />
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-grad-purple font-bold text-white shadow-logo">
            W
          </div>
          <span className="font-fraunces text-xl font-medium">
            AI Travel Champion
          </span>
        </Link>

        <div className="card-surface p-8">
          <h1 className="font-fraunces text-2xl font-semibold">
            Create your account
          </h1>
          <p className="mt-2 font-outfit text-sm text-text-muted">
            Start planning your next adventure.
          </p>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block font-outfit text-sm text-text-muted">
                Full Name
              </label>
              <Input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-outfit text-sm text-text-muted">
                Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-outfit text-sm text-text-muted">
                Password
              </label>
              <Input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" full className="mt-2" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center font-outfit text-sm text-text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-text-purple hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
