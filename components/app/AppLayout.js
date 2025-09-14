import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block">
          <nav className="flex flex-col gap-4">
            <a href="/app/dashboard" className="font-semibold text-blue-600 dark:text-blue-400">Projects</a>
            <a href="/app/settings" className="font-semibold text-gray-700 dark:text-gray-200">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
