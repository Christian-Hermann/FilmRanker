const API = import.meta.env.VITE_API_URL; // from Netlify env
const BASE_URL = `${API}/auth`;

// LOGIN USER AND STORE TOKEN
export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    return data.user;
  } else {
    throw new Error(data.error || "Login failed");
  }
}

// REGISTER AND STORE TOKEN
export async function registerUser(username, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    return data.user;
  } else {
    throw new Error(data.error || "Registration failed");
  }
}
