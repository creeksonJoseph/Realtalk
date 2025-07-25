import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <HiMenu size={30} />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-20 min-w-[150px]">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/favourites"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-gray-50"
          >
            Favourites
          </Link>
        </div>
      )}
    </div>
  );
}
