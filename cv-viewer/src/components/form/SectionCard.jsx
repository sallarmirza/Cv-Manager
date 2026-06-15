export const SectionCard = ({ title, children }) => (
  <div className="mb-5">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs font-semibold text-[#4DB6AC] uppercase tracking-widest">
        {title}
      </span>
      <div className="flex-1 h-px bg-[#E0F2F1]" />
    </div>
    {children}
  </div>
);