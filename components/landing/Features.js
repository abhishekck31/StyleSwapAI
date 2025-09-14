import Card from '../ui/Card';
export default function Features() {
  const features = [
    {
      title: 'AI Style Advisor',
      desc: 'Get personalized style suggestions for your space.',
      img: '/feature-style-advisor.png',
    },
    {
      title: 'Instant Palette Extraction',
      desc: 'Extract color palettes from any room photo.',
      img: '/feature-palette.png',
    },
    {
      title: '4K Exports',
      desc: 'Download your redesigned room in stunning 4K quality.',
      img: '/feature-4k.png',
    },
  ];
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Card key={i} className="flex flex-col items-center">
            <img src={f.img} alt={f.title} className="w-32 h-32 object-contain mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
