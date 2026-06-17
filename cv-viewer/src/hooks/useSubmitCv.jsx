import { useState } from "react";
import { useCV } from "../context/CVContext";
import { submitCV } from "../services/cvService";

export const useSubmitCV = () => {
  const { cvData } = useCV();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const preparePayload = () => {
    return {
      personal: {
        firstName: cvData.personal?.firstName || "",
        lastName: cvData.personal?.lastName || "",
        location: cvData.personal?.location || "",
        phone: cvData.personal?.phone || "",
        email: cvData.personal?.email || "",
        linkedin: cvData.personal?.linkedin || "",
      },
      summary: cvData.summary || "",
      experience: cvData.experience?.map((exp) => ({
        title: exp.title || "",
        company: exp.company || "",
        location: exp.location || "",
        from: exp.from || "",
        to: exp.to || "",
        bullets: exp.bullets?.filter(Boolean) || [],
      })) || [],
      education: cvData.education?.map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        location: edu.location || "",
        from: edu.from || "",
        to: edu.to || "",
      })) || [],
      projects: cvData.projects?.map((proj) => ({
        title: proj.title || "",
        year: proj.year || "",
        bullets: proj.bullets?.filter(Boolean) || [],
      })) || [],
      skills: cvData.skills?.map((sk) => ({
        category: sk.category || "",
        items: sk.items || "",
      })) || [],
      certifications: cvData.certifications?.filter(Boolean) || [],
      languages: cvData.languages?.map((lang) => ({
        language: lang.language || "",
        proficiency: lang.proficiency || "",
      })) || [],
      achievements: cvData.achievements?.map((ach) => ({
        title: ach.title || "",
        bullets: ach.bullets?.filter(Boolean) || [],
      })) || [],
    };
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = preparePayload();
      const data = await submitCV(payload);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, result };
};