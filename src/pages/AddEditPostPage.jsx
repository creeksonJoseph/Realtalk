import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addPost, updatePost, fetchPost } from "../api";

export default function AddEditPostPage({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ text: "", image: "", video: "" });
  const [loading, setLoading] = useState(editMode);
  const [uploading, setUploading] = useState(false);

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
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "creekson");
    formData.append("folder", "firstProject");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzgwtssxv/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (file.type.startsWith("video")) {
        setPost((p) => ({ ...p, video: data.secure_url, image: "" }));
      } else {
        setPost((p) => ({ ...p, image: data.secure_url, video: "" }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

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
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1f2948] via-[#141d38] to-[#141d38]">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 bg-gradient-to-br from-[#1f2948] via-[#141d38] to-[#141d38] border border-[#232b4a] shadow-xl rounded-xl mt-10 text-white"
      >
        <h2 className="text-2xl mt-20 font-bold text-[#fcdb32] mb-6 text-center drop-shadow">
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

        <label className="block mb-6">
          <span className="block mb-2 font-semibold">
            Attach Image or Video
          </span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fcdb32] file:text-black hover:file:bg-[#ffe983]"
          />
          {uploading && <p className="mt-2 text-[#fcdb32]">Uploading...</p>}
        </label>

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
