import { useState } from "react";
import { submitCv } from "../services/Api";

export const useCvBuilder = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    companyName: "",
    companyStartDate: "",
    companyEndDate: "",
    achievements: "",
    instituteName: "",
    degreeName: "",
    eduStartDate: "",
    eduEndDate: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error,setError]=useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await submitCv(form);
      console.log("Backend Response:", response.data); 
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting CV:", error);
      setError("Failed to generate Cv. Please try again")
    } finally {
      setLoading(false);
    }
  };

  // form, loading, error, result, handleChange, handleSubmit
return { form, loading, error, result, handleChange, handleSubmit };
};