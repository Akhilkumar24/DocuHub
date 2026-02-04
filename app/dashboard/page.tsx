"use client";

import { Header } from "@/components/Header";
// Inline UI Components for speed
import { FileText, Image as ImageIcon, Settings, Upload } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";

// Inline UI Components for speed
function ToolCard({ icon: Icon, title, description, href, disabled }: any) {
  return (
    <Link 
      href={disabled ? "#" : href} 
      className={`group block h-full space-y-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md sm:p-6 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-none tracking-tight sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const [fileInfo, setFileInfo] = useState<any>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="container mx-auto w-full px-4 py-6 sm:py-8 lg:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground sm:text-base">Access your document tools.</p>
        </div>

        {/* Quick File Inspector (Functional Demo) – kept lightweight but centered on all screens */}
        <div className="mb-12 w-full max-w-2xl rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center sm:p-8 mx-auto">
          <h2 className="mb-4 text-xl font-semibold">Local File Inspector (Demo)</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Select a file to view its metadata instantly without uploading.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:text-base">
              <input type="file" className="hidden" onChange={handleFile} />
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Select File
              </div>
            </label>
            
            {fileInfo && (
              <div className="mt-4 w-full max-w-md rounded-lg border border-border bg-card p-4 text-left shadow-sm sm:p-5">
                <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <span className="font-semibold text-foreground">Name:</span>
                  <span
                    className="truncate text-muted-foreground"
                    title={fileInfo.name}
                  >
                    {fileInfo.name}
                  </span>
                  <span className="font-semibold text-foreground">Size:</span>
                  <span
                    className="truncate text-muted-foreground"
                    title={fileInfo.size}
                  >
                    {fileInfo.size}
                  </span>
                  <span className="font-semibold text-foreground">Type:</span>
                  <span
                    className="truncate text-muted-foreground"
                    title={fileInfo.type || "Unknown"}
                  >
                    {fileInfo.type || "Unknown"}
                  </span>
                  <span className="font-semibold text-foreground">Modified:</span>
                  <span
                    className="truncate text-muted-foreground"
                    title={fileInfo.lastModified}
                  >
                    {fileInfo.lastModified}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tools Grid – responsive cards that stay compact on mobile */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          <ToolCard
            icon={FileText}
            title="PDF Merge"
            description="Combine multiple PDF files into a single document."
            href="/dashboard/pdf-merge"
            disabled={true} 
          />
           <ToolCard
            icon={FileText}
            title="PDF Split"
            description="Separate a PDF into individual pages."
            href="/dashboard/pdf-split"
            disabled={true}
          />
          <ToolCard
            icon={ImageIcon}
            title="Image to PDF"
            description="Convert PNG, JPG, or WebP images to PDF format."
            href="/dashboard/image-to-pdf"
            disabled={true} // Placeholder
          />
           <ToolCard
            icon={ImageIcon}
            title="Image Resizer"
            description="Resize and compress images locally."
            href="/dashboard/image-resize"
            disabled={true}
          />
          <ToolCard
            icon={Settings}
            title="Settings"
            description="Configure default output settings and clear cache."
            href="/settings"
            disabled={true}
          />
        </div>
        
        <div className="mt-12 rounded-lg bg-blue-500/10 p-4 text-center text-sm text-blue-600 dark:text-blue-400">
          <p>More tools coming soon. All processing happens on your device.</p>
        </div>
      </main>
    </div>
  );
}
