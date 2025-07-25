import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { FcGenericSortingDesc } from "react-icons/fc";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-30">
      <DropdownMenu />
      <div
        className="text-2xl font-bold text-[#fcdb32] flex items-center select-none cursor-pointer"
        onClick={() => navigate("/")}
      >
        REAL-TALK
        <span className="ml-2">
          <FcGenericSortingDesc size={30} />
        </span>
      </div>
      <button
        onClick={() => navigate("/add")}
        className="bg-[#fcdb32] hover:bg-[#ffe983] text-black font-semibold px-4 py-2 rounded transition-all duration-150"
      >
        + Add Post
      </button>
    </header>
  );
}
