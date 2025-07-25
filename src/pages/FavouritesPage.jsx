import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { fetchPosts, toggleFavourite } from "../api";

export default function FavouritesPage() {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadFavs = async () => {
    const posts = await fetchPosts();
    setFavs(posts.filter((post) => post.favourite));
    setLoading(false);
  };

  useEffect(() => {
    loadFavs();
  }, []);

  const handleRemoveFav = async (id) => {
    await toggleFavourite(id, false);
    loadFavs();
  };

  return (
    <div className="bg-gradient-to-br from-[#0000] via-[#232852] to-[#141d20]">
      <div className=" pt-20 px-2 py-8 max-w-3xl h-screen bg-gradient-to-br from-[#0000] via-[#232852] to-[#141d20] mx-auto">
        <h2 className="text-xl mb-3 font-semibold text-blue-500">Favourites</h2>
        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading...</div>
        ) : favs.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No favourites yet.
          </div>
        ) : (
          favs.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => navigate(`/edit/${post.id}`)}
              onDelete={() => null}
              onFav={() => handleRemoveFav(post.id)}
              isFavourite={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
