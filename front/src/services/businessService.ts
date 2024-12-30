import api from "./api";

export const fetchBusinesses = async () => {
  const response = await api.get("/businesses");
  return response.data;
};

const API_BASE_URL = "http://localhost:3000/businesses";

// Fetch businesses owned by the logged-in user
export const fetchMyBusinesses = async (token: string | null): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }

  return response.json();
};

// Create a new business
export const createBusiness = async (
  business: { name: string; description: string; category: string },
  token: string
) => {
  const response = await fetch("http://localhost:3000/businesses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass token in headers
    },
    body: JSON.stringify(business),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create business");
  }

  return response.json();
};


export const deleteBusiness = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/businesses/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, // Include token for authentication
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete business.");
  }
};
