const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const submitCV = async (cvData) => {
  const response = await fetch(`${API_BASE}/api/cv/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to submit CV");
  }

  return await response.json();
};