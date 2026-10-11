export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-bold">StayQR</h1>
      <p className="text-sm text-neutral-500">
        Room page is reached by scanning the QR card in your room — there's
        nothing to browse to here directly.
      </p>
      <a
        href="/admin/login"
        className="mt-4 text-sm font-medium text-accent underline underline-offset-4"
      >
        Admin login
      </a>
    </main>
  );
}
