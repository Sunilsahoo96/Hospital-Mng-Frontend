

const API_URL = process.env.REACT_APP_API_URL;

const apiRequest = async ({ endpoint, method = "GET", data = null, token = localStorage.getItem("token") }) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  const url = method === "GET" && data
    ? `${API_URL}${endpoint}?${new URLSearchParams(data).toString()}`
    : `${API_URL}${endpoint}`;

  try {
    const res = await fetch(url, config);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export default apiRequest;
