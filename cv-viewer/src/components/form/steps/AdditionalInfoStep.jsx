import { useCV } from "../../../context/CVContext";
import { inputCls } from "../styles";
import { Plus, Trash2 } from "lucide-react";

const emptyAchievement = () => ({ title: "", bullets: [""] });
const emptyLanguage = () => ({ language: "", proficiency: "" });

const CertificationsCard = () => {
  const { cvData, updateSection } = useCV();
  const certifications = cvData.certifications || [];

  const update = (i, value) => {
    const updated = [...certifications];
    updated[i] = value;
    updateSection("certifications", updated);
  };
  const addEntry = () => updateSection("certifications", [...certifications, ""]);
  const removeEntry = (i) => updateSection("certifications", certifications.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Certifications</p>

      {certifications.map((cert, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gray-300 text-xs shrink-0">•</span>
          <input
            type="text"
            placeholder="e.g. AWS Certified Developer (2024)"
            value={cert}
            onChange={(e) => update(i, e.target.value)}
            className={inputCls}
          />
          <button onClick={() => removeEntry(i)} disabled={certifications.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0">
            <Trash2 size={15} />
          </button>
        </div>
      ))}

      <button onClick={addEntry} className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit">
        <Plus size={13} /> Add Certification
      </button>
    </div>
  );
};

const LanguagesCard = () => {
  const { cvData, updateSection } = useCV();
  const languages = cvData.languages || [];

  const update = (i, field, value) => {
    const updated = [...languages];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("languages", updated);
  };
  const addEntry = () => updateSection("languages", [...languages, emptyLanguage()]);
  const removeEntry = (i) => updateSection("languages", languages.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Languages</p>

      {languages.map((lang, i) => (
        <div key={i} className="flex flex-col gap-3 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold text-gray-600">Language</label>
              <input type="text" placeholder="e.g. English" value={lang.language} onChange={(e) => update(i, "language", e.target.value)} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold text-gray-600">Proficiency</label>
              <select value={lang.proficiency} onChange={(e) => update(i, "proficiency", e.target.value)} className={inputCls}>
                <option value="">Select...</option>
                <option>Native</option>
                <option>Fluent</option>
                <option>Professional</option>
                <option>Intermediate</option>
                <option>Basic</option>
              </select>
            </div>
            <button onClick={() => removeEntry(i)} disabled={languages.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mb-2">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit">
        <Plus size={13} /> Add Language
      </button>
    </div>
  );
};

const AchievementsCard = () => {
  const { cvData, updateSection } = useCV();
  const achievements = cvData.achievements || [];

  const update = (i, field, value) => {
    const updated = [...achievements];
    updated[i] = { ...updated[i], [field]: value };
    updateSection("achievements", updated);
  };
  const addEntry = () => updateSection("achievements", [...achievements, emptyAchievement()]);
  const removeEntry = (i) => updateSection("achievements", achievements.filter((_, idx) => idx !== i));
  const updateBullet = (i, bi, value) => {
    const updated = [...achievements];
    updated[i].bullets[bi] = value;
    updateSection("achievements", updated);
  };
  const addBullet = (i) => {
    const updated = [...achievements];
    updated[i].bullets.push("");
    updateSection("achievements", updated);
  };
  const removeBullet = (i, bi) => {
    const updated = [...achievements];
    updated[i].bullets.splice(bi, 1);
    updateSection("achievements", updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">Achievements & Activities</p>

      {achievements.map((ach, i) => (
        <div key={i} className="flex flex-col gap-3 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{ach.title || `Achievement ${i + 1}`}</span>
            <button onClick={() => removeEntry(i)} disabled={achievements.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Title</label>
              <input type="text" placeholder="e.g. National Badminton Champion" value={ach.title} onChange={(e) => update(i, "title", e.target.value)} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Details</label>
              {ach.bullets.map((bullet, bi) => (
                <div key={bi} className="flex items-center gap-2 mt-1">
                  <span className="text-gray-300 text-xs">•</span>
                  <input type="text" placeholder={`Detail ${bi + 1}`} value={bullet} onChange={(e) => updateBullet(i, bi, e.target.value)} className={inputCls} />
                  <button onClick={() => removeBullet(i, bi)} disabled={ach.bullets.length === 1} className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => addBullet(i)} className="flex items-center gap-1 text-xs text-[#4DB6AC] hover:text-[#3EA99F] mt-1 w-fit transition-colors">
                <Plus size={13} /> Add detail
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="flex items-center gap-1.5 text-xs text-[#4DB6AC] hover:text-[#3EA99F] transition-colors w-fit">
        <Plus size={13} /> Add Achievement
      </button>
    </div>
  );
};

export const AdditionalInfoStep = () => (
  <div className="h-full bg-white p-6 flex flex-col gap-8 overflow-y-auto">
    <CertificationsCard />
    <div className="border-t border-gray-100" />
    <LanguagesCard />
    <div className="border-t border-gray-100" />
    <AchievementsCard />
  </div>
);