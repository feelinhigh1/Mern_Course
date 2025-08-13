import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getToken, setToken } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-10 flex flex-col justify-center min-h-[550px]">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-700 to-yellow-400 text-transparent bg-clip-text mb-6">
          Welcome Admin
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500 font-semibold">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-700 placeholder-gray-400 transition"
            required
          />

          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-700 placeholder-gray-400 transition"
              required
            />
            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-cyan-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-700 to-yellow-400 hover:opacity-90 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      LoginPage: true,
    },
  };
}
