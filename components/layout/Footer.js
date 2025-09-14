export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4 text-blue-600 dark:text-blue-400">Product</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Features</a></li>
            <li><a href="#pricing" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Pricing</a></li>
            <li><a href="#blog" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-blue-600 dark:text-blue-400">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">About</a></li>
            <li><a href="#careers" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Careers</a></li>
            <li><a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-blue-600 dark:text-blue-400">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/terms" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Terms</a></li>
            <li><a href="/privacy" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-blue-600 dark:text-blue-400">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-twitter" /></a>
            <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-linkedin" /></a>
            <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-github" /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} StyleSwap. All rights reserved.
      </div>
    </footer>
  );
}
