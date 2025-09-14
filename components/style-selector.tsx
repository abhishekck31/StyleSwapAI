"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface StyleSelectorProps {
  selectedStyle: string
  onStyleSelect: (style: string) => void
  customPrompt: string
  onCustomPromptChange: (prompt: string) => void
}

const presetStyles = [
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean lines, neutral colors, minimal furniture",
    gradient: "from-gray-400 to-gray-600",
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    description: "Light woods, cozy textures, hygge vibes",
    gradient: "from-blue-300 to-blue-500",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Exposed brick, metal accents, urban feel",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description: "Rich colors, patterns, eclectic mix",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "mid-century",
    name: "Mid-Century Modern",
    description: "Retro furniture, bold colors, geometric shapes",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: "luxury",
    name: "Luxury Glam",
    description: "Rich materials, gold accents, opulent feel",
    gradient: "from-yellow-300 to-yellow-600",
  },
]

export function StyleSelector({
  selectedStyle,
  onStyleSelect,
  customPrompt,
  onCustomPromptChange,
}: StyleSelectorProps) {
  const [showCustom, setShowCustom] = useState(false)

  return (
    <div className="space-y-6">
      {/* Preset Styles */}
      <div className="grid grid-cols-2 gap-3">
        {presetStyles.map((style) => (
          <Button
            key={style.id}
            variant="outline"
            className={cn(
              "h-auto p-4 backdrop-blur-md border-white/20 text-left transition-all duration-300 hover:scale-105 group relative overflow-hidden",
              selectedStyle === style.id
                ? "bg-white/20 border-blue-400 shadow-lg shadow-blue-400/25"
                : "bg-white/5 hover:bg-white/10",
            )}
            onClick={() => onStyleSelect(style.id)}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-r opacity-20", style.gradient)}></div>
            <div className="relative">
              <div className="text-white font-medium mb-1">{style.name}</div>
              <div className="text-white/60 text-xs">{style.description}</div>
            </div>

            {/* Selection indicator */}
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            )}
          </Button>
        ))}
      </div>

      {/* Custom Style Toggle */}
      <Button
        variant="outline"
        className="w-full backdrop-blur-md bg-white/5 border-white/20 text-white hover:bg-white/10"
        onClick={() => setShowCustom(!showCustom)}
      >
        {showCustom ? "Hide Custom Style" : "Describe Custom Style"}
      </Button>

      {/* Custom Style Input */}
      {showCustom && (
        <div className="animate-in slide-in-from-top-4 space-y-3">
          <Textarea
            placeholder="Describe your dream room style... (e.g., 'Cozy cabin with warm lighting and rustic furniture')"
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
            rows={3}
          />
          <Button
            variant="outline"
            className="w-full backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => onStyleSelect("custom")}
            disabled={!customPrompt.trim()}
          >
            Use Custom Style
          </Button>
        </div>
      )}
    </div>
  )
}
