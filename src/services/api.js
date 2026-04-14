const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (endpoint, options) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};

export const api = {
  get: (url) => request(url, { method: "GET" }),
  post: (url, body) =>
    request(url, { method: "POST", body: JSON.stringify(body) }),
};