import React, { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { getUsers, getCategories } from "@/pages/api/rest_api";

interface User {
  id: number | string;
  name: string;
}

interface Category {
  id: number | string;
  name: string;
}

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    userId: "",
    description: "",
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  // State for users & categories fetched from API
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err: any) {
        setErrorUsers(err.message || "Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    }

    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err: any) {
        setErrorCategories(err.message || "Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchUsers();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      setFileNames(Array.from(selectedFiles).map((file) => file.name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("categoryId", formData.categoryId);
    postData.append("userId", formData.userId);
    postData.append("description", formData.description);

    if (files) {
      Array.from(files).forEach((file) => {
        postData.append("files", file);
      });
    }

    try {
      await axios.post("http://localhost:3000/api/post", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/post");
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Failed to create post");
    }
  };

  if (loadingUsers || loadingCategories)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (errorUsers || errorCategories)
    return (
      <div className="p-4 text-red-600">
        {errorUsers && <p>Error loading users: {errorUsers}</p>}
        {errorCategories && <p>Error loading categories: {errorCategories}</p>}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Create New Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              User
            </label>
            <select
              id="userId"
              name="userId"
              required
              value={formData.userId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Upload Files
            </label>
            <div
              className="w-full border border-dashed border-gray-300 rounded-md px-3 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => document.getElementById("files")?.click()}
            >
              <span className="text-cyan-700 font-medium">
                Choose files or drag here
              </span>
            </div>
            <input
              type="file"
              id="files"
              name="files"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
            {fileNames.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-gray-700 text-xs">
                {fileNames.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Full-width Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-cyan-700 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-800 transition"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
