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
    return <div className="py-12 text-center text-gray-400">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-6"
    >
      <h2 className="text-xl font-semibold mb-6">
        {editMode ? "Edit Post" : "New Post"}
      </h2>
      <textarea
        name="text"
        value={post.text}
        onChange={handleChange}
        placeholder="Text"
        className="w-full mb-3 border rounded px-3 py-2 focus:ring focus:border-[#fcdb32]"
        rows={4}
        required
      />
      <input
        name="image"
        type="text"
        value={post.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-3 border rounded px-3 py-2"
      />
      <input
        name="video"
        type="text"
        value={post.video}
        onChange={handleChange}
        placeholder="Video URL"
        className="w-full mb-6 border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[#fcdb32] hover:bg-[#ffe983] px-4 py-2 rounded font-bold text-black flex-1 transition-all duration-100"
        >
          {editMode ? "Update Post" : "Add Post"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-bold flex-1 transition-all duration-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
