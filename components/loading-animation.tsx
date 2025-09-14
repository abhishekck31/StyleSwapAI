"use client"

import { Sparkles, Zap } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0">
          {/* Scanning Lines */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse animation-delay-3000"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Central Loading Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-white animate-spin" />
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-spin">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span>AI Magic in Progress</span>
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
          </h3>
          <p className="text-white/60 animate-pulse">Transforming your space with artificial intelligence...</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  )
}
