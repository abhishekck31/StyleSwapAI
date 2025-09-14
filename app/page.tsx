"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import {
  Upload,
  Sparkles,
  ArrowRight,
  Zap,
  Stars,
  Wand2,
  Palette,
  Download,
  Crown,
  Copy,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface GeneratedImage {
  id: string
  originalImage: string
  styledImage: string
  style: string
  timestamp: number
}

interface ColorPalette {
  colors: string[]
}

type SubscriptionTier = "free" | "professional" | "business" | "enterprise"

interface UserSubscription {
  tier: SubscriptionTier
  generationsUsed: number
  generationsLimit: number
  hasWatermark: boolean
  canShare: boolean
  canCollaborate: boolean
  hasApiAccess: boolean
}

import { useEffect } from "react"
import { extractPalette } from "../utils/paletteExtractor"
export default function StyleSwapPro() {
  // Main states for E2E flow
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [styleSuggestions, setStyleSuggestions] = useState([]);
  const [palette, setPalette] = useState<string[]>([]);

  // Image upload handler
  const handleImageDrop = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault?.();
    const file =
      "dataTransfer" in e
        ? (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0]
        : (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
      setError("Please upload a PNG or JPG image");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target && typeof ev.target.result === "string") {
        setUploadedImage(ev.target.result);
        setError(null);
      }
    };
    reader.onerror = () => setError("Failed to read image file");
    reader.readAsDataURL(file);
  };

  // Fetch style suggestions when uploadedImage changes
  useEffect(() => {
    if (!uploadedImage) return;
    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/suggestStyle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: uploadedImage }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch suggestions");
        setStyleSuggestions(data.suggestions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestions();
    // Palette extraction
    setPalette(extractPalette(uploadedImage).colors);
  }, [uploadedImage]);

  // Image generation handler for E2E demo UI
  const handleDemoGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, imageData: uploadedImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate image");
      setGeneratedImage(data.generatedImage || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };
  // Theme switching
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const ThemeSwitcher = () => (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      <button
        className={`px-4 py-2 rounded-xl font-bold shadow-lg transition border ${theme === 'dark' ? 'bg-gray-900 text-white border-white/20' : 'bg-white text-gray-900 border-gray-300'}`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );

  // Color Combo Selection
  const [selectedCombo, setSelectedCombo] = useState<string[]>([]);
  const colorCombos = [
    ['#2D3748', '#A0AEC0', '#F7FAFC'],
    ['#4A5568', '#E2E8F0', '#FF6B6B'],
    ['#718096', '#A0AEC0', '#FFD700'],
    ['#1A202C', '#38B2AC', '#F7FAFC'],
  ];
  const ColorComboSelector = () => (
    <section className="w-full py-8 px-4 flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold text-white mb-4">Choose a Color Combo</h3>
      <div className="flex gap-6 justify-center">
        {colorCombos.map((combo, idx) => (
          <button
            key={idx}
            className={`flex gap-2 p-2 rounded-xl border-2 ${selectedCombo === combo ? 'border-blue-400' : 'border-white/20'} shadow-lg transition hover:scale-105`}
            onClick={() => setSelectedCombo(combo)}
          >
            {combo.map((color, i) => (
              <span key={i} className="w-8 h-8 rounded-lg" style={{ backgroundColor: color }} />
            ))}
          </button>
        ))}
      </div>
      {selectedCombo.length > 0 && (
        <div className="mt-4 flex gap-2 justify-center">
          {selectedCombo.map((color, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-sm font-mono text-white" style={{ backgroundColor: color }}>{color}</span>
          ))}
        </div>
      )}
    </section>
  );

  // Advanced Image Editing Features (scaffold)
  const AdvancedImageEditor = () => (
    <section className="w-full py-8 px-4 flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold text-white mb-4">Advanced Editing</h3>
      <div className="flex flex-wrap gap-6 justify-center">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition">Change Wall Color</button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:scale-105 transition">Add Furniture</button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition">Decor Overlays</button>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold shadow-lg hover:scale-105 transition">Apply Color Combo</button>
      </div>
      <p className="text-gray-300 mt-6">(Coming soon: AI-powered editing features for your room images!)</p>
    </section>
  );
  // Premium Hero Section inspired by Odoo
  const Hero = () => (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-gray-950 px-4 pt-24 pb-16">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
          All your design dreams on
          <span className="relative inline-block mx-2">
            <span className="bg-yellow-300 rounded-lg px-2 py-1 text-black font-extrabold text-4xl md:text-6xl" style={{ position: 'relative', zIndex: 1 }}>
              one platform
            </span>
            <span className="absolute left-0 top-1/2 w-full h-2 bg-yellow-300 rounded-lg -z-10" style={{ opacity: 0.5 }}></span>
          </span>
          .
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700 dark:text-gray-200">
          Simple, efficient, yet <span className="relative inline-block">
            <span className="bg-blue-200 rounded px-2 py-1 text-blue-900 font-semibold">affordable!</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-300 rounded-lg -z-10" style={{ opacity: 0.5 }}></span>
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <button className="px-8 py-4 rounded-xl bg-purple-700 text-white font-bold text-lg shadow-lg hover:bg-purple-800 transition">Start now - It's free</button>
          <button className="px-8 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-purple-700 dark:text-purple-300 font-bold text-lg shadow-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition">Meet an advisor</button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <span className="text-purple-700 dark:text-purple-300 text-xl font-semibold mb-2">580.00 Rs / month for ALL features</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">No hidden fees. Cancel anytime.</span>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-gray-950 rounded-full shadow-lg px-6 py-2 flex items-center gap-2 border border-gray-200 dark:border-gray-800">
        <span className="text-2xl">🇮🇳</span>
        <span className="font-semibold text-gray-700 dark:text-gray-200">StyleSwapAI x Hackathon 2025</span>
        <span className="text-gray-500 dark:text-gray-400">Sep 20, 2025</span>
        <a href="#" className="ml-4 px-4 py-1 rounded-full bg-green-100 text-green-700 font-bold hover:bg-green-200 transition">Register →</a>
      </div>
    </section>
  );

  // Onboarding Steps
  const Onboarding = () => (
    <section className={`w-full py-10 px-4 md:px-12 lg:px-32 flex flex-col items-center text-center ${theme === 'dark' ? '' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {[
          { icon: '🖼️', title: 'Upload Room Photo', desc: 'Start by uploading a clear photo of your room.' },
          { icon: '💡', title: 'Describe Your Style', desc: 'Tell us your dream style or pick from AI suggestions.' },
          { icon: '✨', title: 'See the Transformation', desc: 'Watch your room get a stunning AI makeover.' },
        ].map((step, idx) => (
          <div key={idx} className={`rounded-2xl shadow-lg p-8 flex flex-col items-center w-72 border ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'}`}>
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );

  // Pricing Section
  const Pricing = () => (
    <section className={`w-full py-16 px-4 md:px-12 lg:px-32 flex flex-col items-center text-center ${theme === 'dark' ? '' : 'bg-gradient-to-b from-white to-gray-100'}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Plans for Every Business</h2>
      <p className={`text-lg mb-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Flexible pricing for solo designers, agencies, and enterprise teams.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          {
            name: 'Pro Designer',
            price: '$29/mo',
            features: ['Unlimited room generations', 'Color palette extraction', 'Download HD images', 'Email support'],
            cta: 'Start Free Trial',
            highlight: false,
          },
          {
            name: 'Business Studio',
            price: '$99/mo',
            features: ['Team collaboration', 'White-label branding', 'API access', 'Priority support'],
            cta: 'Upgrade Now',
            highlight: true,
          },
          {
            name: 'Enterprise',
            price: 'Contact Us',
            features: ['Custom integrations', 'Dedicated account manager', 'On-premise deployment', 'SLA & compliance'],
            cta: 'Contact Sales',
            highlight: false,
          },
        ].map((plan, idx) => (
          <div key={idx} className={`rounded-3xl shadow-2xl p-8 border flex flex-col items-center ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'} ${plan.highlight ? 'ring-2 ring-blue-400 scale-105' : ''}`}>
            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <div className={`text-3xl font-extrabold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{plan.price}</div>
            <ul className={`mb-6 text-left space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}> 
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>✔</span> {f}</li>
              ))}
            </ul>
            <button className={`px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition ${plan.highlight ? (theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white') : (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900 border border-gray-300')}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );

  // Integrations Section
  const Integrations = () => (
    <section className={`w-full py-16 px-4 md:px-12 lg:px-32 flex flex-col items-center text-center ${theme === 'dark' ? '' : 'bg-white'}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Integrate StyleSwap AI</h2>
      <p className={`text-lg mb-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Connect with your workflow, CRM, or website. API, white-label, and team features for business growth.</p>
      <div className="flex flex-wrap gap-8 justify-center">
        {[
          { icon: '🔗', label: 'API Access', desc: 'Automate room design with our REST API.' },
          { icon: '🏷️', label: 'White-label', desc: 'Brand the platform for your company.' },
          { icon: '👥', label: 'Team Management', desc: 'Invite, manage, and collaborate with your team.' },
          { icon: '🖥️', label: 'Web Embeds', desc: 'Add StyleSwap to your website or portal.' },
        ].map((item, idx) => (
          <div key={idx} className={`rounded-2xl shadow-lg p-8 flex flex-col items-center w-64 border ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'}`}>
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.label}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );

  // Testimonials Section
  const Testimonials = () => (
    <section className={`w-full py-16 px-4 md:px-12 lg:px-32 flex flex-col items-center text-center ${theme === 'dark' ? '' : 'bg-gradient-to-b from-white to-gray-100'}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Trusted by Leading Interior Companies</h2>
      <div className="flex flex-wrap gap-8 justify-center mb-10">
        {['HomeScape', 'DecoPro', 'Roomify', 'DesignHub', 'InterioMax'].map((logo, idx) => (
          <div key={idx} className={`rounded-xl px-6 py-3 font-bold text-lg shadow-lg ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900'}`}>{logo}</div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { quote: '“StyleSwap AI helped us scale our design business and wow our clients!”', name: 'Priya S., DecoPro' },
          { quote: '“The API integration was seamless. Our team loves the results.”', name: 'Alex M., Roomify' },
          { quote: '“Enterprise support and white-label features made us look world-class.”', name: 'Ravi T., InterioMax' },
        ].map((t, idx) => (
          <div key={idx} className={`rounded-2xl shadow-lg p-8 border flex flex-col items-center ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'}`}>
            <p className={`italic mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{t.quote}</p>
            <div className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );

  // Enhanced Footer
  const Footer = () => (
    <footer className={`w-full py-8 px-4 md:px-12 lg:px-32 flex flex-col md:flex-row items-center justify-between border-t mt-12 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-white/10' : 'bg-gradient-to-r from-white to-gray-100 border-gray-300'}`}>
      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>© {new Date().getFullYear()} StyleSwap AI. All rights reserved.</div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className={`transition ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}>Privacy</a>
        <a href="#" className={`transition ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}>Terms</a>
        <a href="#" className={`transition ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}>Contact</a>
        <a href="#" className={`transition ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}>Partners</a>
        <a href="#" className={`transition ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`}>API Docs</a>
      </div>
    </footer>
  );
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [styledImage, setStyledImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("designer")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [colorPalette, setColorPalette] = useState<ColorPalette | null>(null)
  const [projectImages, setProjectImages] = useState<GeneratedImage[]>([])
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [addWatermark, setAddWatermark] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    tier: "free",
    generationsUsed: 2,
    generationsLimit: 5,
    hasWatermark: true,
    canShare: false,
    canCollaborate: false,
    hasApiAccess: false,
  })

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const generateStyleSuggestions = async (imageData: string) => {
    setIsLoadingSuggestions(true)
    try {
      // Simulate API call with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const suggestions = ["Industrial Loft", "Scandinavian Minimal", "Biophilic Modern"]
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Failed to generate suggestions:", error)
      showToastMessage("Failed to generate style suggestions")
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const extractPalette = (imageUrl: string): ColorPalette => {
    // Simulate client-side color extraction
    const colors = ["#2D3748", "#4A5568", "#718096", "#A0AEC0", "#E2E8F0", "#F7FAFC"]
    return { colors }
  }

  const handleImageUpload = useCallback(async (file: File) => {
    // Validate file
    if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
      showToastMessage("Please upload a PNG or JPG image")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showToastMessage("File size must be less than 5MB")
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageData = e.target?.result as string
      setOriginalImage(imageData)
      await generateStyleSuggestions(imageData)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleGenerate = async () => {
    if (!originalImage || !selectedStyle) return

    // Check usage limits
    if (userSubscription.generationsUsed >= userSubscription.generationsLimit) {
      showToastMessage("Generation limit reached. Please upgrade your plan.")
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call with exponential backoff
      let retries = 0
      const maxRetries = 3

      while (retries < maxRetries) {
        try {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              // Simulate occasional failures
              if (Math.random() < 0.1 && retries < 2) {
                reject(new Error("API Error"))
              } else {
                resolve(null)
              }
            }, 3000)
          })
          break
        } catch (error) {
          retries++
          if (retries >= maxRetries) throw error
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, retries) * 1000))
        }
      }

      // For demo, use original image as styled
      const newStyledImage = originalImage
      setStyledImage(newStyledImage)

      // Extract color palette
      const palette = extractPalette(newStyledImage)
      setColorPalette(palette)

      // Add to project tray
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        originalImage,
        styledImage: newStyledImage,
        style: selectedStyle,
        timestamp: Date.now(),
      }
      setProjectImages((prev) => [...prev, newImage])
      setActiveImageId(newImage.id)

      // Update usage count
      setUserSubscription((prev) => ({
        ...prev,
        generationsUsed: prev.generationsUsed + 1,
      }))

      // Switch to palette tab
      setActiveTab("palette")
    } catch (error) {
      console.error("Generation failed:", error)
      showToastMessage("Generation failed. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const loadProjectImage = (image: GeneratedImage) => {
    setOriginalImage(image.originalImage)
    setStyledImage(image.styledImage)
    setSelectedStyle(image.style)
    setActiveImageId(image.id)

    const palette = extractPalette(image.styledImage)
    setColorPalette(palette)
  }

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    showToastMessage(`Copied ${color} to clipboard`)
  }

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const position = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  const presetStyles = [
    "Cyberpunk Neon",
    "Cozy Cottage",
    "Luxury Modern",
    "Rustic Farmhouse",
    "Art Deco Glam",
    "Zen Minimalist",
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-gray-950 to-gray-900' : 'from-gray-100 to-white'} relative overflow-hidden`}>
      <ThemeSwitcher />

      {/* White/Grey Light Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 blur-2xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 blur-2xl opacity-60" />
        <div className="absolute left-0 top-1/2 w-32 h-96 bg-gradient-to-b from-white/10 to-gray-400/10 blur-2xl opacity-40" />
        <div className="absolute right-0 top-1/2 w-32 h-96 bg-gradient-to-b from-white/10 to-gray-400/10 blur-2xl opacity-40" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Onboarding Steps */}
      <Onboarding />

  {/* Enterprise Features */}
  <Pricing />
  <Integrations />
  <Testimonials />

  {/* Main App Container */}
  <div className="relative z-10 min-h-screen grid grid-cols-12 grid-rows-6 gap-6 p-6 animate-in fade-in duration-1000">
        {/* Left Column - Control Hub */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 row-span-6">
          <div
            className="h-full rounded-3xl border shadow-2xl transition-all duration-500 hover:shadow-blue-500/20"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 30px rgba(29, 78, 216, 0.2)",
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">StyleSwap Pro</h1>
                    <p className="text-sm text-blue-200">AI Interior Design</p>
                  </div>
                </div>
                {companyLogo && (
                  <img src={companyLogo || "/placeholder.svg"} alt="Company Logo" className="w-10 h-10 rounded-lg" />
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 p-1 rounded-2xl" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                {[
                  { id: "designer", label: "Designer", icon: Wand2 },
                  { id: "palette", label: "Palette", icon: Palette, disabled: !colorPalette },
                  { id: "export", label: "Export", icon: Download, disabled: !styledImage },
                ].map(({ id, label, icon: Icon, disabled }) => (
                  <button
                    key={id}
                    onClick={() => !disabled && setActiveTab(id)}
                    disabled={disabled}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      activeTab === id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : disabled
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-blue-200 hover:text-white hover:bg-black/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{label}</span>
                    {activeTab === id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 h-[calc(100%-140px)] overflow-y-auto">
              {/* Designer Tab */}
              {activeTab === "designer" && (
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Upload Room Image</h3>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const file = e.dataTransfer.files[0]
                        if (file) handleImageUpload(file)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-blue-400/50 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/5"
                    >
                      <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-white font-medium">Drop your image here or click to upload</p>
                      <p className="text-sm text-gray-400 mt-2">PNG or JPG, max 5MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                      }}
                      className="hidden"
                    />
                  </div>

                  {/* AI Style Advisor */}
                  {isLoadingSuggestions && (
                    <div
                      className="flex items-center space-x-3 p-4 rounded-2xl"
                      style={{ background: "rgba(59, 130, 246, 0.1)" }}
                    >
                      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-blue-200">AI analyzing your room...</span>
                    </div>
                  )}

                  {aiSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">AI Style Suggestions</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedStyle(suggestion)}
                            className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                            style={{
                              background: "rgba(59, 130, 246, 0.2)",
                              border: "1px solid rgba(59, 130, 246, 0.3)",
                              color: "#93C5FD",
                            }}
                          >
                            ✨ {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Style Input */}
                  {originalImage && (
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Describe Your Style</h4>
                      <Textarea
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        placeholder="Describe your desired interior style..."
                        className="min-h-[100px] rounded-2xl border-white/20 bg-black/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      />

                      {/* Preset Styles */}
                      <div className="grid grid-cols-2 gap-2">
                        {presetStyles.map((style) => (
                          <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className="p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                            style={{
                              background: "rgba(30, 41, 59, 0.7)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              color: "#E2E8F0",
                            }}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  {originalImage && selectedStyle && (
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Magic...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Zap className="w-6 h-6" />
                          <span>Transform Room</span>
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              )}

              {/* Palette Tab */}
              {activeTab === "palette" && colorPalette && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Extracted Color Palette</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {colorPalette.colors.map((color, index) => (
                      <div key={index} className="group cursor-pointer" onClick={() => copyColorToClipboard(color)}>
                        <div
                          className="w-full h-20 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-white/20"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-center text-sm text-blue-200 mt-2 font-mono group-hover:text-white transition-colors">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(colorPalette.colors.join(", "))
                      showToastMessage("All colors copied to clipboard")
                    }}
                    className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy All Colors
                  </Button>
                </div>
              )}

              {/* Export Tab */}
              {activeTab === "export" && styledImage && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Export Options</h3>

                  {/* Watermark Toggle */}
                  <div
                    className="flex items-center justify-between p-4 rounded-2xl"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                  >
                    <span className="text-white font-medium">Add Company Watermark</span>
                    <button
                      onClick={() => setAddWatermark(!addWatermark)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        addWatermark ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                          addWatermark ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <Button className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl">
                    <Download className="w-5 h-5 mr-2" />
                    Download Design
                  </Button>

                  <Button
                    disabled
                    className="w-full h-14 bg-gray-600 text-gray-400 font-semibold rounded-2xl cursor-not-allowed opacity-60"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Download 4K (Pro Feature)
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    Upgrade to Pro to save projects and download in 4K
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Visual Canvas */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 row-span-5">
          <div
            className="h-full rounded-3xl border shadow-2xl p-6"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 30px rgba(29, 78, 216, 0.2)",
            }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Stars className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Future Room Awaits</h2>
                <p className="text-emerald-200 text-sm">Watch the transformation happen</p>
              </div>
            </div>

            <div
              className="h-[calc(100%-100px)] rounded-2xl overflow-hidden"
              style={{ background: "rgba(0, 0, 0, 0.3)" }}
            >
              {!originalImage ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-blue-200">
                    <Upload className="w-20 h-20 mx-auto opacity-60 mb-6" />
                    <p className="text-xl font-medium text-white">Your Future Room Awaits</p>
                    <p className="text-sm text-blue-300 mt-2">Upload an image to begin the transformation</p>
                  </div>
                </div>
              ) : isGenerating ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1 w-64 bg-gray-700 rounded-full mx-auto overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                          style={{ width: "60%" }}
                        />
                      </div>
                      <p className="text-white font-medium">AI is analyzing and transforming your space...</p>
                      <p className="text-sm text-blue-300">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              ) : originalImage && styledImage ? (
                <div
                  ref={sliderRef}
                  className="relative h-full cursor-col-resize"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseMove={handleSliderMove}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original room"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    >
                      Before
                    </div>
                  </div>

                  {/* After Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={styledImage || "/placeholder.svg"}
                      alt="Styled room"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div
                      className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ background: "rgba(0, 0, 0, 0.7)" }}
                    >
                      After
                    </div>
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
                    style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex space-x-1">
                        <ChevronLeft className="w-3 h-3 text-gray-600" />
                        <ChevronRight className="w-3 h-3 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original room"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row - Project Tray */}
        <div className="hidden md:flex col-span-12 md:col-span-7 lg:col-span-8 row-span-1">
          <div
            className="w-full rounded-3xl border shadow-2xl p-4"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 30px rgba(29, 78, 216, 0.2)",
            }}
          >
            <div className="flex items-center space-x-4 h-full overflow-x-auto">
              <span className="text-sm text-blue-200 font-medium whitespace-nowrap">Project Tray:</span>
              {projectImages.length === 0 ? (
                <span className="text-sm text-gray-400">Generated images will appear here</span>
              ) : (
                projectImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => loadProjectImage(image)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 ${
                      activeImageId === image.id
                        ? "ring-2 ring-blue-400 shadow-lg shadow-blue-500/50"
                        : "hover:ring-2 hover:ring-white/30"
                    }`}
                  >
                    <img
                      src={image.styledImage || "/placeholder.svg"}
                      alt={`Generated ${image.style}`}
                      className="w-full h-full object-cover"
                    />
                    {activeImageId === image.id && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
          <div
            className="px-6 py-4 rounded-2xl shadow-2xl border flex items-center space-x-3"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)",
            }}
          >
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-white font-medium">{toastMessage}</span>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
      `}</style>
    </div>
  )
}
