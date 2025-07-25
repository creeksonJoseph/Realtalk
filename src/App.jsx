// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import AddEditPostPage from "./pages/AddEditPostPage";

export const API = "http://localhost:3001"; // Make sure this matches your json-server endpoint

export default function App() {
  return (
    <div className=" bg-black">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/add" element={<AddEditPostPage />} />
        <Route path="/edit/:id" element={<AddEditPostPage editMode />} />
      </Routes>
    </div>
  );
}
