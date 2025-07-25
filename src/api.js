// src/api.js
import { API } from "./App";

export async function fetchPosts() {
  const res = await fetch(`${API}/posts`);
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${API}/posts/${id}`);
  return res.json();
}

export async function addPost(post) {
  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updatePost(post) {
  const res = await fetch(`${API}/posts/${post.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function deletePost(id) {
  await fetch(`${API}/posts/${id}`, { method: "DELETE" });
}

export async function toggleFavourite(id, favValue) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favourite: favValue }),
  });
  return res.json();
}
