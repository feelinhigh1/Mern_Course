import { getToken } from "@/utils/auth";

export const baseUrl = "http://localhost:3000/api";

async function request(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const getUsers = () => request("/users");
export const deleteUser = (id: number) =>
  request(`/users/${id}`, { method: "DELETE" });

export const getRoles = () => request("/role");
export const deleteRole = (id: number) =>
  request(`/role/${id}`, { method: "DELETE" });
export const createRole = (role: { name: string; description: string }) =>
  request("/role", { method: "POST", body: JSON.stringify(role) });

export const getCategories = () => request("/categories");
export const deleteCategory = (id: number) =>
  request(`/categories/${id}`, { method: "DELETE" });
export const createCategory = (category: { name: string; title: string }) =>
  request("/categories", { method: "POST", body: JSON.stringify(category) });

export const getPosts = () => request("/post");
export const deletePost = (id: number) =>
  request(`/post/${id}`, { method: "DELETE" });
