export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-900 p-6 ${className}`}>
      {children}
    </div>
  );
}
