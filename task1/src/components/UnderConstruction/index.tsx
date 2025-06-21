import Link from "next/link";

interface Props {
  title: string;
  message?: string;
}

export default function UnderConstructionPage({ title, message }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-10 text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-700 to-yellow-400 text-transparent bg-clip-text mb-4">
          {title}
        </h2>
        <p className="text-gray-700 text-lg font-medium mb-8">
          {message ||
            "This page is under construction. Please check back later."}
        </p>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-cyan-700 to-yellow-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
