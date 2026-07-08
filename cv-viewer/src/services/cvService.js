export const submitCV = async (cvData) => {
  const response = await fetch("http://127.0.0.1:8000/api/cv/generate", {
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