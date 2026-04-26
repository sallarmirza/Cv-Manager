import axios from "axios";

export const submitCv = (formData) => {
  console.log("Submitting Form Data:", formData);

  return axios.post("http://127.0.0.1:8000/gen/create-cv", formData);
};

export const uploadCv = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post("http://127.0.0.1:8000/gen/review",formData);
  return res.data;
};
