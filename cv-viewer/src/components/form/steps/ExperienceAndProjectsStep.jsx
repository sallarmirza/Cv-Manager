import { useCV } from "../../../context/CVContext";
import { inputCls } from "../styles";
import { Plus, Trash2 } from "lucide-react";

const emptyExperience = () => ({ title: "", company: "", location: "", from: "", to: "", bullets: [""] });
const emptyProject = () => ({ title: "", year: "", bullets: [""] });

const ExperienceCard = () => {
  const { cvData, updateSection } = useCV();
  const experiences = cvData.experience || [];

  const update = (i, field, value) => {
    const updated = [...experiences];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("experience", updated);
  };
  const addEntry = () => updateSection("experience", [...experiences, emptyExperience()]);
  const removeEntry = (i) => updateSection("experience", experiences.filter((_, idx) => idx !== i));
  const updateBullet = (i, bi, value) => {
    const updated = [...experiences];
    updated[i].bullets[bi] = value;
    updateSection("experience", updated);
  };
  const addBullet = (i) => {
    const updated = [...experiences];
    updated[i].bullets.push("");
    updateSection("experience", updated);
  };
  const removeBullet = (i, bi) => {
    const updated = [...experiences];
    updated[i].bullets.splice(bi, 1);
    updateSection("experience", updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Professional Experience</p>

      {experiences.map((exp, i) => (
        <div key={i} className="flex flex-col gap-4 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {exp.title || exp.company
                ? `${exp.title}${exp.company ? ` @ ${exp.company}` : ""}`
                : `Experience ${i + 1}`}
            </span>
            <button
              onClick={() => removeEntry(i)}
              disabled={experiences.length === 1}
              className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: "Job Title", key: "title", placeholder: "e.g. Backend Developer", span: "md:col-span-1" },
              { label: "Company", key: "company", placeholder: "e.g. Acme Corp", span: "md:col-span-1" },
              { label: "Location", key: "location", placeholder: "e.g. Islamabad, Pakistan", span: "md:col-span-2" },
              { label: "From", key: "from", placeholder: "e.g. Jan 2023", span: "" },
              { label: "To", key: "to", placeholder: "e.g. Present", span: "" },
            ].map(({ label, key, placeholder, span }) => (
              <div key={key} className={`flex flex-col gap-1 ${span}`}>
                <label className="text-xs font-semibold text-gray-600">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={exp[key] || ""}
                  onChange={(e) => update(i, key, e.target.value)}
                  className={inputCls}
                />
              </div>
            ))}

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600">Bullet Points</label>
              {exp.bullets.map((bullet, bi) => (
                <div key={bi} className="flex items-center gap-2">
                  <span className="text-gray-300 text-xs">•</span>
                  <input
                    type="text"
                    placeholder={`Accomplishment or duty ${bi + 1}`}
                    value={bullet || ""}
                    onChange={(e) => updateBullet(i, bi, e.target.value)}
                    className={inputCls}
                  />
                  <button
                    onClick={() => removeBullet(i, bi)}
                    disabled={exp.bullets.length === 1}
                    className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addBullet(i)}
                className="flex items-center gap-1 text-xs text-[#4DB6AC] hover:text-[#3EA99F] mt-1 w-fit transition-colors"
              >
                <Plus size={13} /> Add point
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEntry}
        className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit"
      >
        <Plus size={13} /> Add Experience
      </button>
    </div>
  );
};

const ProjectsCard = () => {
  const { cvData, updateSection } = useCV();
  const projects = cvData.projects || [];

  const update = (i, field, value) => {
    const updated = [...projects];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("projects", updated);
  };
  const addEntry = () => updateSection("projects", [...projects, emptyProject()]);
  const removeEntry = (i) => updateSection("projects", projects.filter((_, idx) => idx !== i));
  const updateBullet = (i, bi, value) => {
    const updated = [...projects];
    updated[i].bullets[bi] = value;
    updateSection("projects", updated);
  };
  const addBullet = (i) => {
    const updated = [...projects];
    updated[i].bullets.push("");
    updateSection("projects", updated);
  };
  const removeBullet = (i, bi) => {
    const updated = [...projects];
    updated[i].bullets.splice(bi, 1);
    updateSection("projects", updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Key Projects</p>

      {projects.map((proj, i) => (
        <div key={i} className="flex flex-col gap-4 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{proj.title || `Project ${i + 1}`}</span>
            <button
              onClick={() => removeEntry(i)}
              disabled={projects.length === 1}
              className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold text-gray-600">Project Title</label>
              <input
                type="text"
                placeholder="e.g. AI Lead Generator"
                value={proj.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1 w-28">
              <label className="text-xs font-semibold text-gray-600">Year</label>
              <input
                type="text"
                placeholder="2025"
                value={proj.year}
                onChange={(e) => update(i, "year", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600">Bullet Points</label>
            {proj.bullets.map((bullet, bi) => (
              <div key={bi} className="flex items-center gap-2">
                <span className="text-gray-300 text-xs">•</span>
                <input
                  type="text"
                  placeholder={`Point ${bi + 1}`}
                  value={bullet}
                  onChange={(e) => updateBullet(i, bi, e.target.value)}
                  className={inputCls}
                />
                <button
                  onClick={() => removeBullet(i, bi)}
                  disabled={proj.bullets.length === 1}
                  className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addBullet(i)}
              className="flex items-center gap-1 text-xs text-[#4DB6AC] hover:text-[#3EA99F] mt-1 w-fit transition-colors"
            >
              <Plus size={13} /> Add point
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addEntry}
        className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit"
      >
        <Plus size={13} /> Add Project
      </button>
    </div>
  );
};

export const ExperienceAndProjectsStep = () => (
  <div className="h-full bg-white p-6 flex flex-col gap-8 overflow-y-auto">
    <ExperienceCard />
    <div className="border-t border-gray-100" />
    <ProjectsCard />
  </div>
);