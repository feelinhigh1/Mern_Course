export const baseUrl = "http://localhost:3000/api";

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${baseUrl}/role`);
  if (!res.ok) {
    throw new Error("Failed to fetch roles");
  }
  return res.json();
}
