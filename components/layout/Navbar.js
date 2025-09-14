export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-blue-600 dark:text-blue-400">StyleSwap</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#features" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Features</a>
          <a href="#pricing" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Pricing</a>
          <a href="#blog" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Blog</a>
        </div>
        <div className="flex gap-2">
          <a href="/auth/signin" className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">Sign In</a>
          <a href="/auth/signup" className="px-4 py-2 rounded-lg font-semibold bg-gray-100 text-blue-600 hover:bg-blue-100 transition dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">Sign Up</a>
        </div>
      </nav>
    </header>
  );
}
