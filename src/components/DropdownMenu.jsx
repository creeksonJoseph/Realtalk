import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-[#fcdb32]/10 transition"
        aria-label="Open navigation menu"
      >
        <HiMenu size={30} color="#fcdb32" />
      </button>
      {open && (
        <div
          className="
            absolute left-0 mt-2
            bg-[#212a44] bg-opacity-95
            border border-[#fcdb32] rounded-lg shadow-2xl z-20 min-w-[150px]
            backdrop-blur
          "
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="
              block px-4 py-2 text-[#fcdb32] font-semibold
              hover:bg-[#fcdb32] hover:text-[#141d38] rounded transition
            "
          >
            Home
          </Link>
          <Link
            to="/favourites"
            onClick={() => setOpen(false)}
            className="
              block px-4 py-2 text-[#fcdb32] font-semibold
              hover:bg-[#fcdb32] hover:text-[#141d38] rounded transition
            "
          >
            Favourites
          </Link>
        </div>
      )}
    </div>
  );
}
