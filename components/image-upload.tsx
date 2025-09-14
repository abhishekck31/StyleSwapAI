"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleFileUpload(imageFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Send image to backend API for editing
      const formData = new FormData();
      formData.append('file', file);

      // You can customize the prompt here or pass from props
      const prompt = 'Add new elements and designs to this room.';

      const response = await fetch(`/api/edit-room?prompt=${encodeURIComponent(prompt)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) throw new Error('Failed to edit image');

      const blob = await response.blob();
      const editedImageUrl = URL.createObjectURL(blob);
      onImageUpload(editedImageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group",
        isDragOver
          ? "border-blue-400 bg-blue-400/10 scale-105"
          : "border-white/30 hover:border-white/50 hover:bg-white/5",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ImageIcon className="w-8 h-8 text-white" />
          )}
        </div>

        <div>
          <p className="text-white font-medium mb-2">{isUploading ? "Processing..." : "Drop your room photo here"}</p>
          <p className="text-white/60 text-sm">or click to browse • PNG, JPG up to 10MB</p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
        <div className="absolute top-1/2 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
