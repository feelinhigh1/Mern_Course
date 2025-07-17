// components/EditCategoryForm.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface EditCategoryFormProps {
  id: string | string[] | undefined;
}

interface CategoryType {
  id: number;
  name: string;
  title: string;
}

export default function EditCategoryForm({ id }: EditCategoryFormProps) {
  const router = useRouter();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [form, setForm] = useState({
    name: "",
    title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/categories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCategory(data);
          setForm({
            name: data.name,
            title: data.title,
          });
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to load category");
          router.push("/categories");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      alert("Category updated successfully!");
      router.push("/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading category data...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Edit Category: {category?.name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Title</label>
          <textarea
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
            rows={4}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/categories")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
