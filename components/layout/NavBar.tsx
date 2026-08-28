"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/my-trips", label: "My Trips" },
  { href: "/saved", label: "Saved" },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [query, setQuery] = React.useState("");
  const initial = session?.user?.name?.[0] || session?.user?.email?.[0] || "A";

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6">
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

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text-primary"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-grad-purple text-xs font-bold text-white">
            {initial.toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
