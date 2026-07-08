import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { TraditionalTemplate } from "./templates/TraditionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { useCV } from "../../context/CVContext";

const TEMPLATES = ["Classic", "Traditional", "Modern"];

const templateMap = {
  Classic: ClassicTemplate,
  Traditional: TraditionalTemplate,
  Modern: ModernTemplate,
};

const isEmpty = (cvData) => {
  const { personal, summary, experience, projects } = cvData;
  return (
    !personal.firstName &&
    !personal.lastName &&
    !summary &&
    !experience.some((e) => e.title || e.company) &&
    !projects.some((p) => p.title)
  );
};

export const CVPreview = () => {
  const [selected, setSelected] = useState("Classic");
  const [open, setOpen] = useState(false);
  const { cvData } = useCV();
  const Template = templateMap[selected];

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2.5 bg-white border-b border-gray-200">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Preview</span>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {selected}
            <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-sm z-20 overflow-hidden">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  onClick={() => { setSelected(t); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    selected === t ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {isEmpty(cvData) ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-gray-400">No data to preview</p>
            <p className="text-xs text-gray-300 mt-1">Go back and fill in your details first</p>
          </div>
        ) : (
          <div
            className="bg-white mx-auto shadow-md"
            style={{ width: "210mm", minHeight: "297mm", padding: "12mm 14mm" }}
          >
            <Template />
          </div>
        )}
      </div>
    </div>
  );
};