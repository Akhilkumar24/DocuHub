"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ToolCard } from "@/components/ToolCard";
import { FileText, Upload } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";


export default function ToolUploadPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [pendingDuplicate, setPendingDuplicate] = useState<File | null>(null);

    const router = useRouter();
    const params = useParams();
    const toolId = params.id;
    const getToolTitle = () => {
        switch (toolId) {
            case "file-conversion":
                return "Upload document to convert";
            case "ocr":
                return "Upload image for text extraction";
            case "data-tools":
                return "Upload data file to process";
            default:
                return "Upload your file";
        }
    };


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        selectedFiles.forEach((newFile) => {
            const isDuplicate = files.some(
                (file) =>
                    file.name === newFile.name &&
                    file.size === newFile.size
            );

            if (isDuplicate) {
                setPendingDuplicate(newFile);
            } else {
                setFiles((prev) => [...prev, newFile]);
            }
        });

        // reset input so same file can be selected again
        e.target.value = "";
    };



    // PDF Tools page
    if (toolId === "pdf-tools") {
        return (
            <div className="min-h-screen flex flex-col">


                {/* Back to Dashboard */}
                <div className="container mx-auto px-6 pt-6 md:px-12">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1e1e2e]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </div>

                <main className="flex-1 container mx-auto px-6 py-12 md:px-12">
                    <div className="mb-12">
                        <h1 className="text-3xl font-semibold text-[#1e1e2e] tracking-tight mb-2">
                            PDF Tools
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Choose a PDF tool
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
                        <ToolCard
                            icon={FileText}
                            title="Merge PDF"
                            description="Combine multiple PDFs into one"
                            href="/dashboard/pdf-merge"
                            disabled={false}
                        />

                        <ToolCard
                            icon={FileText}
                            title="Split PDF"
                            description="Split PDF into separate pages"
                            href="/dashboard/pdf-split"
                            disabled={false}
                        />

                        <ToolCard
                            icon={FileText}
                            title="Document to PDF"
                            description="Convert documents into PDF format"
                            href="/dashboard/document-to-pdf"
                            disabled={false}
                        />

                        <ToolCard
                            icon={FileText}
                            title="Protect PDF"
                            description="Secure your PDF with a password"
                            href="/dashboard/pdf-protect"
                            disabled={false}
                        />
                    </div>
                </main>
            </div>
        );
    }


    // Upload page for other tools
    return (
        <div className="min-h-screen flex flex-col">
            {pendingDuplicate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-5 rounded-xl w-[340px] shadow-xl border">
                        <h3 className="font-semibold mb-2 text-[#1e1e2e]">
                            Duplicate file detected
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                            "{pendingDuplicate.name}" is already uploaded.
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                                onClick={() => {
                                    setFiles((prev) => [...prev, pendingDuplicate]);
                                    setPendingDuplicate(null);
                                }}
                            >
                                Keep both
                            </button>

                            <button
                                className="px-3 py-1 text-sm rounded-md bg-[#1e1e2e] text-white hover:bg-black"
                                onClick={() => {
                                    setFiles((prev) =>
                                        prev.filter(
                                            (file) =>
                                                file.name !== pendingDuplicate.name ||
                                                file.size !== pendingDuplicate.size
                                        ).concat(pendingDuplicate)
                                    );
                                    setPendingDuplicate(null);
                                }}
                            >
                                Replace
                            </button>

                            <button
                                className="px-3 py-1 text-sm rounded-md text-gray-500 hover:text-black"
                                onClick={() => setPendingDuplicate(null)}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            )}


            <main className="flex-1 container mx-auto px-6 py-12 md:px-12">
                {/* Back to Dashboard */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1e1e2e] mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="mb-12">
                    <h1 className="text-3xl font-semibold text-[#1e1e2e] tracking-tight mb-2">
                        {getToolTitle()}
                    </h1>

                </div>

                <div className="w-full max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative w-full rounded-2xl border-2 border-dashed border-[#ccdcdb] bg-[#eef6f5] hover:bg-[#e4eff0] transition-colors"
                    >
                        <label className="flex flex-col items-center justify-center w-full h-[400px] cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="mb-6 text-[#1e1e2e]">
                                    <Upload className="w-16 h-16 stroke-1" />
                                </div>
                                <p className="mb-2 text-xl text-[#1e1e2e] font-medium">
                                    Drag & drop your file here
                                </p>
                                <p className="text-base text-muted-foreground">
                                    or click to browse
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFile}
                            />
                            {files.length > 0 && (
                                <ul className="mt-4 space-y-2 text-sm">
                                    {files.map((file, index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{file.name}</span>
                                            <span className="text-muted-foreground">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </label>
                    </motion.div>

                    <div className="flex justify-between text-xs text-muted-foreground mt-4 px-1">
                        <span>Supported formats: PDF, JPG, PNG</span>
                        <span>Max file size: 10MB</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
