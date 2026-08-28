import type { Metadata } from "next";
import { fraunces, outfit, jetbrainsMono } from "./fonts";
import { QueryProvider } from "@/providers/QueryProvider";
import { Session } from "@/providers/Session";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Travel Champion",
  description:
    "Plan your perfect trip with AI — personalized recommendations and itineraries.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-bg-base font-outfit text-text-primary antialiased"
      >
        <QueryProvider>
          <Session>
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </Session>
        </QueryProvider>
      </body>
    </html>
  );
}
