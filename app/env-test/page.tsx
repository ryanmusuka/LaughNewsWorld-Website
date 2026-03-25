export default function EnvTest() {
  return (
    <div className="p-20 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Environment Variable Diagnostic</h1>
      
      <div className="space-y-4">
        <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || "UNDEFINED"}</p>
        <p><strong>ANON KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "EXISTS (Hidden for security)" : "UNDEFINED"}</p>
        <p><strong>NODE ENV:</strong> {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
}