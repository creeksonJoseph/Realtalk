import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { FcGenericSortingDesc } from "react-icons/fc";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header
      className="flex fixed top-0 left-0 w-full justify-between items-center p-4 shadow-md z-30"
      style={{ background: "#141d38" }}
    >
      <DropdownMenu />
      <div
        className="text-2xl font-bold flex items-center select-none cursor-pointer"
        style={{ color: "#fcdb32" }}
        onClick={() => navigate("/")}
      >
        REAL-TALK
        <span className="ml-2">
          <FcGenericSortingDesc size={30} />
        </span>
      </div>
      <button
        onClick={() => navigate("/add")}
        className="font-semibold px-4 py-2 rounded transition-all duration-150 shadow"
        style={{
          background: "#fcdb32",
          color: "#141d38",
          fontWeight: 700,
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#ffe983")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#fcdb32")}
      >
        + Add Post
      </button>
    </header>
  );
}
