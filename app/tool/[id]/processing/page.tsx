"use client";

import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tesseract from "tesseract.js";
import { getStoredFiles, clearStoredFiles } from "@/lib/fileStore";
import { PDFDocument } from "pdf-lib";

type StoredFile = {
  data: string;
  name: string;
  type: string;
};

export default function ProcessingPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.id as string;

  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [compressedPdfData, setCompressedPdfData] = useState<string | null>(null);

  useEffect(() => {
    const storedFiles = getStoredFiles() as StoredFile[];

    if (!storedFiles.length) {
      router.push(`/tool/${toolId}`);
      return;
    }

    if (toolId === "ocr") {
      runOCR(storedFiles[0].data);
    } else if (toolId === "pdf-compress") {
      startCompressFlow(storedFiles);
    } else if (toolId === "pdf-protect") {
      protectPDF(storedFiles[0].data);
    } else {
      setStatus("done");
      clearStoredFiles();
    }
  }, [toolId, router]);

  /* OCR */
  async function runOCR(base64Data: string) {
    setStatus("processing");
    setProgress(0);

    try {
      const result = await Tesseract.recognize(base64Data, "eng", {
        logger: m => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      setExtractedText(result.data.text);
      setStatus("done");
      clearStoredFiles();
    } catch {
      setStatus("error");
      setErrorMessage("Failed to extract text.");
    }
  }

  /* COMPRESS */
  async function startCompressFlow(files: StoredFile[]) {
    setStatus("processing");
    setProgress(20);

    try {
      const targetSize = localStorage.getItem("targetSize") || "1MB";

      const targetBytes = targetSize.includes("KB")
        ? Number(targetSize.replace("KB", "")) * 1024
        : Number(targetSize.replace("MB", "")) * 1024 * 1024;

      const res = await fetch("/api/compress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: files.map(f => ({ base64: f.data })),
          targetBytes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.results?.length) {
        throw new Error("Compression failed");
      }

      setCompressedPdfData(data.results[0].file);
      setProgress(100);
      setStatus("done");
      clearStoredFiles();
    } catch {
      setStatus("error");
      setErrorMessage("Failed to compress PDF.");
    }
  }

  /* PROTECT */
  async function protectPDF(base64Data: string) {
    setStatus("processing");
    setProgress(20);

    try {
      const cleaned = base64Data.split(",")[1] || base64Data;

      const bytes = Uint8Array.from(atob(cleaned), c => c.charCodeAt(0));

      setProgress(50);

      const pdfDoc = await PDFDocument.load(bytes);

      setProgress(70);

      const saved = await pdfDoc.save();

      // ✅ FIXED LINE (only change made)
      const blob = new Blob([saved as BlobPart], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      localStorage.setItem("protectedPDF", url);

      setProgress(100);
      setStatus("done");
      clearStoredFiles();
    } catch {
      setStatus("error");
      setErrorMessage("Failed to protect PDF.");
    }
  }

  async function handleCopyText() {
    if (!extractedText) return;
    await navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* UI STATES */

  if (status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">

        <CheckCircle className="h-14 w-14 text-green-500" />

        {toolId === "ocr" && (
          <button onClick={handleCopyText}>
            {copied ? "Copied!" : "Copy Text"}
          </button>
        )}

        {toolId === "pdf-compress" && compressedPdfData && (
          <button
            onClick={() => {
              const blob = new Blob(
                [Uint8Array.from(atob(compressedPdfData), c => c.charCodeAt(0))],
                { type: "application/pdf" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "compressed.pdf";
              a.click();
            }}
          >
            Download PDF
          </button>
        )}

        {toolId === "pdf-protect" && (
          <button
            onClick={() => {
              const url = localStorage.getItem("protectedPDF");
              if (!url) return;
              const a = document.createElement("a");
              a.href = url;
              a.download = "protected.pdf";
              a.click();
            }}
          >
            Download Protected PDF
          </button>
        )}
      </div>
    );
  }

  return null;
}
