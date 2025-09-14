import { useState } from 'react';
export default function FAQ() {
  const faqs = [
    { q: 'How does StyleSwap AI work?', a: 'Upload a photo, choose a style, and get instant redesigns powered by AI.' },
    { q: 'Can I download my redesigned room?', a: 'Yes! You can export your results in HD or 4K.' },
    { q: 'Is there a free trial?', a: 'Yes, every new user gets a free trial with limited redesigns.' },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4">
            <button
              className="w-full text-left font-semibold text-lg bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
            </button>
            {open === i && (
              <div className="px-6 py-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
