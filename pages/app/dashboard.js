import AppLayout from '../../components/app/AppLayout';
export default function Dashboard() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
        {/* TODO: Display grid of recent projects using projectHistory state */}
        <p>Your recent projects will appear here.</p>
      </div>
    </AppLayout>
  );
}
