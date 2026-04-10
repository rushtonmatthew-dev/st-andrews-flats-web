import Link from "next/link";

export default function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; token?: string }>;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <ConfirmContent searchParams={searchParams} />
    </main>
  );
}

async function ConfirmContent({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; token?: string }>;
}) {
  const params = await searchParams;

  // If arriving directly with a token (email link), redirect to API handler
  if (params.token && !params.success) {
    // The /api/confirm route handles the token and redirects here with ?success=1
    return (
      <div className="max-w-md w-full text-center">
        <p className="text-gray-500">Confirming…</p>
      </div>
    );
  }

  const success = params.success === "1";

  return (
    <div className="max-w-md w-full text-center">
      {success ? (
        <>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">You&apos;re confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your alerts are now active. We&apos;ll email you as soon as something matching your filters appears.
          </p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Invalid link</h1>
          <p className="text-gray-600 mb-6">
            This confirmation link is invalid or has already been used.
          </p>
        </>
      )}
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        Back to home
      </Link>
    </div>
  );
}
