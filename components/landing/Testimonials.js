import Card from '../ui/Card';
export default function Testimonials() {
  const testimonials = [
    {
      quote: 'StyleSwap AI helped us wow our clients and grow our business!',
      name: 'Priya S., DecoPro',
    },
    {
      quote: 'The instant palette extraction is a game changer.',
      name: 'Alex M., Roomify',
    },
    {
      quote: '4K exports made our presentations look world-class.',
      name: 'Ravi T., InterioMax',
    },
  ];
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <Card key={i} className="flex flex-col items-center">
            <p className="italic text-gray-700 dark:text-gray-200 mb-4">“{t.quote}”</p>
            <div className="font-bold text-blue-600 dark:text-blue-400">{t.name}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
