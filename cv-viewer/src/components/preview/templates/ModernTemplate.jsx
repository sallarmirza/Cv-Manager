import { useCV } from "../../../context/CVContext";

const SectTitle = ({ children }) => (
  <div className="mb-2">
    <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 bg-gray-100 px-2 py-0.5 inline-block">
      {children}
    </h2>
  </div>
);

export const ModernTemplate = () => {
  const { cvData } = useCV();
  const {
    personal,
    summary,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
    achievements,
  } = cvData;

  return (
    <>
      {/* Header — two column */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-black uppercase tracking-wide text-gray-900">
            {`${personal.firstName} ${personal.lastName}`.trim() || "Your Name"}
          </h1>
          {summary && (
            <p className="text-xs text-gray-500 mt-0.5 max-w-xs leading-relaxed">
              {summary.slice(0, 120)}...
            </p>
          )}
        </div>
        <div className="text-right text-xs text-gray-600 flex flex-col gap-0.5">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary + Skills side by side */}
      {(summary || skills.some((s) => s.category || s.items)) && (
        <div className="flex gap-6 mb-4">
          {summary && (
            <div className="flex-1">
              <SectTitle>Summary</SectTitle>
              <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}
          {skills.some((s) => s.category || s.items) && (
            <div className="flex-1">
              <SectTitle>Skills</SectTitle>
              <div className="flex flex-col gap-0.5">
                {skills.map((sk, i) =>
                  sk.category || sk.items ? (
                    <div key={i} className="text-xs text-gray-700">
                      <span className="font-bold text-gray-900">
                        {sk.category}:
                      </span>{" "}
                      <span>{sk.items}</span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.title) && (
        <div className="mb-3">
          <SectTitle>Projects</SectTitle>
          {projects.map((proj, i) => (
            <div key={i} className="flex gap-3 mb-2">
              {proj.year && (
                <span className="text-xs text-gray-400 w-10 shrink-0 pt-0.5">
                  {proj.year}
                </span>
              )}
              <div className="flex-1">
                <span className="text-xs font-bold text-gray-900">
                  {proj.title}
                </span>
                {proj.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5">
                    {proj.bullets.filter(Boolean).map((b, bi) => (
                      <li
                        key={bi}
                        className="text-xs text-gray-700 flex gap-1.5"
                      >
                        <span className="shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.some((e) => e.title || e.company) && (
        <div className="mb-3">
          <SectTitle>Experience</SectTitle>
          {experience.map((exp, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="text-xs text-gray-400 w-10 shrink-0 pt-0.5">
                {exp.from}
                {exp.to ? `–${exp.to}` : ""}
              </span>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-900">
                    {exp.title}
                  </span>
                  {exp.company && (
                    <span className="text-xs text-gray-500">{exp.company}</span>
                  )}
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5">
                    {exp.bullets.filter(Boolean).map((b, bi) => (
                      <li
                        key={bi}
                        className="text-xs text-gray-700 flex gap-1.5"
                      >
                        <span className="shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.degree || e.institution) && (
        <div className="mb-3">
          <SectTitle>Education</SectTitle>
          {education.map((edu, i) => (
            <div key={i} className="flex gap-3 mb-1.5">
              <span className="text-xs text-gray-400 w-10 shrink-0 pt-0.5">
                {edu.from}
                {edu.to ? `–${edu.to}` : ""}
              </span>
              <div className="flex-1">
                <span className="text-xs font-bold text-gray-900">
                  {edu.degree}
                </span>
                {edu.institution && (
                  <span className="text-xs text-gray-600">
                    {" "}
                    — {edu.institution}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications + Languages side by side */}
      <div className="flex gap-6">
        {certifications.filter(Boolean).length > 0 && (
          <div className="flex-1">
            <SectTitle>Certifications</SectTitle>
            <ul className="flex flex-col gap-0.5">
              {certifications.filter(Boolean).map((cert, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                  <span className="shrink-0 mt-0.5">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {languages.some((l) => l.language) && (
          <div className="flex-1">
            <SectTitle>Languages</SectTitle>
            <p className="text-xs text-gray-700">
              {languages
                .filter((l) => l.language)
                .map((lang, i) => (
                  <span key={i}>
                    <span className="font-bold">{lang.language}</span>
                    {lang.proficiency && ` – ${lang.proficiency}`}
                    {i < languages.filter((l) => l.language).length - 1 &&
                      "   |   "}
                  </span>
                ))}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
