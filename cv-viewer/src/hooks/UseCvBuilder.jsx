import { useState } from "react";
import { submitCv } from "../services/Api";

export const useCvBuilder = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
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

    try {
      const response = await submitCv(form);
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting CV:", error);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, result, handleSubmit };
};