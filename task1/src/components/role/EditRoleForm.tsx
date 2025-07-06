// components/EditRoleForm.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface EditRoleFormProps {
  id: string | string[] | undefined;
}

interface RoleType {
  id: number;
  name: string;
  description: string;
}

export default function EditRoleForm({ id }: EditRoleFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<RoleType | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/role/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data);
          setForm({
            name: data.name,
            description: data.description,
          });
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to load role");
          router.push("/role");
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
      const response = await fetch(`http://localhost:3000/api/role/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      alert("Role updated successfully!");
      router.push("/role");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading role data...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Role: {role?.name}</h1>
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
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm"
            rows={4}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/roles")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
