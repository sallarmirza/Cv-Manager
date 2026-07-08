import { createContext, useContext, useState } from "react";

const CVContext = createContext(null);

const initialData = {
  personal: { firstName: "", lastName: "", location: "", phone: "", email: "", linkedin: "" },
  summary: "",
  experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
  education: [{ degree: "", institution: "", location: "", from: "", to: "" }],
  projects: [{ title: "", year: "", bullets: [""] }],
  skills: [{ category: "", items: "" }],
  certifications: [""],
  languages: [{ language: "", proficiency: "" }],
  achievements: [{ title: "", bullets: [""] }],
};

export const CVProvider = ({ children }) => {
  const [cvData, setCvData] = useState(initialData);

  const updateSection = (section, value) => {
    setCvData((prev) => ({ ...prev, [section]: value }));
  };

  const applyImprovedCV = (improved) => {
    setCvData((prev) => ({
      ...prev,
      ...(improved.summary !== undefined && { summary: improved.summary }),
      ...(improved.experience !== undefined && { experience: improved.experience }),
      ...(improved.projects !== undefined && { projects: improved.projects }),
      ...(improved.achievements !== undefined && { achievements: improved.achievements }),
    }));
  };

  const resetCV = () => setCvData(structuredClone(initialData));

  return (
    <CVContext.Provider value={{ cvData, updateSection, applyImprovedCV, resetCV }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error("useCV must be used inside CVProvider");
  return ctx;
};