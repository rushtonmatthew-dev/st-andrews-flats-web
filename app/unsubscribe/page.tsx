import Link from "next/link";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  const success = params.success === "1";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center">
        {success ? (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Unsubscribed</h1>
            <p className="text-gray-600 mb-6">
              You won&apos;t receive any more emails from us. If you change your mind,{" "}
              <Link href="/subscribe" className="text-blue-600 hover:underline">
                sign up again any time
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Unsubscribe</h1>
            <p className="text-gray-600 mb-6">
              Use the unsubscribe link in one of your emails to stop receiving alerts.
            </p>
          </>
        )}
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
          Back to home
        </Link>
      </div>
    </main>
  );
}
