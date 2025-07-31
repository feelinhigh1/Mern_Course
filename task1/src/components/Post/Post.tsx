import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { getPosts, deletePost } from "@/pages/api/rest_api";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import router from "next/router";

interface DisplayPost {
  id: string | number;
  title: string;
  user: string;
  category: string;
}

const Post = () => {
  const [posts, setPosts] = useState<DisplayPost[]>([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleDelete = async (post: DisplayPost) => {
    if (confirm(`Are you sure you want to delete post: ${post.title}?`)) {
      try {
        await deletePost(Number(post.id));
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete post.");
      }
    }
  };

  const handleRowClick = (post: DisplayPost) => {
    alert(`Clicked on post: ${post.title}`);
  };

  const handleEdit = (post: DisplayPost) => {
    router.push(`/post/edit/${post.id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4 md:p-6 flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Posts</h1>
        <Link
          href="/post/createPost"
          className="bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-cyan-800 transition duration-200"
        >
          + Create Post
        </Link>
      </div>
      <div className="w-full overflow-auto">
        <Table
          data={posts}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default withAuth(Post);
