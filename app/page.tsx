"use client";

import { Header } from "@/components/Header";
import { ArrowRight, FileText, Image as ImageIcon, Lock, Zap, ShieldCheck, WifiOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-32">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                100% Client-Side Processing
              </div>
              <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                Document operations, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  completely private.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                DocuHub processes your files entirely in your browser. Zero uploads, zero data collection.
                Powerful tools for PDFs, Images, and more — available offline.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/R3ACTR/DocuHub"
                  target="_blank"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  View on GitHub
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Background Gradient */}
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 opacity-20 dark:opacity-10">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-4 py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "PDF Tools",
                description:
                  "Merge, split, compress, and organize PDF documents with ease.",
              },
              {
                icon: ImageIcon,
                title: "Image Processing",
                description:
                  "Convert languages, resize, and optimize images directly in-browser.",
              },
              {
                icon: Zap,
                title: "Instant Conversions",
                description:
                  "Transform documents between formats (Word to PDF, etc.) instantly.",
              },
              {
                icon: ShieldCheck,
                title: "Privacy Guaranteed",
                description:
                  "Files never leave your device. All processing happens locally.",
              },
              {
                icon: WifiOff,
                title: "Works Offline",
                description:
                  "No internet? No problem. PWA support keeps you productive anywhere.",
              },
              {
                icon: Lock,
                title: "Secure & Open",
                description:
                  "Open source code you can trust. No hidden tracking or analytics.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DocuHub. Built by R3ACTR.</p>
      </footer>
    </div>
  );
}
