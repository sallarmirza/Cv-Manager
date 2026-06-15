import { useCV } from "../../../context/CVContext";
import { SectionCard } from "../SectionCard";
import { inputCls, labelCls } from "../styles";


const fields = [
  { label: "First Name", key: "firstName", placeholder: "Enter your first name", gridSpan: "md:col-span-1" },
  { label: "Last Name", key: "lastName", placeholder: "Enter your last name", gridSpan: "md:col-span-1" },
  { label: "Location", key: "location", placeholder: "Enter your location", gridSpan: "md:col-span-2" },
  { label: "Contact Number", key: "phone", placeholder: "Enter your contact number", gridSpan: "md:col-span-1" },
  { label: "Email", key: "email", placeholder: "Enter your email", gridSpan: "md:col-span-1" },
  { label: "LinkedIn URL", key: "linkedin", placeholder: "Add your linkedin URL", gridSpan: "md:col-span-2" },  
];
export const PersonalStep = () => {
  const { cvData, updateSection } = useCV();
  const personal = cvData.personal || {};
  const summaryText = cvData.summary || "";

  const handleChange = (key, value) => {
    updateSection("personal", { ...personal, [key]: value });
  };

  return (
    <div className="h-full bg-white p-6 flex flex-col gap-5 overflow-y-auto">

      <p className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">
        Personal Information
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {fields.map(({ label, key, placeholder, gridSpan }) => (
          <div key={key} className={`flex flex-col gap-1 ${gridSpan}`}>
            <label className="text-xs font-semibold text-gray-600">{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              value={personal[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className={inputCls}
            />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100" />

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline">
          <label className="text-xs font-semibold text-gray-600">Summary</label>
          <span className={`text-xs font-mono ${summaryText.length > 550 ? "text-red-500" : "text-gray-400"}`}>
            {summaryText.length} / 600
          </span>
        </div>
        <textarea
          rows={4}
          placeholder="Write your professional summary..."
          value={summaryText}
          onChange={(e) => updateSection("summary", e.target.value)}
          className={`${inputCls} resize-none h-auto`}
          maxLength={600}
        />
      </div>

    </div>
  );
};