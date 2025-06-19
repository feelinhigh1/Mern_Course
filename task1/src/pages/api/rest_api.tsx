export const baseUrl = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}
