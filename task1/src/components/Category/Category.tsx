import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getCategories, deleteCategory } from "@/pages/api/rest_api";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import router from "next/router";

interface DisplayCategory {
  id: string | number;
  name: string;
  title: string;
}

const Category = () => {
  const [categories, setCategories] = useState<DisplayCategory[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleDelete = async (category: DisplayCategory) => {
    if (
      confirm(`Are you sure you want to delete category: ${category.name}?`)
    ) {
      try {
        await deleteCategory(Number(category.id));
        setCategories((prev) => prev.filter((c) => c.id !== category.id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete category.");
      }
    }
  };

  const handleRowClick = (category: DisplayCategory) => {
    alert(`Clicked on category: ${category.name}`);
  };

  const handleEdit = (category: DisplayCategory) => {
    router.push(`/categories/edit/${category.id}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 md:p-6 flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Categories</h1>
        <Link
          href="/categories/createCategory"
          className="bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-cyan-800 transition duration-200"
        >
          + Create Category
        </Link>
      </div>
      <div className="w-full overflow-auto">
        <Table
          data={categories}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default withAuth(Category);
