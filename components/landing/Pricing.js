import Button from '../ui/Button';
export default function Pricing() {
  const plans = [
    {
      name: 'Personal',
      price: '$19/mo',
      features: ['5 room redesigns/month', 'Palette extraction', 'Standard support'],
      cta: 'Start Free',
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$49/mo',
      features: ['Unlimited redesigns', '4K exports', 'Priority support'],
      cta: 'Get Pro',
      highlight: true,
    },
    {
      name: 'Business',
      price: '$99/mo',
      features: ['Team accounts', 'API access', 'Dedicated manager'],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];
  return (
    <section className="py-16 bg-white dark:bg-gray-950" id="pricing">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`rounded-xl border shadow-lg p-8 flex flex-col items-center ${plan.highlight ? 'ring-2 ring-blue-500 scale-105' : ''} bg-white dark:bg-gray-900`}>
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{plan.name}</h3>
            <div className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">{plan.price}</div>
            <ul className="mb-6 text-gray-600 dark:text-gray-300 text-left space-y-2">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2"><span className="text-blue-500">✔</span> {f}</li>
              ))}
            </ul>
            <Button className={`w-full ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400'}`}>{plan.cta}</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
