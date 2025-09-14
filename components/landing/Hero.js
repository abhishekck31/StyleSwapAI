import Button from '../ui/Button';
export default function Hero() {
  return (
    <section className="py-20 text-center bg-white dark:bg-gray-950">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Reimagine Your Space in Seconds</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">AI-powered interior design. Upload a photo, choose a style, and get instant results.</p>
      <Button className="bg-blue-600 text-white text-lg px-8 py-4">Get Started for Free</Button>
      <div className="mt-10 flex justify-center">
        <video src="/demo.mp4" autoPlay loop muted className="rounded-2xl shadow-lg w-full max-w-2xl" />
      </div>
    </section>
  );
}
