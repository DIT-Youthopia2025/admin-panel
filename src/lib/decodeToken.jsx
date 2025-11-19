import { jwtDecode } from "jwt-decode";

export function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // depends on what your backend stores
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
