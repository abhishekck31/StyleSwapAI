import AppLayout from '../../components/app/AppLayout';
// Import your main designer UI here
export default function Designer() {
  return (
    <AppLayout>
      {/* Place your designer UI here, e.g. upload, style, palette, generation, etc. */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Room Designer</h1>
        {/* TODO: Move your main app UI from app/page.tsx here and refactor to use Button/Card components */}
        <p>Designer UI goes here.</p>
      </div>
    </AppLayout>
  );
}
