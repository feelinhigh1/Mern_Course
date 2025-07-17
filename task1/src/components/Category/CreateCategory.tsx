import React, { useState } from "react";
import { useRouter } from "next/router";
import { createCategory } from "@/pages/api/rest_api"; // adjust path if needed

const CategoryForm: React.FC = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCategory({ name, title });
      router.push("/categories"); // Redirect to category list on success
    } catch (err) {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Category
      </h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter category title"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-700 text-white py-2 rounded-md hover:bg-cyan-800 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CategoryForm;
