import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function PostCard({
  post,
  onEdit,
  onDelete,
  onFav,
  isFavourite,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // clicking outside closes the dropdown
  useEffect(() => {
    function handleClick(e) {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mb-6 max-w-2xl mx-auto transition-all">
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-400">
          {new Date(post.date).toLocaleString()}
        </span>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu((m) => !m)}
            aria-label="more"
            className="px-2 py-1 hover:bg-gray-100 rounded"
          >
            <HiOutlineDotsVertical size={22} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-30 min-w-[150px]">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onFav();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-lg font-medium">{post.text}</div>
      {post.image && (
        <img
          src={post.image}
          alt="Post attachment"
          className="my-3 rounded-lg max-h-[250px] object-cover"
        />
      )}
      {post.video && (
        <video
          src={post.video}
          controls
          className="my-3 w-full rounded-lg max-h-[300px] bg-black"
        />
      )}
    </div>
  );
}
