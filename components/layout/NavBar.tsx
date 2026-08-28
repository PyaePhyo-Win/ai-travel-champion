"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Search, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/my-trips", label: "My Trips" },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [query, setQuery] = React.useState("");

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-purple text-sm font-bold text-white shadow-logo">
            W
          </div>
          <span className="font-fraunces text-lg font-medium text-text-primary">
            AI Travel Champion
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-outfit text-sm font-medium transition-colors",
                  active ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query)}`);
            }}
            className="hidden items-center gap-2 rounded-input border border-border bg-bg-base px-3 py-2 lg:flex"
          >
            <Search className="h-4 w-4 text-text-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-7 border-0 bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
            />
          </form>

          {status === "authenticated" ? (
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 text-sm text-text-muted sm:flex">
                <UserIcon className="h-4 w-4" />
                {session.user?.name || session.user?.email}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log out
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center rounded-pill border border-border px-4 py-2 font-outfit text-sm font-semibold text-text-primary transition-colors hover:border-purple"
            >
              Log in
            </Link>
          )}

          <Link
            href="/plan/step-1"
            className="inline-flex items-center gap-1.5 rounded-pill bg-grad-purple px-4 py-2 font-outfit text-sm font-semibold text-white shadow-purple-glow transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Plan
          </Link>
        </div>
      </div>
    </header>
  );
}

