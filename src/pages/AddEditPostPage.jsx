import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addPost, updatePost, fetchPost } from "../api";

export default function AddEditPostPage({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ text: "", image: "", video: "" });
  const [loading, setLoading] = useState(editMode);

  useEffect(() => {
    if (editMode && id) {
      fetchPost(id).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [editMode, id]);

  const handleChange = (e) =>
    setPost((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updatePost({ ...post });
    } else {
      await addPost({
        ...post,
        date: new Date().toISOString(),
        favourite: false,
      });
    }
    navigate("/");
  };

  if (loading)
    return (
      <div className="py-12 text-center text-[#fcdb32] drop-shadow">
        Loading...
      </div>
    );

  return (
    <div className="h-screen bg-gradient-to-br from-[#1f2948] via-[#141d38] to-[#141d38]">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 bg-gradient-to-br from-[#1f2948] via-[#141d38] to-[#141d38] border border-[#232b4a] shadow-xl rounded-xl mt-10 text-white"
      >
        <h2 className="text-2xl font-bold text-[#fcdb32] mb-6 text-center drop-shadow">
          {editMode ? "Edit Post" : "New Post"}
        </h2>

        <textarea
          name="text"
          value={post.text}
          onChange={handleChange}
          placeholder="What's on your mind?"
          className="w-full mb-4 rounded-lg bg-[#1f2948] border border-[#fcdb32]/20 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
          rows={4}
          required
        />

        <input
          name="image"
          type="text"
          value={post.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-4 rounded-lg bg-[#1f2948] border border-[#fcdb32]/20 text-white placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
        />

        <input
          name="video"
          type="text"
          value={post.video}
          onChange={handleChange}
          placeholder="Video URL"
          className="w-full mb-6 rounded-lg bg-[#1f2948] border border-[#fcdb32]/20 text-white placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#fcdb32] hover:bg-[#ffe983] text-black px-5 py-3 rounded-lg font-bold flex-1 transition-all duration-200"
          >
            {editMode ? "Update Post" : "Add Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-400 text-white px-5 py-3 rounded-lg font-bold flex-1 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
