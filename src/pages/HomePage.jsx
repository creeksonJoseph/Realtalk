import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { fetchPosts, deletePost, toggleFavourite } from "../api";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this post?")) {
      await deletePost(id);
      loadPosts();
    }
  };

  const handleFav = async (id, fav) => {
    await toggleFavourite(id, !fav);
    loadPosts();
  };

  return (
    <div className="min-h-screen px-2 py-12 bg-gradient-to-br from-[#0000] via-[#232852] to-[#141d20]">
      <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#fcdb32] to-[#9661fc] bg-clip-text mb-3 mt-10 text-center tracking-tight drop-shadow">
        All Posts
      </h1>
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="py-16 text-center text-[#fcdb32] font-semibold opacity-90 text-xl drop-shadow animate-pulse">
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-[#9661fc] font-semibold opacity-80 text-2xl drop-shadow">
            No posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => handleEdit(post.id)}
              onDelete={() => handleDelete(post.id)}
              onFav={() => handleFav(post.id, post.favourite)}
              isFavourite={post.favourite}
            />
          ))
        )}
      </div>
    </div>
  );
}
