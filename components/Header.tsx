"use client";

import Link from "next/link";
import { Copy, FileStack, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  // Simple mobile menu toggle – keeps navigation usable on small screens
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Header layout: logo on the left, nav centered, primary actions on the right */}
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2 md:h-16">
        <Link className="flex flex-shrink-0 items-center gap-2 font-bold text-xl tracking-tight" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span>DocuHub</span>
        </Link>

        {/* Centered navigation for wider screens (≥700px) */}
        <nav className="hidden min-[700px]:flex flex-1 items-center justify-center gap-6 text-sm font-medium">
          <Link
            className="py-2 text-muted-foreground transition-colors hover:text-foreground"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="py-2 text-muted-foreground transition-colors hover:text-foreground"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="py-2 text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/R3ACTR/DocuHub"
            target="_blank"
          >
            GitHub
          </Link>
        </nav>

        {/* Right side: primary action and hamburger for small screens */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden min-[700px]:inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Launch App
          </Link>

          {/* Mobile actions: hamburger opens the navigation for smaller screens */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground min-[700px]:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel – mostly solid with a subtle transparency */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-background backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 md:hidden">
          <nav className="container mx-auto flex flex-col gap-3 px-4 py-4 text-sm font-medium">
            <Link
              className="py-2.5 text-muted-foreground transition-colors hover:text-foreground"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="py-2.5 text-muted-foreground transition-colors hover:text-foreground"
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="py-2.5 text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/R3ACTR/DocuHub"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </Link>
            <Link
              href="/dashboard"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
