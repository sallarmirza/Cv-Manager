import { useCV } from "../../../context/CVContext";
import { inputCls } from "../styles";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const emptySkill = () => ({ category: "", items: "" });
const emptyEducation = () => ({ degree: "", institution: "", location: "", from: "", to: "" });

const EducationCard = () => {
  const { cvData, updateSection } = useCV();
  const education = cvData.education || [];

  const update = (i, field, value) => {
    const updated = [...education];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("education", updated);
  };

  const addEntry = () => {
    updateSection("education", [...education, emptyEducation()]);
    setCommittedLabels([...committedLabels, { degree: "", institution: "" }]);
  };

  const removeEntry = (i) => {
    updateSection("education", education.filter((_, idx) => idx !== i));
    setCommittedLabels(committedLabels.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Education</p>

      {education.map((edu, i) => (
        <div key={i} className="flex flex-col gap-3 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {`Education ${i + 1}`}
            </span>
            <button onClick={() => removeEntry(i)} disabled={education.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: "Degree", key: "degree", placeholder: "Enter your Degree name", span: "md:col-span-2" },
              { label: "Institute", key: "institution", placeholder: "Enter your Institute name", span: "md:col-span-2" },
              { label: "Location", key: "location", placeholder: "Enter Institute location", span: "md:col-span-2" },
              { label: "From", key: "from", placeholder: "Starting Date", span: "" },
              { label: "To", key: "to", placeholder: "Ending", span: "" },
            ].map(({ label, key, placeholder, span }) => (
              <div key={key} className={`flex flex-col gap-1 ${span}`}>
                <label className="text-xs font-semibold text-gray-600">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={edu[key]}
                  onChange={(e) => update(i, key, e.target.value)}
                  onBlur={(e) => {
                    if (key === "degree" || key === "institution") {
                      commitLabel(i, key, e.target.value);
                    }
                  }}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit">
        <Plus size={13} /> Add Education
      </button>
    </div>
  );
};

const SkillsCard = () => {
  const { cvData, updateSection } = useCV();
  const skills = cvData.skills || [];
  const [committedCategories, setCommittedCategories] = useState(() =>
    skills.map((s) => s.category || "")
  );

  const update = (i, field, value) => {
    const updated = [...skills];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("skills", updated);
  };

  const addEntry = () => {
    updateSection("skills", [...skills, emptySkill()]);
    setCommittedCategories([...committedCategories, ""]);
  };

  const removeEntry = (i) => {
    updateSection("skills", skills.filter((_, idx) => idx !== i));
    setCommittedCategories(committedCategories.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Technical Skills</p>
      <p className="text-xs text-gray-400 -mt-2">Group skills by category. Items are comma separated.</p>

      {skills.map((sk, i) => (
        <div key={i} className="flex flex-col gap-3 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {committedCategories[i] || `Category ${i + 1}`}
            </span>
            <button onClick={() => removeEntry(i)} disabled={skills.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Category</label>
              <input
                type="text"
                placeholder="e.g. Backend, Frontend, Tools"
                value={sk.category || ""}
                onChange={(e) => update(i, "category", e.target.value)}
                onBlur={(e) => {
                  const updated = [...committedCategories];
                  updated[i] = e.target.value;
                  setCommittedCategories(updated);
                }}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Skills</label>
              <input type="text" placeholder="e.g. Python, FastAPI, PostgreSQL" value={sk.items || ""} onChange={(e) => update(i, "items", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit">
        <Plus size={13} /> Add Category
      </button>
    </div>
  );
};

export const EducationAndSkillsStep = () => (
  <div className="h-full bg-white p-6 flex flex-col gap-8 overflow-y-auto">
    <EducationCard />
    <div className="border-t border-gray-100" />
    <SkillsCard />
  </div>
);