import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-10 flex flex-col justify-center min-h-[500px] text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-700 to-yellow-400 text-transparent bg-clip-text mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-700 text-lg font-medium mb-8">
          The Forgot Password feature is under construction.
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Please check back later or contact your administrator.
        </p>

        <Link
          href="/login"
          className="inline-block bg-gradient-to-r from-cyan-700 to-yellow-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
