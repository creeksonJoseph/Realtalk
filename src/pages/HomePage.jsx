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
    <div className="px-2 py-8 max-w-3xl mx-auto">
      {loading ? (
        <div className="py-12 text-center text-gray-400">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-gray-400">No posts yet.</div>
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
  );
}
