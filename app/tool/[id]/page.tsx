"use client";

import {
  ArrowLeft,
  FileText,
  Upload,
  Combine,
  Scissors,
  FileUp,
} from "lucide-react";

import { ToolCard } from "@/components/ToolCard";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ToolUploadPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.id as string;

  const [hasUnsavedWork, setHasUnsavedWork] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Warn before refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedWork) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedWork]);

  const getToolTitle = () => {
    switch (toolId) {
      case "document-to-pdf":
        return "Upload document to convert";
      case "ocr":
        return "Upload image for text extraction";
      default:
        return "Upload your file";
    }
  };

  const getSupportedTypes = () => {
    switch (toolId) {
      case "document-to-pdf":
        return [".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"];
      case "ocr":
        return [".jpg", ".jpeg", ".png"];
      case "pdf-tools":
      case "pdf-merge":
      case "pdf-split":
      case "pdf-protect":
      case "pdf-redact":
        return [".pdf"];
      default:
        return [];
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = getSupportedTypes();
    const extension =
      "." + file.name.split(".").pop()?.toLowerCase();

    if (allowedTypes.length && !allowedTypes.includes(extension)) {
      setFileError(
        `Unsupported file type. Allowed: ${allowedTypes.join(", ")}`
      );
      return;
    }

    setFileError(null);
    setSelectedFile(file);
    setHasUnsavedWork(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setHasUnsavedWork(true);
  };

  const handleBackNavigation = () => {
    if (hasUnsavedWork) {
      const confirmLeave = window.confirm(
        "You have unsaved work. Leave?"
      );
      if (!confirmLeave) return;
    }

    router.push("/dashboard");
  };

  // PDF tools page
  if (toolId === "pdf-tools") {
    return (
      <div className="min-h-screen flex flex-col">

        <div className="container mx-auto px-6 pt-6">
          <button
            onClick={handleBackNavigation}
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <main className="container mx-auto px-6 py-12">

          <h1 className="text-3xl font-semibold mb-6">
            PDF Tools
          </h1>

          <div className="grid gap-6 md:grid-cols-2 max-w-5xl">

            <ToolCard
              icon={Combine}
              title="Merge PDF"
              description="Combine PDFs"
              href="/dashboard/pdf-merge"
            />

            <ToolCard
              icon={Scissors}
              title="Split PDF"
              description="Split PDF"
              href="/dashboard/pdf-split"
            />

            <ToolCard
              icon={FileUp}
              title="Document to PDF"
              description="Convert document"
              href="/dashboard/document-to-pdf"
            />

          </div>

        </main>
      </div>
    );
  }

  // Upload page
  return (
    <div className="min-h-screen flex flex-col">

      <main className="container mx-auto px-6 py-12">

        <button
          onClick={handleBackNavigation}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-semibold mb-8">
          {getToolTitle()}
        </h1>

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-xl p-20 text-center"
        >

          <Upload className="mx-auto mb-4" />

          <p>Drag & drop or click</p>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFile}
          />

        </motion.div>

        {selectedFile && (
          <div className="mt-4">

            <p>{selectedFile.name}</p>

            <button
              onClick={() =>
                router.push(`/tool/${toolId}/processing`)
              }
              className="mt-2 px-4 py-2 bg-black text-white rounded"
            >
              Process File
            </button>

          </div>
        )}

        {fileError && (
          <p className="text-red-500 mt-2">
            {fileError}
          </p>
        )}

      </main>

    </div>
  );
}
