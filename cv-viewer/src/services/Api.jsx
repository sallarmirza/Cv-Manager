import axios from "axios";

export const submitCv = (formData) => {
  console.log("Submitting Form Data:", formData);

  return axios.post("http://127.0.0.1:8000/gen/receive-cv", formData);
};