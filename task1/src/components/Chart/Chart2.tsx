"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Chart2() {
  const [data, setData] = useState<{ userId: number; postCount: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts: Post[] = await res.json();

      const counts: { [key: number]: number } = {};
      posts.forEach((post) => {
        counts[post.userId] = (counts[post.userId] || 0) + 1;
      });

      const formatted = Object.entries(counts).map(([userId, postCount]) => ({
        userId: Number(userId),
        postCount,
      }));

      setData(formatted);
    }

    fetchData();
  }, []);

  return (
    <div className="w-full h-72 bg-white rounded-2xl shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Posts per User</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userId" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="postCount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
