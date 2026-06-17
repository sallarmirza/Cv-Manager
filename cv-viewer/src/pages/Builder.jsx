import { useState } from "react";
import { CVForm } from "../components/form/CVForm";
import { CVPreview } from "../components/preview/CVPreview";
import { Download, Pencil } from "lucide-react";
import { useSubmitCV } from "../hooks/useSubmitCV";

export const Builder = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { submit, loading, error } = useSubmitCV();

  const handleExport = async () => {
    try {
      await submit();

    } catch (err) {

    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      <div className="shrink-0 flex items-center justify-between px-6 h-14 bg-white border-b border-[#E0F2F1]">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            {showPreview ? "CV Preview" : "CV Builder"}
          </h1>
          <p className="text-xs text-gray-400">
            {showPreview ? "Review your CV before exporting" : "Fill in your details step by step"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showPreview && (
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E0F2F1] rounded-lg text-gray-600 hover:bg-[#E0F2F1] transition-colors"
            >
              <Pencil size={12} /> Edit
            </button>
          )}
          <button
            onClick={handleExport}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#4DB6AC] hover:bg-[#3EA99F] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={12} />
            {loading ? "Submitting..." : "Export PDF"}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {showPreview ? (
          <CVPreview />
        ) : (
          <CVForm onFinish={() => setShowPreview(true)} />
        )}
      </div>

    </div>
  );
};