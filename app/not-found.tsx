import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-fraunces text-6xl font-semibold text-gradient">404</h1>
        <p className="mt-4 font-outfit text-lg text-text-muted">
          This page wandered off the map.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center rounded-pill bg-grad-purple px-6 py-3 font-outfit text-sm font-semibold text-white shadow-purple-glow transition-transform hover:scale-105"
        >
          Back home
        </a>
      </main>
      <Footer />
    </div>
  );
}
