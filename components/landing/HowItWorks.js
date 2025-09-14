export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {[
          { icon: '📷', title: 'Upload Photo', desc: 'Start with a clear photo of your room.' },
          { icon: '🎨', title: 'Choose Style', desc: 'Pick a style or let AI suggest one.' },
          { icon: '⚡', title: 'Get Redesign', desc: 'See your new room instantly.' },
        ].map((step, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex-1">
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
