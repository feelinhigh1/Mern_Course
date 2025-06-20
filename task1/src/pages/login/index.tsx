import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-md w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">{error}</p>
        )}

        <input
          type="text"
          placeholder="Admin ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-gray-700 placeholder-gray-400 transition"
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-gray-700 placeholder-gray-400 transition"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 rounded-md shadow-sm transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
