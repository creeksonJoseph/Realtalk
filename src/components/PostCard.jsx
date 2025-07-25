import { useState, useRef, useEffect } from "react";
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
    <div
      className="
      bg-gradient-to-br from-[#1f2948] via-[#141d38] to-[#141d38]
      border border-[#232b4a] rounded-xl
      shadow-xl
      p-6 mb-8 max-w-2xl mx-auto 
      transition-all duration-200 hover:scale-[1.02]
    "
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-[#fcdb32] drop-shadow-sm">
          {new Date(post.date).toLocaleString()}
        </span>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu((m) => !m)}
            aria-label="more"
            className="px-2 py-1 hover:bg-[#fcdb32]/10 rounded transition"
          >
            <HiOutlineDotsVertical size={22} color="#fcdb32" />
          </button>
          {showMenu && (
            <div
              className="
              absolute right-0 mt-2
              bg-[#1f2948] bg-opacity-95
              border border-[#fcdb32]
              rounded-lg shadow-2xl z-30 min-w-[160px]
              backdrop-blur
            "
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit();
                }}
                className="
                  block w-full text-left px-4 py-2 text-[#fcdb32]
                  font-semibold hover:bg-[#fcdb32] hover:text-[#141d38] rounded transition
                "
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete();
                }}
                className="
                  block w-full text-left px-4 py-2 text-red-400 font-semibold
                  hover:bg-red-500 hover:text-white rounded transition
                "
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onFav();
                }}
                className={`
                  block w-full text-left px-4 py-2 rounded transition
                  ${
                    isFavourite
                      ? "text-[#fcdb32] hover:bg-[#fcdb32]/20"
                      : "text-white hover:bg-[#fcdb32]/10"
                  } font-semibold
                `}
              >
                {isFavourite
                  ? "★ Remove from Favourites"
                  : "☆ Add to Favourites"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-white drop-shadow">
        {post.text}
      </div>
      {post.image && (
        <img
          src={post.image}
          alt="Post attachment"
          className="my-4 rounded-xl max-h-[250px] object-cover border-2 border-[#fcdb32]/20 shadow"
        />
      )}
      {post.video && (
        <video
          src={post.video}
          controls
          className="my-4 w-full rounded-xl max-h-[300px] bg-black border-2 border-[#fcdb32]/20"
        />
      )}
    </div>
  );
}
