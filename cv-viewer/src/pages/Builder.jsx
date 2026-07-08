import { useState } from "react";
import { CVForm } from "../components/form/CVForm";
import { CVPreview } from "../components/preview/CVPreview";
import { Download, Pencil, Sparkles, X } from "lucide-react";
import { useSubmitCV } from "../hooks/useSubmitCV";
import { useCV } from "../context/CVContext";

const AIPromptModal = ({ onClose, onSubmit, loading }) => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#4DB6AC]" />
            <h2 className="text-sm font-semibold text-gray-900">
              Improve with AI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Describe how you'd like the AI to improve your CV. You can mention
          tone, target role, keywords to include, or any specific section to
          focus on.
        </p>

        <textarea
          rows={5}
          placeholder="e.g. Make it more suitable for a senior backend engineer role at a fintech company. Use stronger action verbs and highlight system design experience."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 placeholder-gray-300 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100 transition-all resize-none"
        />

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(prompt)}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs bg-[#4DB6AC] hover:bg-[#3EA99F] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={12} />
            {loading ? "Improving..." : "Improve CV"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Builder = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { submit, loading, error } = useSubmitCV();
  const { applyImprovedCV } = useCV();

  const handleImprove = async (prompt) => {
    try {
      const data = await submit(prompt);
      applyImprovedCV(data);
      setShowModal(false);
    } catch (err) {
      // error is set in hook state
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {showModal && (
        <AIPromptModal
          onClose={() => setShowModal(false)}
          onSubmit={handleImprove}
          loading={loading}
        />
      )}

      <div className="shrink-0 flex items-center justify-between px-6 h-14 bg-white border-b border-[#E0F2F1]">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            {showPreview ? "CV Preview" : "CV Builder"}
          </h1>
          <p className="text-xs text-gray-400">
            {showPreview
              ? "Review your CV or improve it with AI"
              : "Fill in your details step by step"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showPreview && (
            <>
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E0F2F1] rounded-lg text-gray-600 hover:bg-[#E0F2F1] transition-colors"
              >
                <Pencil size={12} /> Edit
              </button>
              <button
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#4DB6AC] text-[#4DB6AC] hover:bg-[#E0F2F1] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={12} />
                Improve with AI
              </button>
              <button
                disabled
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                title="Export coming soon"
              >
                <Download size={12} />
                Export PDF
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="shrink-0 px-6 py-2 bg-red-50 border-b border-red-100">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

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
