import AppLayout from '../../components/app/AppLayout';
export default function Settings() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          {/* TODO: Show user info from NextAuth */}
          <p>User info goes here.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Billing</h2>
          {/* TODO: Show current plan and link to manage subscription */}
          <p>Billing info goes here.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">API Keys</h2>
          {/* TODO: Show/manage API keys */}
          <p>API key management goes here.</p>
        </section>
      </div>
    </AppLayout>
  );
}
